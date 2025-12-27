# Android Platform Added - Next Steps

## ✅ What Was Done

1. ✅ Capacitor packages installed (`@capacitor/core`, `@capacitor/cli`, `@capacitor/android`)
2. ✅ Android platform added (`npx cap add android`)
3. ✅ Web app built (`npm run build`)
4. ✅ Assets synced to Android (`npx cap sync android`)

## 🚀 Run the App on Physical Device

### Step 1: Configure Backend URL

Create `.env.local` file in project root:

```bash
# Replace with your computer's IP address
VITE_API_URL=http://192.168.1.100:3001/api
```

**Find your IP:**
```powershell
ipconfig | Select-String "IPv4"
```

### Step 2: Rebuild (after changing .env.local)

```bash
npm run build
npx cap sync android
```

### Step 3: Enable USB Debugging on Device

1. Settings → About Phone
2. Tap Build Number 7 times
3. Settings → Developer Options
4. Enable USB Debugging
5. Connect device via USB

### Step 4: Verify Device Connection

```bash
adb devices
```

Should show your device ID.

### Step 5: Open Android Studio

```bash
npx cap open android
```

Or manually:
- Open Android Studio
- File → Open
- Select `android` folder

### Step 6: Run on Device

In Android Studio:
1. Wait for Gradle sync
2. Select your device from dropdown
3. Click **Run** (green play button) or press `Shift+F10`

## 📋 Quick Command Reference

```bash
# Build web app
npm run build

# Sync to Android
npx cap sync android

# Build + Sync (one command)
npm run cap:build

# Open Android Studio
npx cap open android
```

## ⚠️ Important Notes

- **Backend must be running**: `cd backend && npm run dev`
- **Use IP address** (not `localhost`) for physical device
- **Rebuild after** changing `.env.local`
- **Always sync** after building

## 🔍 Verify Setup

Check these exist:
- ✅ `android/` folder
- ✅ `dist/` folder (after build)
- ✅ `capacitor.config.ts`
- ✅ `.env.local` (with your IP address)

## 🎯 Success!

Your Android app is ready! Follow steps 1-6 above to run it on your physical device.

