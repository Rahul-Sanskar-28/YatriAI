import { Destination, Guide, Product, Booking, Itinerary, AdminUser } from '../types';

export const destinations: Destination[] = [
  {
    id: '1',
    name: 'Betla National Park',
    description: 'Home to tigers, elephants, and diverse wildlife in pristine forests',
    image: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'nature',
    rating: 4.5,
    location: { lat: 23.9, lng: 84.2 }
  },
  {
    id: '2',
    name: 'Hundru Falls',
    description: 'Spectacular 98-meter waterfall surrounded by lush greenery',
    image: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'nature',
    rating: 4.7,
    location: { lat: 23.4, lng: 85.3 }
  },
  {
    id: '3',
    name: 'Jagannath Temple Ranchi',
    description: 'Ancient temple with stunning architecture and spiritual significance',
    image: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'spiritual',
    rating: 4.3,
    location: { lat: 23.3, lng: 85.3 }
  },
  {
    id: '4',
    name: 'Tribal Cultural Museum',
    description: 'Rich collection of tribal art, crafts, and cultural heritage',
    image: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'cultural',
    rating: 4.2,
    location: { lat: 23.4, lng: 85.4 }
  }
];

export const guides: Guide[] = [
  {
    id: '1',
    name: 'Ravi Kumar',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 4.8,
    experience: 8,
    languages: ['English', 'Hindi', 'Santhali'],
    specialties: ['Wildlife Tours', 'Tribal Culture', 'Adventure Sports'],
    pricePerDay: 2500,
    isVerified: true,
    location: 'Ranchi'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 4.9,
    experience: 6,
    languages: ['English', 'Hindi', 'Mundari'],
    specialties: ['Cultural Tours', 'Photography', 'Local Cuisine'],
    pricePerDay: 2000,
    isVerified: true,
    location: 'Jamshedpur'
  },
  {
    id: '3',
    name: 'Amit Singh',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 4.6,
    experience: 10,
    languages: ['English', 'Hindi', 'Ho'],
    specialties: ['Trekking', 'Nature Walks', 'Bird Watching'],
    pricePerDay: 3000,
    isVerified: true,
    location: 'Dhanbad'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Handwoven Tribal Basket',
    description: 'Authentic bamboo basket crafted by local artisans',
    price: 850,
    image: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Handicrafts',
    seller: {
      name: 'Tribal Crafts Co-op',
      rating: 4.7,
      isVerified: true
    },
    inStock: true
  },
  {
    id: '2',
    name: 'Dokra Metal Art',
    description: 'Traditional brass figurine using ancient lost-wax technique',
    price: 1200,
    image: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Art',
    seller: {
      name: 'Heritage Arts',
      rating: 4.8,
      isVerified: true
    },
    inStock: true
  },
  {
    id: '3',
    name: 'Santhali Handloom Saree',
    description: 'Beautiful handwoven saree with traditional tribal patterns',
    price: 2500,
    image: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Textiles',
    seller: {
      name: 'Weaver\'s Guild',
      rating: 4.9,
      isVerified: true
    },
    inStock: true
  }
];

export const bookings: Booking[] = [
  {
    id: '1',
    type: 'guide',
    title: 'Wildlife Tour with Ravi Kumar',
    date: '2024-01-15',
    status: 'confirmed',
    amount: 7500,
    blockchainHash: '0x1a2b3c4d5e6f7890abcdef'
  },
  {
    id: '2',
    type: 'accommodation',
    title: 'Eco Resort Stay - Betla',
    date: '2024-01-20',
    status: 'pending',
    amount: 4500
  },
  {
    id: '3',
    type: 'package',
    title: 'Cultural Heritage Tour',
    date: '2024-02-01',
    status: 'confirmed',
    amount: 12000,
    blockchainHash: '0xabcdef1234567890fedcba'
  }
];

export const itineraries: Itinerary[] = [
  {
    id: '1',
    title: 'Jharkhand Wildlife & Nature Explorer',
    duration: 5,
    destinations: destinations.filter(d => d.category === 'nature'),
    activities: ['Wildlife Safari', 'Waterfall Trekking', 'Bird Watching', 'Photography'],
    estimatedCost: 15000,
    createdAt: '2024-01-10'
  },
  {
    id: '2',
    title: 'Cultural Heritage Journey',
    duration: 3,
    destinations: destinations.filter(d => d.category === 'cultural' || d.category === 'spiritual'),
    activities: ['Temple Visits', 'Museum Tours', 'Local Craft Workshops', 'Traditional Dance Shows'],
    estimatedCost: 8500,
    createdAt: '2024-01-08'
  }
];

