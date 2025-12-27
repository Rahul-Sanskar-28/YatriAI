# Fix: "Hello Android!" Issue

## Problem
The app shows "Hello Android!" instead of the actual YatriAI app.

## Solution Applied
✅ Registered the app component with React Native's AppRegistry

## How to Run the App Correctly

### Option 1: Development Build (Recommended)
```bash
cd mobile
npx expo run:android
```

This will:
- Start Metro bundler automatically
- Build and install the app on emulator
- Connect to Metro for hot reload

### Option 2: Expo Go (Easier for testing)
```bash
cd mobile
npm start
# Then press 'a' to open in Android emulator
```

**Note:** Expo Go has limitations and may not work with all native modules.

## Important: Make Sure Metro Bundler is Running

The "Hello Android!" message appears when:
- The React Native bundle isn't loading
- Metro bundler isn't running
- The app can't connect to the development server

**Solution:**
1. Always use `npx expo run:android` (starts Metro automatically)
2. Or manually start Metro: `npm start` in one terminal, then `npx expo run:android` in another

## Verify It's Working

After running the app, you should see:
- ✅ Login screen (if not authenticated)
- ✅ Dashboard (if authenticated)
- ✅ Metro bundler connection in terminal

If you still see "Hello Android!":
1. Check Metro bundler is running
2. Check emulator can reach `10.0.2.2:8081` (Metro default port)
3. Rebuild: `cd android && ./gradlew clean && cd .. && npx expo run:android`

