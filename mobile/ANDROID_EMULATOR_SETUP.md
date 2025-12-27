# Android Studio Emulator Setup Guide

## Prerequisites

1. **Install Android Studio**
   - Download from: https://developer.android.com/studio
   - Install Android SDK, Android SDK Platform-Tools, and Android Emulator

2. **Set Environment Variables** (Windows)
   ```powershell
   # Add to System Environment Variables:
   ANDROID_HOME = C:\Users\YourUsername\AppData\Local\Android\Sdk
   
   # Add to PATH:
   %ANDROID_HOME%\platform-tools
   %ANDROID_HOME%\emulator
   %ANDROID_HOME%\tools
   %ANDROID_HOME%\tools\bin
   ```

## Setup Steps

### 1. Create Android Virtual Device (AVD)

1. Open Android Studio
2. Go to **Tools > Device Manager**
3. Click **Create Device**
4. Select a device (e.g., **Pixel 5**)
5. Select a system image (recommended: **API 33 or 34**)
6. Click **Finish**

### 2. Start the Emulator

1. In Android Studio Device Manager, click **▶ Play** button next to your AVD
2. Wait for emulator to fully boot (home screen visible)

### 3. Verify Emulator is Running

```bash
adb devices
```

You should see your emulator listed.

### 4. Update API URL for Emulator

The app is configured to use `http://10.0.2.2:3001/api` for Android emulator (this is the special IP that maps to your host machine's localhost).

**If you need to change it:**
Create `.env` file in `mobile/` directory:
```
EXPO_PUBLIC_API_URL=http://10.0.2.2:3001/api
```

### 5. Start Backend Server

Make sure backend is running on `localhost:3001`:
```bash
cd backend
npm run dev
```

### 6. Run the App

**Option A: Using Expo Go (Easier)**
```bash
cd mobile
npm start
# Then press 'a' to open in Android emulator
```

**Option B: Build and Install Directly (Development Build)**
```bash
cd mobile
npx expo run:android
```

This will:
- Build the native Android app
- Install it on the emulator
- Start the app automatically

## Troubleshooting

### "ANDROID_HOME not set"
- Set the environment variable (see Prerequisites)
- Restart terminal/IDE after setting

### "No emulator found"
- Make sure emulator is running (check Android Studio Device Manager)
- Run `adb devices` to verify connection

### "Connection refused" or "Network error"
- Backend must be running on `localhost:3001`
- Android emulator uses `10.0.2.2` to access host's localhost
- Verify backend is accessible: `http://localhost:3001/api/health`

### "Build failed"
- Make sure Android SDK is installed
- Install required build tools:
  ```bash
  sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.0"
  ```

### "Expo Go not found"
- Install Expo Go from Play Store in the emulator
- Or use `npx expo run:android` for development build

## Quick Start Commands

```bash
# 1. Start backend
cd backend
npm run dev

# 2. In new terminal, start Expo
cd mobile
npm start

# 3. Press 'a' when Expo starts, or:
npx expo run:android
```

## Notes

- **Android Emulator IP**: `10.0.2.2` maps to host's `localhost`
- **Backend URL**: Must be `http://localhost:3001` (not network IP)
- **Performance**: Emulator may be slow - consider using a physical device for better performance
- **Hot Reload**: Works automatically with Expo







