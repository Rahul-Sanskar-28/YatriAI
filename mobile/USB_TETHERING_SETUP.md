# USB Tethering Setup - Simple Guide

USB tethering is the easiest way to test on a physical device!

## Quick Setup (3 Steps)

### 1. Enable USB Tethering on Your Phone

**Android:**
- Connect phone to computer via USB cable
- Go to **Settings → Network & Internet → Hotspot & Tethering**
- Enable **USB Tethering**
- Your phone will now share its internet connection with your computer

**iPhone:**
- Connect iPhone to computer via USB
- Go to **Settings → Personal Hotspot**
- Enable **Personal Hotspot**
- On Mac: System Preferences → Network → iPhone USB
- On Windows: Network settings → iPhone connection

### 2. Get Your Computer's IP Address

After enabling USB tethering, your computer gets a new IP address from your phone.

**Windows:**
```powershell
ipconfig | Select-String "IPv4"
```

Look for the IP address on the USB/Ethernet adapter (usually starts with 192.168.x.x)

**Example output:**
```
IPv4 Address. . . . . . . . . . . : 192.168.42.129
```

### 3. Update API URL

The `.env` file in `mobile/` directory should use this IP:

```
EXPO_PUBLIC_API_URL=http://192.168.42.129:3001/api
```

(Replace with your actual IP from step 2)

### 4. Start Everything

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start Expo
cd mobile
npm start

# Scan QR code with Expo Go app on your phone
```

## That's It! 🎉

Your phone can now access the backend via USB tethering.

## Troubleshooting

**"Connection refused"**
- Make sure backend is running
- Check the IP address is correct (run `ipconfig` again)
- Update `.env` file with correct IP
- Restart Expo after changing `.env`

**"Network request failed"**
- Verify USB tethering is enabled
- Check phone and computer are connected via USB
- Try disconnecting and reconnecting USB cable

**Backend not accessible**
- Backend is already configured to listen on `0.0.0.0` (all interfaces)
- Should work automatically with USB tethering

## Advantages of USB Tethering

✅ **Simple** - No emulator setup needed
✅ **Fast** - Real device performance
✅ **Easy** - Just enable tethering and connect
✅ **Reliable** - Direct USB connection

## Quick Commands

```bash
# Check your IP (after enabling USB tethering)
ipconfig | Select-String "IPv4"

# Update .env file with the IP
# Then start backend and Expo
```










