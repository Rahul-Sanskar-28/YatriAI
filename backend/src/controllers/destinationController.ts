import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { caseInsensitiveContains } from '../utils/dbHelpers';

const prisma = new PrismaClient();

// Helper function to format destination data
const formatDestination = (d: any) => ({
  id: d.id,
  name: d.name,
  description: d.description,
  image: d.image,
  images: d.images || [],
  category: d.category,
  rating: d.rating,
  location: {
    lat: d.latitude,
    lng: d.longitude,
    address: d.address,
    city: d.city,
    state: d.state,
    country: d.country,
    zipCode: d.zipCode
  },
  details: {
    openingHours: d.openingHours,
    entryFee: d.entryFee,
    bestTimeToVisit: d.bestTimeToVisit,
    estimatedDuration: d.estimatedDuration,
    website: d.website,
    phoneNumber: d.phoneNumber
  },
  howToReach: {
    nearestMetro: d.nearestMetro,
    nearestBusStop: d.nearestBusStop,
    nearestRailway: d.nearestRailway,
    parkingAvailable: d.parkingAvailable,
    accessibleBy: d.accessibleBy || [],
    directions: d.directions,
    distanceFromCity: d.distanceFromCity
  },
  tags: d.tags || [],
  amenities: d.amenities || []
});

// Search destinations by name, location, category, or tags
// Note: Uses case-insensitive search which requires PostgreSQL
export const searchDestinations = async (req: Request, res: Response) => {
  try {
    const { query, category, city } = req.query;

    if (!query && !category && !city) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide search query, category, or city' 
      });
    }

    const searchConditions: any = {
      AND: []
    };

    if (query) {
      const searchQuery = query as string;
      searchConditions.AND.push({
        OR: [
          // Case-insensitive search (PostgreSQL-specific feature)
          { name: caseInsensitiveContains(searchQuery) },
          { description: caseInsensitiveContains(searchQuery) },
          { address: caseInsensitiveContains(searchQuery) }
        ]
      });
    }

    if (category) {
      searchConditions.AND.push({ category: category as any });
    }

    if (city) {
      // Case-insensitive city search (PostgreSQL-specific feature)
      searchConditions.AND.push({ 
        city: caseInsensitiveContains(city as string) 
      });
    }

    const destinations = await prisma.destination.findMany({
      where: searchConditions.AND.length > 0 ? searchConditions : undefined,
      orderBy: { rating: 'desc' }
    });

    res.json({
      success: true,
      data: destinations.map(formatDestination),
      count: destinations.length
    });
  } catch (error) {
    console.error('Search destinations error:', error);
    res.status(500).json({ success: false, message: 'Failed to search destinations' });
  }
};

export const getAllDestinations = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;

    const destinations = await prisma.destination.findMany({
      where: category ? { category: category as any } : undefined,
      orderBy: { rating: 'desc' }
    });

    res.json({
      success: true,
      data: destinations.map(formatDestination)
    });
  } catch (error) {
    console.error('Get destinations error:', error);
    res.status(500).json({ success: false, message: 'Failed to get destinations' });
  }
};

export const getDestinationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const destination = await prisma.destination.findUnique({
      where: { id }
    });

    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }

    res.json({
      success: true,
      data: formatDestination(destination)
    });
  } catch (error) {
    console.error('Get destination error:', error);
    res.status(500).json({ success: false, message: 'Failed to get destination' });
  }
};

export const createDestination = async (req: Request, res: Response) => {
  try {
    const { 
      name, description, image, images, category, rating, 
      location, details, howToReach, tags, amenities 
    } = req.body;

    const destination = await prisma.destination.create({
      data: {
        name,
        description,
        image,
        images: images || [],
        category,
        rating: rating || 0,
        latitude: location.lat,
        longitude: location.lng,
        address: location.address,
        city: location.city || 'Kolkata',
        state: location.state || 'West Bengal',
        country: location.country || 'India',
        zipCode: location.zipCode,
        openingHours: details?.openingHours,
        entryFee: details?.entryFee,
        bestTimeToVisit: details?.bestTimeToVisit,
        estimatedDuration: details?.estimatedDuration,
        website: details?.website,
        phoneNumber: details?.phoneNumber,
        nearestMetro: howToReach?.nearestMetro,
        nearestBusStop: howToReach?.nearestBusStop,
        nearestRailway: howToReach?.nearestRailway,
        parkingAvailable: howToReach?.parkingAvailable || false,
        accessibleBy: howToReach?.accessibleBy || [],
        directions: howToReach?.directions,
        distanceFromCity: howToReach?.distanceFromCity,
        tags: tags || [],
        amenities: amenities || []
      }
    });

    res.status(201).json({
      success: true,
      data: formatDestination(destination)
    });
  } catch (error) {
    console.error('Create destination error:', error);
    res.status(500).json({ success: false, message: 'Failed to create destination' });
  }
};

export const updateDestination = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { 
      name, description, image, images, category, rating, 
      location, details, howToReach, tags, amenities 
    } = req.body;

    const updateData: any = {};
    
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (image) updateData.image = image;
    if (images) updateData.images = images;
    if (category) updateData.category = category;
    if (rating !== undefined) updateData.rating = rating;
    if (tags) updateData.tags = tags;
    if (amenities) updateData.amenities = amenities;
    
    if (location) {
      if (location.lat) updateData.latitude = location.lat;
      if (location.lng) updateData.longitude = location.lng;
      if (location.address) updateData.address = location.address;
      if (location.city) updateData.city = location.city;
      if (location.state) updateData.state = location.state;
      if (location.country) updateData.country = location.country;
      if (location.zipCode) updateData.zipCode = location.zipCode;
    }
    
    if (details) {
      if (details.openingHours) updateData.openingHours = details.openingHours;
      if (details.entryFee) updateData.entryFee = details.entryFee;
      if (details.bestTimeToVisit) updateData.bestTimeToVisit = details.bestTimeToVisit;
      if (details.estimatedDuration) updateData.estimatedDuration = details.estimatedDuration;
      if (details.website) updateData.website = details.website;
      if (details.phoneNumber) updateData.phoneNumber = details.phoneNumber;
    }
    
    if (howToReach) {
      if (howToReach.nearestMetro) updateData.nearestMetro = howToReach.nearestMetro;
      if (howToReach.nearestBusStop) updateData.nearestBusStop = howToReach.nearestBusStop;
      if (howToReach.nearestRailway) updateData.nearestRailway = howToReach.nearestRailway;
      if (howToReach.parkingAvailable !== undefined) updateData.parkingAvailable = howToReach.parkingAvailable;
      if (howToReach.accessibleBy) updateData.accessibleBy = howToReach.accessibleBy;
      if (howToReach.directions) updateData.directions = howToReach.directions;
      if (howToReach.distanceFromCity) updateData.distanceFromCity = howToReach.distanceFromCity;
    }

    const destination = await prisma.destination.update({
      where: { id },
      data: updateData
    });

    res.json({
      success: true,
      data: formatDestination(destination)
    });
  } catch (error) {
    console.error('Update destination error:', error);
    res.status(500).json({ success: false, message: 'Failed to update destination' });
  }
};

export const deleteDestination = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.destination.delete({ where: { id } });

    res.json({ success: true, message: 'Destination deleted' });
  } catch (error) {
    console.error('Delete destination error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete destination' });
  }
};














