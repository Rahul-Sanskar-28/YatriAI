export interface User {
  id: string;
  name: string;
  email: string;
  role: 'tourist' | 'admin' | 'guide' | 'seller';
  avatar?: string;
  preferences?: TravelPreferences;
  isVerified?: boolean;
}

export interface TravelPreferences {
  interests: string[];
  budget: 'budget' | 'mid-range' | 'luxury';
  travelStyle: 'solo' | 'couple' | 'family' | 'group';
  duration: number;
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  category: 'nature' | 'cultural' | 'adventure' | 'spiritual';
  rating: number;
  location: {
    lat: number;
    lng: number;
  };
}

export interface Guide {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  experience: number;
  languages: string[];
  specialties: string[];
  pricePerDay: number;
  isVerified: boolean;
  location: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  seller: {
    name: string;
    rating: number;
    isVerified: boolean;
  };
  inStock: boolean;
}

export interface Booking {
  id: string;
  type: 'guide' | 'accommodation' | 'package';
  title: string;
  date: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  amount: number;
  blockchainHash?: string;
}

export interface Itinerary {
  id: string;
  title: string;
  duration: number;
  destinations: Destination[];
  activities: string[];
  estimatedCost: number;
  createdAt: string;
}

// Admin dashboard specific types
export type AdminUserStatus = 'Active' | 'Blocked';
export type AdminUserRole = 'tourist' | 'guide' | 'seller';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminUserRole;
  status: AdminUserStatus;
  joinDate: string;
  avatar: string;
}