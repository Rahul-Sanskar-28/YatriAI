import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllTestimonials = async (req: Request, res: Response) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: testimonials.map(t => ({
        id: t.id,
        name: t.name,
        avatar: t.avatar,
        rating: t.rating,
        comment: t.comment,
        sentiment: t.sentiment,
        location: t.location
      }))
    });
  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json({ success: false, message: 'Failed to get testimonials' });
  }
};

export const getAITips = async (req: Request, res: Response) => {
  try {
    const tips = await prisma.aITip.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: tips.map(t => t.content)
    });
  } catch (error) {
    console.error('Get AI tips error:', error);
    res.status(500).json({ success: false, message: 'Failed to get AI tips' });
  }
};

// Admin endpoints
export const createTestimonial = async (req: Request, res: Response) => {
  try {
    const { name, avatar, rating, comment, sentiment, location } = req.body;

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        avatar,
        rating,
        comment,
        sentiment,
        location
      }
    });

    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    console.error('Create testimonial error:', error);
    res.status(500).json({ success: false, message: 'Failed to create testimonial' });
  }
};

export const createAITip = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;

    const tip = await prisma.aITip.create({
      data: { content }
    });

    res.status(201).json({ success: true, data: tip });
  } catch (error) {
    console.error('Create AI tip error:', error);
    res.status(500).json({ success: false, message: 'Failed to create AI tip' });
  }
};

// Feedback
export const submitFeedback = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    const { rating, comment, sentiment } = req.body;

    const feedback = await prisma.feedback.create({
      data: {
        userId: req.user.userId,
        rating,
        comment,
        sentiment
      }
    });

    res.status(201).json({ success: true, data: feedback });
  } catch (error) {
    console.error('Submit feedback error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit feedback' });
  }
};

export const getAllFeedback = async (req: Request, res: Response) => {
  try {
    const feedback = await prisma.feedback.findMany({
      include: {
        user: {
          select: { name: true, avatar: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: feedback.map(f => ({
        id: f.id,
        rating: f.rating,
        comment: f.comment,
        sentiment: f.sentiment,
        user: f.user,
        createdAt: f.createdAt.toISOString().split('T')[0]
      }))
    });
  } catch (error) {
    console.error('Get feedback error:', error);
    res.status(500).json({ success: false, message: 'Failed to get feedback' });
  }
};



























