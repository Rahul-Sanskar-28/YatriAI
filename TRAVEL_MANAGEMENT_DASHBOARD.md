# Travel Management Dashboard

A comprehensive travel planning and management system integrated into the YatriAI platform, designed to help users plan their journeys with detailed itineraries and discover nearby services.

## 🌟 Features

### 📅 Smart Itinerary Planning
- **Create Travel Plans**: Build detailed travel plans with titles, descriptions, dates, and budgets
- **Destination Management**: Add multiple destinations with specific visit times and durations
- **Priority System**: Set priority levels (high, medium, low) for destinations
- **Category Organization**: Organize destinations by categories (heritage, temple, food, shopping, nature)
- **Status Tracking**: Track plan status (draft, confirmed, completed)

### 🗺️ Location-Based Services
- **Nearby Services Discovery**: Find services around each destination
- **Service Types**: Metro stations, bus stops, restaurants, hotels, ATMs, hospitals, shopping centers, attractions
- **Distance & Time**: Walking distance and estimated time to reach services
- **Real-time Information**: Operating hours, contact details, ratings
- **Service Filtering**: Filter by service type and search by name

### 🚇 Transport Integration
- **Metro Stations**: Find nearby metro stations with operating hours and accessibility features
- **Bus Stops**: Locate bus terminals and stops with route information
- **Distance Calculation**: Accurate walking distances and time estimates
- **Transport Features**: Air conditioning, wheelchair accessibility, parking availability

### 🍽️ Restaurant Recommendations
- **Curated Restaurants**: Discover highly-rated restaurants near destinations
- **Cuisine Types**: Bengali, Continental, Mughlai, and more
- **Price Ranges**: Budget-friendly to luxury dining options
- **Features**: Takeaway, home delivery, historic significance
- **Contact Information**: Phone numbers and addresses

### 🏨 Accommodation & Services
- **Hotels**: Find nearby hotels with ratings and amenities
- **ATMs**: Locate ATMs for cash withdrawal and banking services
- **Hospitals**: Emergency medical facilities and contact information
- **Shopping**: Traditional markets and modern shopping centers

## 🎯 Key Components

### TravelPlanningDashboard
Main dashboard component that provides:
- Travel plan creation and management
- Destination planning with detailed information
- Integration with nearby services
- Budget tracking and cost estimation
- Visual timeline and itinerary display

### NearbyServicesMap
Service discovery component featuring:
- Real-time service information
- Interactive service filtering
- Distance-based sorting
- Detailed service information cards
- Contact and operating hours display

### TravelPlanningDemo
Demonstration component showcasing:
- Feature highlights and capabilities
- Sample travel plans and itineraries
- Nearby services examples
- Interactive preview of functionality

## 📱 User Interface

### Modern Design
- **Responsive Layout**: Works seamlessly on desktop and mobile devices
- **Dark Mode Support**: Full dark/light theme compatibility
- **Kolkata Heritage Colors**: Uses authentic Kolkata color palette
- **Smooth Animations**: Framer Motion animations for enhanced UX
- **Intuitive Icons**: Lucide React icons for clear visual communication

### Interactive Elements
- **Drag & Drop**: Reorder destinations in itinerary
- **Quick Actions**: One-click access to nearby services
- **Search & Filter**: Find specific services or destinations
- **Status Indicators**: Visual status updates and confirmations
- **Progress Tracking**: Visual progress bars and completion status

## 🔧 Technical Implementation

### Technology Stack
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Full type safety and better development experience
- **Framer Motion**: Smooth animations and transitions
- **Tailwind CSS**: Utility-first styling with custom Kolkata theme
- **Date-fns**: Date manipulation and formatting
- **Lucide React**: Modern icon library

