import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sampleDestinations = [
  {
    name: 'Victoria Memorial',
    description: 'A magnificent white marble building dedicated to Queen Victoria, now serving as a museum showcasing the history of Kolkata and the British Raj. The memorial is surrounded by lush gardens and is one of the most iconic landmarks of the city.',
    image: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=800',
    images: [
      'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1609920658906-8223bd289001?auto=format&fit=crop&w=800'
    ],
    category: 'cultural',
    rating: 4.7,
    latitude: 22.5448,
    longitude: 88.3426,
    address: '1, Queens Way, Maidan',
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    zipCode: '700071',
    openingHours: 'Tuesday - Sunday: 10:00 AM - 5:00 PM (Closed on Mondays)',
    entryFee: 'Indians: ₹30, Foreigners: ₹500, Camera: ₹50',
    bestTimeToVisit: 'October to March (Winter season)',
    estimatedDuration: '2-3 hours',
    website: 'https://victoriamemorial-kol.gov.in',
    phoneNumber: '+91-33-2223-1890',
    nearestMetro: 'Maidan Metro Station (450m)',
    nearestBusStop: 'Victoria Memorial Bus Stop',
    nearestRailway: 'Howrah Railway Station (5 km)',
    parkingAvailable: true,
    accessibleBy: ['metro', 'bus', 'taxi', 'walking'],
    directions: 'From Maidan Metro Station, exit and walk south for about 5 minutes. The memorial is clearly visible and well-signposted.',
    distanceFromCity: 2.5,
    tags: ['heritage', 'museum', 'architecture', 'colonial', 'photography'],
    amenities: ['wheelchair-accessible', 'restrooms', 'cafeteria', 'parking', 'guided-tours', 'souvenir-shop']
  },
  {
    name: 'Howrah Bridge',
    description: 'An iconic cantilever bridge over the Hooghly River, one of the busiest bridges in the world. Built in 1943, it connects Howrah and Kolkata.',
    image: 'https://images.unsplash.com/photo-1536421469767-80559bb6f5e1?auto=format&fit=crop&w=800',
    images: [],
    category: 'cultural',
    rating: 4.6,
    latitude: 22.5858,
    longitude: 88.3468,
    address: 'Jagannath Ghat, Howrah Bridge',
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    openingHours: 'Open 24 hours',
    entryFee: 'Free',
    bestTimeToVisit: 'Early morning or evening for best lighting',
    estimatedDuration: '1 hour',
    nearestMetro: 'Howrah Metro Station (500m)',
    nearestBusStop: 'Howrah Bridge Bus Stop',
    nearestRailway: 'Howrah Railway Station (1 km)',
    parkingAvailable: false,
    accessibleBy: ['metro', 'bus', 'taxi', 'walking', 'ferry'],
    directions: 'Take the metro to Howrah Station and walk towards the bridge.',
    distanceFromCity: 3.2,
    tags: ['landmark', 'bridge', 'engineering', 'photography'],
    amenities: ['pedestrian-walkway', 'ferry-access']
  },
  {
    name: 'Kalighat Temple',
    description: 'One of the 51 Shakti Peethas, Kalighat Temple is dedicated to Goddess Kali. An important pilgrimage site showcasing traditional Bengali temple architecture.',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800',
    images: [],
    category: 'spiritual',
    rating: 4.5,
    latitude: 22.5186,
    longitude: 88.3425,
    address: 'Anami Sangha, Kalighat',
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    zipCode: '700026',
    openingHours: 'Daily: 5:00 AM - 2:00 PM, 5:00 PM - 10:30 PM',
    entryFee: 'Free (Donations accepted)',
    bestTimeToVisit: 'During Kali Puja or early morning',
    estimatedDuration: '1-2 hours',
    phoneNumber: '+91-33-2454-1010',
    nearestMetro: 'Kalighat Metro Station (100m)',
    nearestBusStop: 'Kalighat Bus Stand',
    nearestRailway: 'Sealdah Railway Station (6 km)',
    parkingAvailable: false,
    accessibleBy: ['metro', 'bus', 'taxi', 'walking'],
    directions: 'Exit Kalighat Metro Station and follow signboards. Temple is 2 minutes walking distance.',
    distanceFromCity: 5.5,
    tags: ['temple', 'religious', 'pilgrimage', 'heritage'],
    amenities: ['restrooms', 'shoe-storage', 'prasad-shop']
  }
];

async function seedDestinations() {
  console.log('🌱 Seeding destinations...');
  
  try {
    // Clear existing destinations (optional)
    await prisma.destination.deleteMany({});
    console.log('✅ Cleared existing destinations');
    
    // Create new destinations
    for (const dest of sampleDestinations) {
      const created = await prisma.destination.create({
        data: dest as any
      });
      console.log(`✅ Created: ${created.name}`);
    }
    
    console.log('🎉 Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding destinations:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedDestinations();
