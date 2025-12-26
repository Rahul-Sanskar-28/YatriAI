# YatriAI Mobile App - Setup Guide

## Prerequisites

- Node.js 18+ installed
- Expo CLI installed globally: `npm install -g expo-cli`
- Android Studio (for Android development) or Xcode (for iOS development)
- Expo Go app on your mobile device (for testing)

## Installation

1. Navigate to the mobile directory:
```bash
cd mobile
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env` (if it exists)
   - Set `EXPO_PUBLIC_API_URL` to your backend URL (default: `http://localhost:3001/api`)
   - Set `EXPO_PUBLIC_PROJECT_ID` for push notifications (get from Expo dashboard)

## Running the App

### Development Mode

1. Start the Expo development server:
```bash
npm start
```

2. Choose your platform:
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Scan QR code with Expo Go app on your device

### Android Production Build

1. Build APK:
```bash
npx expo build:android
```

2. Or build AAB (for Play Store):
```bash
npx expo build:android -t app-bundle
```

## Project Structure

```
mobile/
├── src/
│   ├── api/
│   │   └── client.ts              # Axios API client with token management
│   ├── screens/
│   │   ├── LoginScreen.tsx        # Login screen
│   │   ├── RegisterScreen.tsx     # Registration screen
│   │   └── TouristDashboardScreen.tsx  # Main dashboard
│   ├── components/
│   │   └── LoadingScreen.tsx      # Loading component
│   ├── store/
│   │   └── authStore.ts           # Zustand auth store
│   ├── services/
│   │   ├── offline.ts             # Network detection
│   │   ├── sync.ts                # Offline queue & sync
│   │   └── notifications.ts        # Push notifications
│   ├── navigation/
│   │   └── AppNavigator.tsx       # Navigation setup
│   ├── utils/
│   │   └── index.ts               # Utility functions
│   └── types/
│       └── index.ts               # TypeScript types
├── App.tsx                        # Main app entry point
├── app.json                       # Expo configuration
└── package.json                   # Dependencies
```

## Features Implemented

✅ **Authentication**
- Login/Register screens
- JWT token management with AsyncStorage
- Session restoration on app launch
- Role-based access (tourist, admin, guide, seller)

✅ **Offline-First**
- Network detection using @react-native-community/netinfo
- SQLite database for offline queue
- Automatic sync when network restored
- Graceful offline UI

✅ **Push Notifications**
- Expo push token registration
- Foreground and background handlers
- Notification permission handling

✅ **Navigation**
- Stack navigation for auth flow
- Tab navigation for main app
- Native back button handling

✅ **API Integration**
- Single Axios client
- Automatic token injection
- Global 401 handling
- Reuses existing backend APIs

## Backend Integration

The mobile app connects to your existing Node.js backend. No backend changes are required.

**API Base URL**: Configured via `EXPO_PUBLIC_API_URL` environment variable.

**Endpoints Used**:
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user
- `GET /api/bookings/my` - Get user bookings
- And more...

## Testing

1. **Login Flow**:
   - Test with valid credentials
   - Test with invalid credentials
   - Test offline login (should queue)

2. **Offline Mode**:
   - Turn off network
   - Perform actions (should queue)
   - Turn on network (should sync)

3. **Push Notifications**:
   - Grant notification permissions
   - Verify token registration
   - Test foreground/background notifications

## Troubleshooting

### Metro bundler issues
```bash
npx expo start --clear
```

### Android build issues
```bash
cd android && ./gradlew clean && cd ..
```

### Network connection issues
- Ensure backend is running on the configured port
- Check `EXPO_PUBLIC_API_URL` is correct
- For Android emulator, use `10.0.2.2` instead of `localhost`

## Production Checklist

- [ ] Set production API URL in environment
- [ ] Configure Expo project ID for push notifications
- [ ] Test on physical devices
- [ ] Verify offline functionality
- [ ] Test push notifications
- [ ] Build production APK/AAB
- [ ] Test production build thoroughly






