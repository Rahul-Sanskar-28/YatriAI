# Android Setup - Complete Instructions

## ✅ Setup Steps Completed

1. ✅ Capacitor dependencies installed
2. ✅ Capacitor initialized (`capacitor.config.ts`)
3. ✅ Vite configured for Capacitor
4. ✅ Build scripts added
5. ✅ Android platform added
6. ✅ Web app built
7. ✅ Assets synced to Android

## 🚀 Running on Physical Device

### Step 1: Enable USB Debugging

On your Android device:
1. Go to **Settings → About Phone**
2. Tap **Build Number** 7 times (enables Developer Options)
3. Go to **Settings → Developer Options**
4. Enable **USB Debugging**
5. Connect device via USB cable (use data cable, not charging-only)

### Step 2: Verify Device Connection

```bash
adb devices
```

Expected output:
```
List of devices attached
ABC123XYZ    device
```

If no devices shown:
- Check USB cable
- Accept "Allow USB Debugging" prompt on device
- Run: `adb kill-server && adb start-server`

### Step 3: Build and Sync

```bash
# Build web app
npm run build

# Sync to Android
npx cap sync android
```

### Step 4: Open in Android Studio

```bash
npx cap open android
```

### Step 5: Run on Device

In Android Studio:
1. Wait for Gradle sync to complete
2. Select your device from the device dropdown (top toolbar)
3. Click **Run** button (green play icon) or press `Shift+F10`
4. App will install and launch automatically

## 📱 Configuration for Physical Device

### Backend API URL

For physical devices, use your **computer's IP address** instead of `localhost`:

1. **Find your IP address:**
   ```powershell
   ipconfig | Select-String "IPv4"
   ```
   Look for IP on your active network adapter (usually `192.168.x.x`)

2. **Update environment variables:**
   Create `.env.local` file:
   ```bash
   # Use your computer's IP address
   VITE_API_URL=http://192.168.1.100:3001
   VITE_BACKEND_URL=http://192.168.1.100:3001
   ```

3. **Rebuild and sync:**
   ```bash
   npm run build
   npx cap sync android
   ```

### Example Configuration

If your computer IP is `192.168.1.100` and backend runs on port `3001`:

```bash
# .env.local
VITE_API_URL=http://192.168.1.100:3001
VITE_BACKEND_URL=http://192.168.1.100:3001
```

## 🔧 Quick Commands

| Task | Command |
|------|---------|
| Build web app | `npm run build` |
| Sync to Android | `npx cap sync android` |
| Build + Sync | `npm run cap:build` |
| Open Android Studio | `npm run cap:android` |
| Check devices | `adb devices` |
| View logs | `adb logcat` |

## ⚠️ Common Issues

### Issue: "adb: command not found"
**Solution:**
- Add `%ANDROID_HOME%\platform-tools` to PATH
- Restart terminal
- Verify: `adb version`

### Issue: "No devices found"
**Solution:**
1. Check USB cable (use data cable)
2. Enable USB Debugging
3. Accept "Allow USB Debugging" prompt
4. Run: `adb kill-server && adb start-server`

### Issue: "White screen" or app not loading
**Solution:**
1. Ensure `dist/` folder exists: `npm run build`
2. Sync: `npx cap sync android`
3. Check Android Studio Logcat for errors
4. Verify backend is running and accessible

### Issue: "Network requests failing"
**Solution:**
- Use computer's IP address (not `localhost`)
- Update `.env.local` with correct IP
- Rebuild: `npm run build && npx cap sync android`
- Ensure backend is running on that IP
- Check firewall allows port 3001

### Issue: "Gradle build failed"
**Solution:**
1. Open Android Studio
2. File → Sync Project with Gradle Files
3. Check `android/local.properties` has `sdk.dir` set
4. Clean: `cd android && .\gradlew.bat clean`

## 📝 Development Workflow

1. **Make changes** to React code
2. **Build**: `npm run build`
3. **Sync**: `npx cap sync android`
4. **Run**: Open Android Studio → Click Run
5. **Repeat** for each change

## 🔍 Verify Setup

Check these files exist:
- ✅ `capacitor.config.ts`
- ✅ `android/` folder
- ✅ `dist/` folder (after build)
- ✅ `android/app/src/main/AndroidManifest.xml`

## 📚 Additional Resources

- **Quick Start**: `CAPACITOR_QUICK_START.md`
- **Detailed Guide**: `docs/CAPACITOR_ANDROID_SETUP.md`
- **Capacitor Docs**: https://capacitorjs.com/docs

## ✨ Next Steps

1. Ensure backend is running on your computer
2. Find your computer's IP address
3. Update `.env.local` with IP address
4. Build and sync: `npm run cap:build`
5. Open Android Studio: `npm run cap:android`
6. Run on device!

