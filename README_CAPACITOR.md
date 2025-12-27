# YatriAI - Capacitor Android App

This document provides step-by-step instructions to convert the React (Vite) web app into an Android app using Capacitor.

## ✅ Setup Complete

The following has been configured:

1. ✅ Capacitor dependencies installed
2. ✅ Capacitor initialized (`capacitor.config.ts`)
3. ✅ Vite configured for Capacitor (`base: './'`)
4. ✅ Build scripts added to `package.json`
5. ✅ Android platform ready to add

## Quick Start

### Initial Setup (One-time)

```bash
# 1. Install dependencies (if not already done)
npm install

# 2. Add Android platform
npx cap add android

# 3. Build web app
npm run build

# 4. Sync to Android
npx cap sync android
```

### Running on Physical Device

```bash
# 1. Build web app
npm run build

# 2. Sync to Android
npx cap sync android

# 3. Open in Android Studio
npx cap open android

# 4. In Android Studio:
#    - Select your device from dropdown
#    - Click Run (green play button)
```

## Commands Reference

| Command | Description |
|---------|-------------|
| `npm run build` | Build web app to `dist/` |
| `npm run cap:sync` | Build + sync to Android |
| `npm run cap:build` | Build + sync Android |
| `npm run cap:android` | Open Android Studio |
| `npx cap sync android` | Sync web assets to Android |
| `adb devices` | List connected Android devices |

## File Structure

```
YatriAI/
├── dist/                    # Built web app (generated)
├── android/                 # Android project (generated)
├── capacitor.config.ts      # Capacitor configuration
├── vite.config.ts           # Vite config (updated for Capacitor)
└── package.json             # Build scripts added
```

## Configuration Files

### `capacitor.config.ts`
- App ID: `com.yatri.ai`
- App Name: `YatriAI`
- Web Directory: `dist`

### `vite.config.ts`
- Base path: `./` (required for Capacitor)
- Build output: `dist/`

## Prerequisites

- **Android Studio** installed
- **Android SDK** (API 33+)
- **Java JDK** 17+
- **Environment Variables**:
  - `ANDROID_HOME` = `C:\Users\YourUsername\AppData\Local\Android\Sdk`
  - Add to PATH: `%ANDROID_HOME%\platform-tools`

## USB Debugging Setup

1. On Android device:
   - Settings → About Phone → Tap Build Number 7 times
   - Settings → Developer Options → Enable USB Debugging

2. Connect device via USB

3. Verify connection:
   ```bash
   adb devices
   ```

## Common Issues

### Issue: "adb: command not found"
**Fix:** Add `%ANDROID_HOME%\platform-tools` to PATH

### Issue: "No devices found"
**Fix:**
- Use data cable (not charging-only)
- Enable USB Debugging
- Accept "Allow USB Debugging" prompt
- Run: `adb kill-server && adb start-server`

### Issue: "White screen" or app not loading
**Fix:**
- Ensure `dist/` folder exists: `npm run build`
- Sync: `npx cap sync android`
- Check Android Studio Logcat for errors

### Issue: "Network requests failing"
**Fix:**
- Use computer's IP address (not `localhost`)
- Example: `http://192.168.1.100:3001`
- Update environment variables accordingly

## Development Workflow

1. Make changes to React code
2. Build: `npm run build`
3. Sync: `npx cap sync android`
4. Run: Open Android Studio → Click Run
5. Repeat for each change

## Production Build

See `docs/CAPACITOR_ANDROID_SETUP.md` for production build instructions.

## Documentation

- **Quick Start**: `CAPACITOR_QUICK_START.md`
- **Detailed Guide**: `docs/CAPACITOR_ANDROID_SETUP.md`

## Notes

- Backend code is **NOT modified**
- Uses existing `VITE_*` environment variables
- Web app codebase remains unchanged
- Only Capacitor wrapper added

