# Clear Cache Instructions

## Step 1: Stop Dev Server
- Press `Ctrl + C` in the terminal where dev server is running
- Wait for it to fully stop

## Step 2: Clear All Caches

### Clear Vite Cache:
```powershell
cd C:\Users\RahulSanskar\Desktop\personal\YatriAI
Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue
```

### Clear Browser Cache:
1. Open Chrome/Edge DevTools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"
   OR
4. Press `Ctrl + Shift + Delete`
5. Select "Cached images and files"
6. Click "Clear data"

## Step 3: Restart Dev Server
```powershell
npm run dev
```

## Step 4: Hard Refresh Browser
- Press `Ctrl + Shift + R` or `Ctrl + F5`
- Or open DevTools → Right-click refresh → "Empty Cache and Hard Reload"

## Step 5: Check Console
Open browser console (F12) and look for:
- `📋 TransportTracker module loaded. metroLines count: 10`
- `✅ Loaded 10 metro lines from local data`
- `🎯 Rendering metro tab with 10 routes`

If you see these logs with "10", the code is working correctly!



