# Capacitor Android - Quick Start

## Step-by-Step Setup

### 1. Install Dependencies
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

### 5. Sync Assets
```bash
npx cap sync android
```

## Running on Physical Device

### Prerequisites
- Android Studio installed
- USB Debugging enabled on device
- Device connected via USB

### Steps

1. **Enable USB Debugging** (on device):
   - Settings → About Phone → Tap Build Number 7 times
   - Settings → Developer Options → Enable USB Debugging

2. **Verify Connection**:
   ```bash
   adb devices
   ```
   Should show your device ID.

3. **Build and Sync**:
   ```bash
   npm run build
   npx cap sync android
   ```

4. **Open in Android Studio**:
   ```bash
   npx cap open android
   ```

5. **Run on Device**:
   - In Android Studio, select your device from dropdown
   - Click Run button (green play icon) or press `Shift+F10`
   - App will install and launch automatically

## Quick Commands

| Task | Command |
|------|---------|
| Build web app | `npm run build` |
| Sync to Android | `npx cap sync android` |
| Build + Sync | `npm run cap:build` |
| Open Android Studio | `npm run cap:android` |
| Check devices | `adb devices` |

## Common Issues

### "adb: command not found"
- Add `%ANDROID_HOME%\platform-tools` to PATH
- Restart terminal

### "No devices found"
- Check USB cable (use data cable)
- Enable USB Debugging
- Accept "Allow USB Debugging" prompt
- Run: `adb kill-server && adb start-server`

### "White screen"
- Ensure `dist/` folder exists
- Run: `npm run build && npx cap sync android`
- Check Android Studio Logcat for errors

### "Network requests failing"
- Use your computer's IP address (not `localhost`)
- Example: `http://192.168.1.100:3001`

## Important Notes

- **Always build before syncing**: `npm run build && npx cap sync android`
- **Backend URL**: Use computer's IP address for physical device
- **Environment variables**: Use `VITE_*` prefix
- **dist/ folder**: Must exist and contain built files

## Full Documentation

See `docs/CAPACITOR_ANDROID_SETUP.md` for detailed guide.


