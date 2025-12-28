# Quick Fix: Add Android Platform

## Run These Commands in Order

```bash
# 1. Add Android platform
npx cap add android

# 2. Build web app
npm run build

# 3. Sync to Android
npx cap sync android

# 4. Open Android Studio
npx cap open android
```

## If Step 1 Fails

Make sure Capacitor is installed:
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
```

Then try again:
```bash
npx cap add android
```

## Verify It Worked

Check if `android/` folder exists:
```bash
Test-Path android
```

Should return `True`.

## Next Steps After Adding Platform

1. **Configure backend URL** (create `.env.local`):
   ```bash
   VITE_API_URL=http://YOUR_IP:3001/api
   ```

2. **Rebuild and sync**:
   ```bash
   npm run build
   npx cap sync android
   ```

3. **Open Android Studio**:
   ```bash
   npx cap open android
   ```

4. **Run on device** (in Android Studio):
   - Select device
   - Click Run button

## Complete Setup Script

Copy and paste this entire block:

```powershell
# Add Android platform
npx cap add android

# Build
npm run build

# Sync
npx cap sync android

# Verify
if (Test-Path android) {
    Write-Host "✅ Android platform ready!" -ForegroundColor Green
    Write-Host "Run: npx cap open android" -ForegroundColor Cyan
} else {
    Write-Host "❌ Android platform not found" -ForegroundColor Red
}
```





