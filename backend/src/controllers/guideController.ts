import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllGuides = async (req: Request, res: Response) => {
  try {
    const guides = await prisma.guide.findMany({
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
            isVerified: true
          }
        }
      },
      orderBy: { rating: 'desc' }
    });

    res.json({
      success: true,
      data: guides.map(g => ({
        id: g.id,
        name: g.user.name,
        avatar: g.user.avatar,
        rating: g.rating,
        experience: g.experience,
        languages: g.languages,
        specialties: g.specialties,
        pricePerDay: g.pricePerDay,
        isVerified: g.user.isVerified,
        location: g.location
      }))
    });
  } catch (error) {
    console.error('Get guides error:', error);
    res.status(500).json({ success: false, message: 'Failed to get guides' });
  }
};

export const getGuideById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const guide = await prisma.guide.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
            isVerified: true
          }
        },
        tours: true
      }
    });

    if (!guide) {
      return res.status(404).json({ success: false, message: 'Guide not found' });
    }

    res.json({
      success: true,
      data: {
        id: guide.id,
        name: guide.user.name,
        avatar: guide.user.avatar,
        rating: guide.rating,
        experience: guide.experience,
        languages: guide.languages,
        specialties: guide.specialties,
        pricePerDay: guide.pricePerDay,
        isVerified: guide.user.isVerified,
        location: guide.location,
        tours: guide.tours
      }
    });
  } catch (error) {
    console.error('Get guide error:', error);
    res.status(500).json({ success: false, message: 'Failed to get guide' });
  }
};

export const getMyGuideProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    const guide = await prisma.guide.findUnique({
      where: { userId: req.user.userId },
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
            isVerified: true,
            email: true
          }
        },
        tours: true,
        bookings: {
          include: { tour: true },
          orderBy: { date: 'desc' }
        }
      }
    });

    if (!guide) {
      return res.status(404).json({ success: false, message: 'Guide profile not found' });
    }

    res.json({
      success: true,
      data: {
        id: guide.id,
        name: guide.user.name,
        email: guide.user.email,
        avatar: guide.user.avatar,
        rating: guide.rating,
        experience: guide.experience,
        languages: guide.languages,
        specialties: guide.specialties,
        pricePerDay: guide.pricePerDay,
        isVerified: guide.user.isVerified,
        location: guide.location,
        tours: guide.tours.map(t => ({
          id: t.id,
          title: t.title,
          description: t.description,
          image: t.image,
          status: t.status,
          duration: t.duration,
          price: t.price,
          bookings: t.bookings
        })),
        bookings: guide.bookings.map(b => ({
          id: b.id,
          tourName: b.tour.title,
          touristName: b.touristName,
          touristEmail: b.touristEmail,
          date: b.date.toISOString().split('T')[0],
          status: b.status,
          amount: b.amount,
          participants: b.participants
        }))
      }
    });
  } catch (error) {
    console.error('Get my guide profile error:', error);
    res.status(500).json({ success: false, message: 'Failed to get guide profile' });
  }
};

export const updateGuideProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    const { experience, languages, specialties, pricePerDay, location } = req.body;

    const guide = await prisma.guide.update({
      where: { userId: req.user.userId },
      data: {
        ...(experience !== undefined && { experience }),
        ...(languages && { languages }),
        ...(specialties && { specialties }),
        ...(pricePerDay !== undefined && { pricePerDay }),
        ...(location && { location })
      }
    });

    res.json({ success: true, data: guide });
  } catch (error) {
    console.error('Update guide profile error:', error);
    res.status(500).json({ success: false, message: 'Failed to update guide profile' });
  }
};

// Tours management
export const createTour = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    const guide = await prisma.guide.findUnique({ where: { userId: req.user.userId } });
    if (!guide) {
      return res.status(404).json({ success: false, message: 'Guide profile not found' });
    }

    const { title, description, image, duration, price, status } = req.body;

    const tour = await prisma.tour.create({
      data: {
        guideId: guide.id,
        title,
        description,
        image,
        duration,
        price,
        status: status || 'Draft'
      }
    });

    res.status(201).json({ success: true, data: tour });
  } catch (error) {
    console.error('Create tour error:', error);
    res.status(500).json({ success: false, message: 'Failed to create tour' });
  }
};

export const updateTour = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, image, duration, price, status } = req.body;

    const tour = await prisma.tour.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(image && { image }),
        ...(duration && { duration }),
        ...(price !== undefined && { price }),
        ...(status && { status })
      }
    });

    res.json({ success: true, data: tour });
  } catch (error) {
    console.error('Update tour error:', error);
    res.status(500).json({ success: false, message: 'Failed to update tour' });
  }
};

export const deleteTour = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.tour.delete({ where: { id } });
    res.json({ success: true, message: 'Tour deleted' });
  } catch (error) {
    console.error('Delete tour error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete tour' });
  }
};

// Guide bookings
export const updateGuideBookingStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await prisma.guideBooking.update({
      where: { id },
      data: { status }
    });

    res.json({ success: true, data: booking });
  } catch (error) {
    console.error('Update guide booking error:', error);
    res.status(500).json({ success: false, message: 'Failed to update booking' });
  }
};