### Data Structure
```typescript
interface TravelPlan {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  destinations: TravelDestination[];
  budget: number;
  status: 'draft' | 'confirmed' | 'completed';
  createdAt: string;
}

interface TravelDestination {
  id: string;
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
  visitDate: string;
  visitTime: string;
  duration: number;
  category: 'heritage' | 'temple' | 'food' | 'shopping' | 'nature';
  priority: 'high' | 'medium' | 'low';
  notes: string;
  nearbyServices: NearbyService[];
  estimatedCost: number;
  photos: string[];
  isVisited: boolean;
}

interface NearbyService {
  id: string;
  name: string;
  type: 'metro' | 'bus' | 'restaurant' | 'hotel' | 'atm' | 'hospital';
  distance: number;
  rating: number;
  address: string;
  coordinates: { lat: number; lng: number };
  operatingHours: string;
  contact?: string;
}
```

### Integration Points
- **Tourist Dashboard**: Integrated as a new menu item "Travel Planning"
- **Translation System**: Full i18n support with translation keys
- **Theme System**: Respects user's dark/light mode preference
- **Authentication**: Uses existing auth context for user management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- YatriAI project setup completed
- All dependencies installed (`npm install`)

### Usage
1. **Access Dashboard**: Navigate to Tourist Dashboard → Travel Planning
2. **Create Plan**: Click "Create New Plan" to start planning
3. **Add Destinations**: Add destinations with details and timing
4. **Discover Services**: Click navigation icon to find nearby services
5. **Manage Budget**: Track costs and manage travel budget
6. **Save & Share**: Save plans and share with travel companions

### Sample Data
The dashboard includes comprehensive sample data for Kolkata:
- **Victoria Memorial**: Heritage site with nearby metro and restaurants
- **Howrah Bridge**: Iconic landmark with transport connections
- **Flurys Restaurant**: Historic restaurant on Park Street
- **Maidan Metro Station**: Central metro station with accessibility features

## 🎨 Customization

### Adding New Service Types
```typescript
// Add to NearbyService interface
type ServiceType = 'metro' | 'bus' | 'restaurant' | 'hotel' | 'atm' | 'hospital' | 'shopping' | 'attraction' | 'your_new_type';

// Add icon mapping
const getServiceIcon = (type: string) => {
  switch (type) {
    case 'your_new_type': return <YourIcon className="w-5 h-5" />;
    // ... other cases
  }
};
```

### Custom Categories
```typescript
// Extend destination categories
type DestinationCategory = 'heritage' | 'temples' | 'culture' | 'literature' | 'food' | 'markets' | 'nature' | 'your_category';
```

### Styling Customization
The dashboard uses Tailwind CSS with custom Kolkata heritage colors:
- `kolkata-yellow`: #FFB800 (Tram Yellow)
- `kolkata-gold`: #D4A015 (Heritage Gold)
- `kolkata-terracotta`: #C45C26 (Kumartuli Terracotta)

## 🔮 Future Enhancements

### Planned Features
- **AI Route Optimization**: Automatic route planning based on distance and time
- **Real-time Updates**: Live transport schedules and service availability
- **Social Sharing**: Share itineraries with friends and family
- **Offline Support**: Download plans for offline access
- **GPS Navigation**: Turn-by-turn navigation integration
- **Weather Integration**: Weather-based recommendations and alerts
- **Budget Analytics**: Spending analysis and budget optimization
- **Group Planning**: Collaborative planning for group trips

### API Integrations
- **Google Places API**: Real-time place information and reviews
- **Google Maps API**: Interactive maps and navigation
- **Zomato API**: Restaurant details and reviews
- **Transport APIs**: Real-time metro and bus schedules
- **Weather API**: Weather forecasts and alerts

## 📊 Analytics & Insights

### User Behavior Tracking
- Plan creation and completion rates
- Most popular destinations and services
- Average trip duration and budget
- Service discovery patterns

### Performance Metrics
- Component load times
- Search and filter performance
- Mobile responsiveness metrics
- User engagement analytics

## 🤝 Contributing

### Development Guidelines
1. Follow TypeScript best practices
2. Use existing design system and colors
3. Maintain responsive design principles
4. Add proper error handling and loading states
5. Include comprehensive type definitions

### Testing
- Unit tests for utility functions
- Component testing with React Testing Library
- Integration tests for user workflows
- Performance testing for large datasets

## 📄 License

This travel management dashboard is part of the YatriAI project and follows the same licensing terms.

---

**Built with ❤️ for the City of Joy - Kolkata Heritage Tourism Platform**