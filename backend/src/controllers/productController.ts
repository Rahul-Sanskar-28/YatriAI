import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;

    const products = await prisma.product.findMany({
      where: {
        status: 'Active',
        ...(category && { category: category as string })
      },
      include: {
        seller: {
          include: {
            user: {
              select: {
                name: true,
                isVerified: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: products.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        image: p.image,
        category: p.category,
        seller: {
          name: p.seller.shopName,
          rating: p.seller.rating,
          isVerified: p.seller.user.isVerified
        },
        inStock: p.stock > 0
      }))
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ success: false, message: 'Failed to get products' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        seller: {
          include: {
            user: {
              select: {
                name: true,
                isVerified: true
              }
            }
          }
        }
      }
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({
      success: true,
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category,
        seller: {
          name: product.seller.shopName,
          rating: product.seller.rating,
          isVerified: product.seller.user.isVerified
        },
        inStock: product.stock > 0
      }
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ success: false, message: 'Failed to get product' });
  }
};

// Seller endpoints
export const getMyProducts = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    const seller = await prisma.seller.findUnique({
      where: { userId: req.user.userId },
      include: { products: { orderBy: { createdAt: 'desc' } } }
    });

    if (!seller) {
      return res.status(404).json({ success: false, message: 'Seller profile not found' });
    }

    res.json({
      success: true,
      data: seller.products.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        stock: p.stock,
        imageUrl: p.image,
        category: p.category,
        status: p.status.replace('_', ' '),
        sales: p.sales
      }))
    });
  } catch (error) {
    console.error('Get my products error:', error);
    res.status(500).json({ success: false, message: 'Failed to get products' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    const seller = await prisma.seller.findUnique({ where: { userId: req.user.userId } });
    if (!seller) {
      return res.status(404).json({ success: false, message: 'Seller profile not found' });
    }

    const { name, description, price, image, category, stock } = req.body;

    const product = await prisma.product.create({
      data: {
        sellerId: seller.id,
        name,
        description,
        price,
        image,
        category,
        stock: stock || 0,
        status: stock > 0 ? 'Active' : 'Out_of_Stock'
      }
    });

    res.status(201).json({
      success: true,
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        imageUrl: product.image,
        category: product.category,
        status: product.status.replace('_', ' '),
        sales: product.sales
      }
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ success: false, message: 'Failed to create product' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price, image, category, stock, status } = req.body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(price !== undefined && { price }),
        ...(image && { image }),
        ...(category && { category }),
        ...(stock !== undefined && { stock }),
        ...(status && { status: status.replace(' ', '_') })
      }
    });

    res.json({
      success: true,
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        imageUrl: product.image,
        category: product.category,
        status: product.status.replace('_', ' '),
        sales: product.sales
      }
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ success: false, message: 'Failed to update product' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id } });
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete product' });
  }
};

// Seller dashboard stats
export const getSellerStats = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    const seller = await prisma.seller.findUnique({
      where: { userId: req.user.userId },
      include: { products: true }
    });

    if (!seller) {
      return res.status(404).json({ success: false, message: 'Seller profile not found' });
    }

    const totalProducts = seller.products.length;
    const totalSales = seller.products.reduce((acc, p) => acc + p.sales, 0);
    const totalRevenue = seller.products.reduce((acc, p) => acc + (p.price * p.sales), 0);
    const lowStockProducts = seller.products.filter(p => p.stock > 0 && p.stock <= 5).length;

    res.json({
      success: true,
      data: {
        totalProducts,
        totalSales,
        totalRevenue,
        lowStockProducts,
        rating: seller.rating
      }
    });
  } catch (error) {
    console.error('Get seller stats error:', error);
    res.status(500).json({ success: false, message: 'Failed to get stats' });
  }
};



























