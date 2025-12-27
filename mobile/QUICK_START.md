# Quick Start Guide

## Fixed Issues
✅ Removed expo-router dependency (we use React Navigation)
✅ Set correct entry point: `node_modules/expo/AppEntry.js`
✅ Configured app.json with proper scheme

## Starting the App

1. **Make sure backend is running:**
```bash
cd ../backend
npm run dev
```

2. **Start Expo:**
```bash
cd mobile
npm start
```

3. **Open in Android Emulator:**
   - Press `a` to open in Android emulator
   - Make sure emulator is running in Android Studio first

## If you still see errors:

1. **Clear cache:**
```bash
npx expo start --clear
```

2. **Check API URL:**
   - Create `.env` file in `mobile/` directory
   - Add: `EXPO_PUBLIC_API_URL=http://10.0.2.2:3001/api` (for Android emulator)
   - Restart Expo

3. **Verify backend is accessible:**
   - From browser: `http://localhost:3001/api/health`
   - Should return: `{"status":"ok",...}`

## Troubleshooting

**"Unable to get default URI scheme"**
- ✅ Fixed by removing expo-router and setting correct main entry

**"Network request failed"**
- Verify backend is running on localhost:3001
- Check `.env` has correct API URL (use `http://10.0.2.2:3001/api` for emulator)
- Android emulator uses `10.0.2.2` to access host's localhost

**"Connection refused"**
- Backend must listen on `0.0.0.0` (already configured)
- Check Windows Firewall allows port 3001













