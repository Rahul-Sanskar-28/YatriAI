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

3. **Choose your platform:**
   - Press `a` for Android emulator
   - Press `i` for iOS simulator  
   - Scan QR code with Expo Go app on your phone

## If you still see errors:

1. **Clear cache:**
```bash
npx expo start --clear
```

2. **Check API URL:**
   - Create `.env` file in `mobile/` directory
   - Add: `EXPO_PUBLIC_API_URL=http://10.79.157.114:3001/api`
   - Restart Expo

3. **Verify backend is accessible:**
   - From phone browser: `http://10.79.157.114:3001/api/health`
   - Should return: `{"status":"ok",...}`

## Troubleshooting

**"Unable to get default URI scheme"**
- ✅ Fixed by removing expo-router and setting correct main entry

**"Network request failed"**
- Check phone and computer are on same WiFi
- Verify backend is running
- Check `.env` has correct IP address

**"Connection refused"**
- Backend must listen on `0.0.0.0` (already configured)
- Check Windows Firewall allows port 3001










