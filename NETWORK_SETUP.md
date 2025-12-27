# Network Setup Guide for Mobile Access

## Problem
When accessing from your phone browser, `localhost` refers to the phone itself, not your development machine.

## Solution

### 1. Find Your Computer's IP Address

**Windows:**
```powershell
ipconfig | Select-String "IPv4"
```

**Mac/Linux:**
```bash
ifconfig | grep "inet "
```

Your IP address is: **10.79.157.114**

### 2. Backend Configuration

The backend is now configured to:
- Listen on `0.0.0.0` (accepts connections from network)
- Allow CORS from all origins (for development)

### 3. Mobile App Configuration

The mobile app is configured to use: `http://10.79.157.114:3001/api`

**To change it:**
1. Create `.env` file in `mobile/` directory
2. Add: `EXPO_PUBLIC_API_URL=http://YOUR_IP:3001/api`

### 4. Frontend Web App (if accessing from phone browser)

If you want to access the web app from your phone browser:

1. Start the frontend dev server:
```bash
npm run dev -- --host
```

2. Access from phone: `http://10.79.157.114:5173`

### 5. Restart Servers

After making changes, restart:
- Backend: `cd backend && npm run dev`
- Frontend: `npm run dev -- --host`
- Mobile: `cd mobile && npm start`

## Testing

1. **From Phone Browser:**
   - Web app: `http://10.79.157.114:5173`
   - Backend API: `http://10.79.157.114:3001/api/health`

2. **From Mobile App:**
   - Ensure `.env` has correct IP
   - Restart Expo: `npm start`

## Troubleshooting

### "Connection refused"
- Check firewall allows port 3001 and 5173
- Ensure backend is running
- Verify IP address is correct

### "CORS error"
- Backend CORS is configured to allow all origins
- If still issues, check backend logs

### "Network request failed" (Mobile)
- Verify phone and computer are on same WiFi network
- Check `.env` file has correct IP
- Restart Expo dev server after changing `.env`

## Important Notes

- **IP may change**: If your IP changes, update `.env` files
- **Same network**: Phone and computer must be on same WiFi
- **Firewall**: Windows Firewall may block connections - allow Node.js through firewall