export const aiTips = [
  "🌟 Best time to visit Hundru Falls is during monsoon season (July-September)",
  "🎭 Don't miss the Sarhul festival in March - experience authentic tribal culture",
  "🌡️ Weather Alert: Pleasant weather expected this weekend, perfect for outdoor activities",
  "🦎 Wildlife Tip: Early morning safaris at Betla have 80% higher tiger spotting chances",
  "🏺 Local markets in Ranchi offer authentic Dokra art at 30% lower prices than tourist areas",
  "🚗 Pro Tip: Book local guides in advance during festival seasons for better rates"
];

export const testimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5,
    comment: 'YatriAI made my Jharkhand trip absolutely magical! The AI recommendations were spot-on.',
    sentiment: 'Highly Positive',
    location: 'USA'
  },
  {
    id: '2',
    name: 'Rajesh Patel',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5,
    comment: 'The blockchain verification gave me complete trust in the guides and services. Excellent platform!',
    sentiment: 'Trustworthy',
    location: 'Mumbai'
  },
  {
    id: '3',
    name: 'Emily Chen',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 4,
    comment: 'Loved the cultural immersion and authentic handicraft marketplace. Will definitely return!',
    sentiment: 'Authentic Experience',
    location: 'Singapore'
  }
];

// Mock data for Admin Dashboard
export const adminUsers: AdminUser[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'tourist',
    status: 'Active',
    joinDate: '2024-01-15',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    role: 'guide',
    status: 'Active',
    joinDate: '2024-01-10',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: '3',
    name: 'Amit Singh',
    email: 'amit.singh@example.com',
    role: 'seller',
    status: 'Blocked',
    joinDate: '2024-01-05',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    role: 'tourist',
    status: 'Active',
    joinDate: '2024-01-20',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: '5',
    name: 'Ravi Kumar',
    email: 'ravi.kumar@example.com',
    role: 'guide',
    status: 'Active',
    joinDate: '2024-01-12',
    avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  }
];

// Mock data for Guide Dashboard
export const guideTours = [
  {
    id: '1',
    title: 'Wildlife Safari at Betla National Park',
    description: 'Explore the rich wildlife of Jharkhand with expert guidance',
    image: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'Active' as const,
    duration: '3 days',
    price: 2500,
    bookings: 12
  },
  {
    id: '2',
    title: 'Cultural Heritage Tour',
    description: 'Discover the tribal culture and traditions of Jharkhand',
    image: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'Active' as const,
    duration: '2 days',
    price: 2000,
    bookings: 8
  },
  {
    id: '3',
    title: 'Waterfall Trekking Adventure',
    description: 'Trek to the beautiful waterfalls of Jharkhand',
    image: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'Draft' as const,
    duration: '1 day',
    price: 1500,
    bookings: 0
  }
];

export const guideBookings = [
  {
    id: '1',
    tourName: 'Wildlife Safari at Betla National Park',
    touristName: 'John Doe',
    touristEmail: 'john.doe@example.com',
    date: '2024-02-15',
    status: 'Confirmed' as const,
    amount: 2500,
    participants: 2
  },
  {
    id: '2',
    tourName: 'Cultural Heritage Tour',
    touristName: 'Sarah Wilson',
    touristEmail: 'sarah.wilson@example.com',
    date: '2024-02-20',
    status: 'Pending' as const,
    amount: 4000,
    participants: 2
  },
  {
    id: '3',
    tourName: 'Wildlife Safari at Betla National Park',
    touristName: 'Emily Chen',
    touristEmail: 'emily.chen@example.com',
    date: '2024-02-25',
    status: 'Cancelled' as const,
    amount: 2500,
    participants: 1
  },
  {
    id: '4',
    tourName: 'Cultural Heritage Tour',
    touristName: 'Rajesh Patel',
    touristEmail: 'rajesh.patel@example.com',
    date: '2024-03-01',
    status: 'Confirmed' as const,
    amount: 2000,
    participants: 1
  }
];

// Mock data for Marketplace Dashboard
export const vendorProducts = [
  {
    id: '1',
    name: 'Handwoven Tribal Basket',
    description: 'Authentic bamboo basket crafted by local artisans',
    price: 850,
    stock: 25,
    imageUrl: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Handicrafts',
    status: 'Active' as const,
    sales: 45
  },
  {
    id: '2',
    name: 'Dokra Metal Art',
    description: 'Traditional brass figurine using ancient lost-wax technique',
    price: 1200,
    stock: 15,
    imageUrl: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Art',
    status: 'Active' as const,
    sales: 28
  },
  {
    id: '3',
    name: 'Santhali Handloom Saree',
    description: 'Beautiful handwoven saree with traditional tribal patterns',
    price: 2500,
    stock: 8,
    imageUrl: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Textiles',
    status: 'Active' as const,
    sales: 12
  },
  {
    id: '4',
    name: 'Tribal Jewelry Set',
    description: 'Authentic tribal jewelry made with traditional techniques',
    price: 1800,
    stock: 0,
    imageUrl: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Jewelry',
    status: 'Out of Stock' as const,
    sales: 35
  }
];