# YatriAI Mobile App

React Native mobile application for YatriAI tourism platform, built with Expo and TypeScript.

## Features

- ✅ Offline-first support with SQLite caching
- ✅ Push notifications
- ✅ JWT authentication
- ✅ Network detection and sync
- ✅ Reuses existing Node.js backend APIs

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create a `.env` file:
```
EXPO_PUBLIC_API_URL=http://localhost:3001/api
EXPO_PUBLIC_PROJECT_ID=your-expo-project-id
```

3. Start the development server:
```bash
npm start
```

4. Run on Android:
```bash
npm run android
```

## Project Structure

```
mobile/
├── src/
│   ├── api/
│   │   └── client.ts          # Axios API client
│   ├── screens/
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   └── TouristDashboardScreen.tsx
│   ├── store/
│   │   └── authStore.ts       # Zustand auth store
│   ├── services/
│   │   ├── offline.ts         # Network detection
│   │   ├── sync.ts            # Offline queue & sync
│   │   └── notifications.ts   # Push notifications
│   ├── navigation/
│   │   └── AppNavigator.tsx   # Navigation setup
│   └── utils/
│       └── index.ts           # Utility functions
├── App.tsx                     # Main app entry
└── package.json
```

## Backend Integration

The app connects to the existing Node.js backend at `http://localhost:3001/api`. No backend changes are required.

## Offline Support

- Actions are queued when offline
- Automatically syncs when network is restored
- Uses SQLite for local storage

## Push Notifications

- Expo push notifications configured
- Token registration on app launch
- Foreground and background handlers













