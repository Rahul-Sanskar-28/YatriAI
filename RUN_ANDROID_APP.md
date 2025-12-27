# Run Android App on Physical Device - Step by Step

## ✅ Prerequisites Check

1. **Android Studio** installed ✓
2. **USB Debugging** enabled on device
3. **Device connected** via USB
4. **Backend running** on your computer

## 🚀 Quick Start (5 Steps)

### Step 1: Find Your Computer's IP Address

```powershell
ipconfig | Select-String "IPv4"
```

Note your IP address (e.g., `192.168.1.100`)

### Step 2: Configure Backend URL

Create `.env.local` file in project root:

```bash
# Replace with your actual IP address
VITE_API_URL=http://192.168.1.100:3001/api
```

**Important:** Replace `192.168.1.100` with your actual IP address from Step 1.

### Step 3: Build Web App

```bash
npm run build
```

### Step 4: Sync to Android

```bash
npx cap sync android
```

### Step 5: Open and Run

```bash
npx cap open android
```

In Android Studio:
1. Wait for Gradle sync (bottom status bar)
2. Select your device from dropdown (top toolbar)
3. Click **Run** button (green play icon) or press `Shift+F10`
4. App installs and launches automatically!

## 🔍 Verify Device Connection

Before running, verify your device is connected:

```bash
adb devices
```

Should show:
```
List of devices attached
ABC123XYZ    device
```

If empty:
- Check USB cable (use data cable)
- Enable USB Debugging on device
- Accept "Allow USB Debugging" prompt
- Run: `adb kill-server && adb start-server`

## 📱 Complete Command Sequence

```bash
# 1. Find IP address
ipconfig | Select-String "IPv4"

# 2. Create .env.local with your IP
# VITE_API_URL=http://YOUR_IP:3001/api

# 3. Build
npm run build

# 4. Sync
npx cap sync android

# 5. Open Android Studio
npx cap open android

# 6. In Android Studio: Select device → Click Run
```

## ⚠️ Troubleshooting

### "No devices found"
- Use data USB cable (not charging-only)
- Enable USB Debugging
- Accept prompt on device
- Run: `adb kill-server && adb start-server`

### "Network error" or "Connection refused"
- Backend must be running: `cd backend && npm run dev`
- Use computer's IP (not `localhost`)
- Update `.env.local` with correct IP
- Rebuild: `npm run build && npx cap sync android`

### "White screen"
- Check `dist/` folder exists
- Rebuild: `npm run build`
- Sync: `npx cap sync android`
- Check Android Studio Logcat for errors

### "Gradle build failed"
- Open Android Studio
- File → Sync Project with Gradle Files
- Check `android/local.properties` has `sdk.dir` set

## 📝 Notes

- **Backend must be running** on your computer
- **Use IP address** (not `localhost`) for physical device
- **Rebuild after changing** `.env.local`
- **Always sync** after building: `npx cap sync android`

## 🎯 Success Indicators

✅ Device shows in `adb devices`
✅ Gradle sync completes in Android Studio
✅ App installs on device
✅ App launches and shows YatriAI interface
✅ Backend API calls work (check network tab)

---

**Ready to run!** Follow the 5 steps above to get your app running on a physical device.

