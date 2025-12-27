# Android Build Fix - Gradle Compatibility Issue

## Problem

When building Android app, you encountered:
```
Could not get unknown property 'release' for SoftwareComponent container
```

This is a known compatibility issue between Expo SDK 51 and Gradle 8.8+.

## Solution Applied

Fixed `expo-modules-core/android/ExpoModulesCorePlugin.gradle` to check if components exist before accessing them.

### Fix Location
`mobile/node_modules/expo-modules-core/android/ExpoModulesCorePlugin.gradle` (line 81-99)

### What Changed
- Added conditional check for component existence before accessing `components.release`
- Prevents the build from failing when components aren't available

## Additional Setup Required

### Android SDK Path

The build also requires `ANDROID_HOME` or `local.properties` file.

**Option 1: Set ANDROID_HOME environment variable**
```powershell
# Add to your system environment variables
ANDROID_HOME=C:\Users\YourUsername\AppData\Local\Android\Sdk
```

**Option 2: Create local.properties file**
```bash
# In mobile/android/local.properties
sdk.dir=C:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk
```

## Testing the Fix

After applying the fix and setting up Android SDK:

```bash
cd mobile
npm run android
```

Or directly:
```bash
cd mobile/android
.\gradlew.bat app:assembleDebug
```

## Notes

- This fix modifies `node_modules`, so it will be lost if you run `npm install` again
- Consider using `patch-package` to persist this fix:
  ```bash
  npm install --save-dev patch-package
  npx patch-package expo-modules-core
  ```

## Related Issues

- Expo SDK 51 compatibility with Gradle 8.8+
- React Native 0.74.5 with Expo modules


