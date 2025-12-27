# Location Search Feature - Implementation Guide

## Overview
This implementation adds a comprehensive location search feature with detailed place information and "how to reach" directions.

## Features Implemented

### 1. Enhanced Database Schema
**File**: `backend/prisma/schema.prisma`

Added new fields to the Destination model:
- **Location Details**: address, city, state, country, zipCode
- **Place Information**: openingHours, entryFee, bestTimeToVisit, estimatedDuration, website, phoneNumber
- **Transportation Info**: nearestMetro, nearestBusStop, nearestRailway, parkingAvailable, accessibleBy, directions, distanceFromCity
- **Additional Data**: images array, tags, amenities

### 2. Backend API Endpoints
**File**: `backend/src/controllers/destinationController.ts`

#### New Search Endpoint: `GET /api/destinations/search`
Query parameters:
- `query` - Search by name, description, address, or tags
- `category` - Filter by destination category
- `city` - Filter by city

Example:
```bash
GET /api/destinations/search?query=Victoria Memorial&category=cultural
```

#### Updated Endpoints:
- `GET /api/destinations` - Returns all destinations with full details
- `GET /api/destinations/:id` - Returns single destination with full details
- `POST /api/destinations` - Create destination with full schema (admin only)
- `PUT /api/destinations/:id` - Update destination (admin only)

### 3. Frontend Components

#### DestinationDetail Component
**File**: `src/components/common/DestinationDetail.tsx`

Displays comprehensive destination information:
- Hero image with rating and category
- Full description
- Opening hours, entry fee, best time to visit, duration
- Contact information (website, phone)
- How to reach section with:
  - Transportation options (metro, bus, taxi, etc.)
  - Nearest stations and stops
  - Parking availability
  - Distance from city center
  - Detailed directions
  - Google Maps integration
- Tags and amenities

#### DestinationSearch Component
**File**: `src/components/common/DestinationSearch.tsx`

Features:
- Search bar with real-time query
- Grid layout of destination cards
- Click to view detailed information
- Loading and error states
- Responsive design

### 4. Updated HeroSection
**File**: `src/components/landing/HeroSection.tsx`

Changes:
- Search now navigates to `/search` route with query parameters
- Quick access buttons navigate to search with relevant queries
- Works for both authenticated and non-authenticated users

### 5. Updated App Routes
**File**: `src/App.tsx`

Added new route:
```tsx
<Route path="/search" element={<DestinationSearch />} />
```

## Database Migration

To update your database with the new schema:

```bash
cd backend
npx prisma migrate dev --name add_destination_details
npx prisma generate
```

## Sample Data

Sample destinations are provided in:
**File**: `backend/src/data/sampleDestinations.ts`

Includes 7 popular Kolkata destinations with full details:
1. Victoria Memorial
2. Howrah Bridge
3. Kalighat Temple
4. Indian Museum
5. Princep Ghat
6. Kumartuli
7. Park Street

### To Seed the Database:

Update your `backend/prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';
import { sampleDestinations } from '../src/data/sampleDestinations.js';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding destinations...');
  
  for (const dest of sampleDestinations) {
    await prisma.destination.create({
      data: dest
    });
  }
  
  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Run the seed:
```bash
cd backend
npx prisma db seed
```

## Usage

### For Users:
1. Go to the homepage
2. Enter a place name in the search bar (e.g., "Victoria Memorial")
3. Click "Explore" or press Enter
4. Browse search results
5. Click on any destination card to view full details including:
   - Location address
   - Opening hours and entry fees
   - How to reach (metro, bus, directions)
   - Amenities and facilities
   - Google Maps link

### For Developers:

#### Backend API Integration:
```typescript
// Search destinations
const response = await axios.get('/api/destinations/search', {
  params: {
    query: 'temple',
    category: 'spiritual',
    city: 'Kolkata'
  }
});

// Get destination by ID
const destination = await axios.get(`/api/destinations/${id}`);
```

#### Frontend Components:
```tsx
// Use DestinationDetail component
import { DestinationDetail } from './components/common/DestinationDetail';

<DestinationDetail destination={destinationData} />

// Use DestinationSearch component
import DestinationSearch from './components/common/DestinationSearch';

// Navigate to search
navigate('/search?query=heritage&category=cultural');
```

## API Response Format

```json
{
  "success": true,
  "data": [
    {
      "id": "cuid123",
      "name": "Victoria Memorial",
      "description": "A magnificent white marble building...",
      "image": "https://...",
      "images": ["https://...", "https://..."],
      "category": "cultural",
      "rating": 4.7,
      "location": {
        "lat": 22.5448,
        "lng": 88.3426,
        "address": "1, Queens Way, Maidan",
        "city": "Kolkata",
        "state": "West Bengal",
        "country": "India",
        "zipCode": "700071"
      },
      "details": {
        "openingHours": "Tuesday - Sunday: 10:00 AM - 5:00 PM",
        "entryFee": "Indians: ₹30, Foreigners: ₹500",
        "bestTimeToVisit": "October to March",
        "estimatedDuration": "2-3 hours",
        "website": "https://...",
        "phoneNumber": "+91-33-2223-1890"
      },
      "howToReach": {
        "nearestMetro": "Maidan Metro Station (450m)",
        "nearestBusStop": "Victoria Memorial Bus Stop",
        "nearestRailway": "Howrah Railway Station (5 km)",
        "parkingAvailable": true,
        "accessibleBy": ["metro", "bus", "taxi", "walking"],
        "directions": "From Maidan Metro Station...",
        "distanceFromCity": 2.5
      },
      "tags": ["heritage", "museum", "architecture"],
      "amenities": ["wheelchair-accessible", "restrooms", "cafeteria"]
    }
  ],
  "count": 1
}
```

## Testing

### Test Search Functionality:
1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend:
   ```bash
   cd ../
   npm run dev
   ```

3. Navigate to `http://localhost:5173`
4. Test various searches:
   - Search for "memorial"
   - Search for "temple"
   - Click on results to view details
   - Click "Open in Google Maps"

### API Testing with curl:
```bash
# Search destinations
curl "http://localhost:3000/api/destinations/search?query=memorial"

# Get all destinations
curl "http://localhost:3000/api/destinations"

# Get specific destination
curl "http://localhost:3000/api/destinations/[DESTINATION_ID]"
```

## Styling

The components use Tailwind CSS with custom Kolkata-themed colors:
- `kolkata-yellow` - #FFB800
- `kolkata-gold` - #C45C26
- `kolkata-maroon` - Dark maroon
- `durga-500` - Festive colors

## Future Enhancements

1. **Map Integration**: Add interactive map view with markers
2. **Favorites**: Allow users to save favorite destinations
3. **Reviews**: Add user reviews and ratings
4. **Filters**: Advanced filters (price range, accessibility, etc.)
5. **Nearby Places**: Show nearby destinations
6. **Real-time Navigation**: Integrate with Google Maps API for live directions
7. **Multi-language**: Add translations for destination details
8. **Photos Gallery**: Multiple image carousel
9. **Booking Integration**: Link to tour bookings
10. **Weather Info**: Show current weather at destination

## Troubleshooting

### Issue: Search returns no results
- Check if backend is running on port 3000
- Verify database has been seeded with destinations
- Check console for API errors

### Issue: Images not loading
- Verify image URLs are accessible
- Check network tab for 404 errors
- Update image URLs in sample data

### Issue: Google Maps not opening
- Ensure location coordinates are valid
- Check browser popup blocker settings

## Support

For issues or questions:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure database migrations are up to date
4. Check API endpoint responses
