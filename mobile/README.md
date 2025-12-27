# YatriAI Mobile App

React Native mobile app built with Expo for Android and iOS.

## Quick Start

### Prerequisites

1. **Node.js** (v18 or higher)
2. **Android Studio** with Android SDK
3. **Android Emulator** (created via Android Studio Device Manager)

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start Android Emulator:**
   - Open Android Studio
   - Go to **Tools > Device Manager**
   - Start your emulator (or create one if needed)

3. **Start Backend Server:**
   ```bash
   cd ../backend
   npm run dev
   ```

4. **Run the App:**
   ```bash
   # Option 1: Using Expo Go (easier)
   npm start
   # Then press 'a' to open in Android emulator

   # Option 2: Development build (recommended)
   npx expo run:android
   ```

## Configuration

### API URL

The app is configured to use `http://10.0.2.2:3001/api` for Android emulator (this IP maps to your host machine's localhost).

To change it, create `.env` file:
```
EXPO_PUBLIC_API_URL=http://10.0.2.2:3001/api
```

## Documentation

- **Android Emulator Setup**: See `ANDROID_EMULATOR_SETUP.md`
- **General Setup**: See `SETUP.md`

## Troubleshooting

### "ANDROID_HOME not set"
- Set `ANDROID_HOME` environment variable to your Android SDK path
- Or create `android/local.properties` with: `sdk.dir=C:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk`

### "No emulator found"
- Make sure emulator is running in Android Studio
- Run `adb devices` to verify connection

### "Connection refused"
- Backend must be running on `localhost:3001`
- Android emulator uses `10.0.2.2` to access host's localhost

## Scripts

- `npm start` - Start Expo development server
- `npm run android` - Build and run on Android emulator
- `npx expo prebuild` - Generate native Android/iOS folders
