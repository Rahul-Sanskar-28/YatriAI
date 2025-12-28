# Fix: Capacitor CLI "could not determine executable" Error

## Problem
```
npm error could not determine executable to run
```

This happens when Capacitor CLI is not properly installed or npx can't find it.

## Solution

### Option 1: Install Capacitor Packages (Recommended)

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
```

Then use:
```bash
npx cap open android
```

### Option 2: Use Full Package Path

```bash
npx --yes @capacitor/cli open android
```

### Option 3: Install Globally (Alternative)

```bash
npm install -g @capacitor/cli
cap open android
```

### Option 4: Manual Android Studio Open

If Capacitor CLI still doesn't work:

1. **Navigate to android folder:**
   ```bash
   cd android
   ```

2. **Open Android Studio manually:**
   - Open Android Studio
   - File → Open
   - Select the `android` folder in your project
   - Wait for Gradle sync

3. **Or use command:**
   ```bash
   # Find Android Studio executable
   # Usually: C:\Users\YourUsername\AppData\Local\Android\Sdk\...
   # Or: C:\Program Files\Android\Android Studio\bin\studio64.exe
   
   # Open directly
   start "" "C:\Program Files\Android\Android Studio\bin\studio64.exe" android
   ```

## Verify Installation

Check if Capacitor is installed:
```bash
npm list @capacitor/cli
```

Should show version number. If not, install:
```bash
npm install @capacitor/cli --save-dev
```

## Updated Commands

After installing, use these commands:

```bash
# Build and sync
npm run cap:build

# Open Android Studio
npm run cap:android

# Or directly
npx cap open android
```

## Quick Fix Script

Run this to fix everything:

```powershell
# Install Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/android

# Add Android platform (if not exists)
if (-not (Test-Path android)) {
    npx cap add android
}

# Build
npm run build

# Sync
npx cap sync android

# Open Android Studio
npx cap open android
```

## Alternative: Direct Android Studio Path

If npx still fails, find Android Studio and open manually:

```powershell
# Common locations
$studioPaths = @(
    "$env:LOCALAPPDATA\Programs\Android\Android Studio\bin\studio64.exe",
    "C:\Program Files\Android\Android Studio\bin\studio64.exe",
    "$env:ProgramFiles\Android\Android Studio\bin\studio64.exe"
)

foreach ($path in $studioPaths) {
    if (Test-Path $path) {
        Write-Host "Found Android Studio at: $path"
        Start-Process $path -ArgumentList android
        break
    }
}
```

## Next Steps

1. Install Capacitor packages: `npm install @capacitor/core @capacitor/cli @capacitor/android`
2. Verify: `npx cap --version`
3. Add platform: `npx cap add android` (if not exists)
4. Build: `npm run build`
5. Sync: `npx cap sync android`
6. Open: `npx cap open android`





