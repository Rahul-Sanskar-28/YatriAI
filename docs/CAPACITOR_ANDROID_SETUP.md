# Capacitor Android Setup Guide

## Prerequisites

1. **Android Studio** installed
2. **Android SDK** (API 33+ recommended)
3. **Java JDK** (17 or higher)
4. **Environment Variables**:
   - `ANDROID_HOME` = `C:\Users\YourUsername\AppData\Local\Android\Sdk`
   - Add to PATH: `%ANDROID_HOME%\platform-tools`

## Installation Steps

### 1. Install Capacitor Dependencies

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
```

### 2. Initialize Capacitor

```bash
npx cap init YatriAI com.yatri.ai --web-dir=dist
```

### 3. Build Web App

```bash
npm run build
```

### 4. Add Android Platform

```bash
npx cap add android
```

### 5. Sync Web Assets

```bash
npx cap sync android
```

## Build and Run Commands

### Build Web App
```bash
npm run build
```

### Sync to Android (after build)
```bash
npm run cap:sync
# Or manually:
npm run build && npx cap sync android
```

### Open in Android Studio
```bash
npm run cap:android
# Or:
npx cap open android
```

### Build and Sync (one command)
```bash
npm run cap:build
```

## Running on Physical Device via USB

### 1. Enable USB Debugging on Device

1. Go to **Settings → About Phone**
2. Tap **Build Number** 7 times to enable Developer Options
3. Go to **Settings → Developer Options**
4. Enable **USB Debugging**
5. Connect device via USB

### 2. Verify Device Connection

```bash
adb devices
```

Should show your device:
```
List of devices attached
ABC123XYZ    device
```

### 3. Build and Install

**Option A: Via Android Studio**
1. Open project: `npx cap open android`
2. Wait for Gradle sync
3. Select your device from device dropdown
4. Click **Run** (green play button) or press `Shift+F10`

**Option B: Via Command Line**
```bash
cd android
.\gradlew.bat assembleDebug
.\gradlew.bat installDebug
```

### 4. Run App

The app will automatically install and launch on your device.

## Configuration Files

### `capacitor.config.ts`
```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yatri.ai',
  appName: 'YatriAI',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};
```

### `vite.config.ts`
```typescript
export default defineConfig({
  base: './', // Required for Capacitor
  build: {
    outDir: 'dist',
  },
});
```

## Common Issues & Solutions

### Issue: "adb: command not found"
**Solution:**
- Add `%ANDROID_HOME%\platform-tools` to PATH
- Restart terminal
- Verify: `adb version`

### Issue: "No devices found"
**Solution:**
1. Check USB cable (use data cable, not charging-only)
2. Enable USB Debugging on device
3. Accept "Allow USB Debugging" prompt on device
4. Check: `adb devices`
5. Try: `adb kill-server && adb start-server`

### Issue: "Build directory mismatch"
**Solution:**
- Ensure `vite.config.ts` has `base: './'`
- Run `npm run build` before syncing
- Run `npx cap sync android` after build

### Issue: "White screen" or "App not loading"
**Solution:**
1. Check `dist/` folder exists and has files
2. Verify `capacitor.config.ts` has correct `webDir: 'dist'`
3. Rebuild: `npm run build && npx cap sync android`
4. Check Android Studio Logcat for errors

### Issue: "Network requests failing"
**Solution:**
- For localhost backend, use your computer's IP (not `localhost`)
- Update API URLs in environment variables
- Check AndroidManifest.xml has internet permission

### Issue: "Gradle build failed"
**Solution:**
1. Open Android Studio
2. File → Sync Project with Gradle Files
3. Check `android/local.properties` has `sdk.dir` set
4. Clean: `cd android && .\gradlew.bat clean`

## AndroidManifest.xml Permissions

Ensure these permissions exist in `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

## Development Workflow

1. **Make changes** to React code
2. **Build**: `npm run build`
3. **Sync**: `npx cap sync android`
4. **Run**: Open Android Studio and click Run
5. **Repeat** steps 1-4 for each change

## Production Build

### Generate Signed APK

1. Create keystore:
```bash
keytool -genkey -v -keystore yatriai-release.keystore -alias yatriai -keyalg RSA -keysize 2048 -validity 10000
```

2. Update `android/app/build.gradle`:
```gradle
android {
    signingConfigs {
        release {
            storeFile file('yatriai-release.keystore')
            storePassword 'your-password'
            keyAlias 'yatriai'
            keyPassword 'your-password'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

3. Build release APK:
```bash
cd android
.\gradlew.bat assembleRelease
```

APK location: `android/app/build/outputs/apk/release/app-release.apk`

## Quick Reference

| Task | Command |
|------|---------|
| Build web app | `npm run build` |
| Sync to Android | `npx cap sync android` |
| Open Android Studio | `npx cap open android` |
| Check devices | `adb devices` |
| Install on device | `adb install android/app/build/outputs/apk/debug/app-debug.apk` |
| View logs | `adb logcat` |

## Notes

- **Always build before syncing**: `npm run build && npx cap sync android`
- **dist/ folder**: Must exist and contain built files
- **Environment variables**: Use `VITE_*` prefix, accessible via `import.meta.env.VITE_*`
- **Backend URL**: Use your computer's IP address, not `localhost` (e.g., `http://192.168.1.100:3001`)

