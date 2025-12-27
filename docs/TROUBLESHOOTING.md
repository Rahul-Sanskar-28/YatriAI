# Troubleshooting Guide

## Common Issues and Solutions

### `__WS_TOKEN__ is not defined` Error

This is a Vite HMR (Hot Module Replacement) websocket connection issue.

#### Solution 1: Clear Vite Cache and Restart

```bash
# Clear Vite cache
rm -rf node_modules/.vite
# Or on Windows PowerShell:
Remove-Item -Recurse -Force node_modules\.vite

# Restart dev server
npm run dev
```

#### Solution 2: Check Vite Config

Ensure `vite.config.ts` has proper HMR configuration:

```typescript
export default defineConfig({
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    },
  },
});
```

#### Solution 3: Check Port Conflicts

If port 5173 is in use, Vite will use a different port. Check the console for the actual port.

#### Solution 4: Browser Cache

Clear browser cache and hard refresh (Ctrl+Shift+R or Cmd+Shift+R).

#### Solution 5: Restart Dev Server

Sometimes a simple restart fixes it:

```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

---

## Other Common Issues

### Payment Gateway Not Working

**Issue**: Payment gateway shows as not configured

**Solution**:
1. Check `.env.local` has correct keys
2. Verify `VITE_USE_MOCK_PAYMENT=false`
3. Restart dev server after changing env vars

### Blockchain Not Connecting

**Issue**: Wallet connection fails

**Solution**:
1. Ensure MetaMask is installed
2. Check `VITE_USE_REAL_BLOCKCHAIN=true`
3. Verify network matches (Sepolia/Holesky)
4. Check browser console for errors

### Build Errors

**Issue**: Build fails with TypeScript errors

**Solution**:
1. Run `npm install` to ensure dependencies
2. Check `tsconfig.json` configuration
3. Clear `node_modules` and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

---

### ERR_CONNECTION_REFUSED

**Issue**: `localhost refused to connect` or `ERR_CONNECTION_REFUSED`

**Solution**:
1. **Start the dev server**:
   ```bash
   npm run dev
   ```
   
2. **Check if port is in use**:
   ```powershell
   # Windows PowerShell
   netstat -ano | findstr :5173
   ```
   
3. **If port is busy, kill the process**:
   ```powershell
   # Find process ID from netstat output, then:
   taskkill /PID <process_id> /F
   ```

4. **Wait a few seconds** for TIME_WAIT connections to clear, then restart:
   ```bash
   npm run dev
   ```

5. **Check the terminal output** - Vite will show the actual URL (might be different port)

---

## Getting Help

If issues persist:
1. Check browser console for detailed errors
2. Check terminal output from dev server
3. Review relevant documentation in `docs/` folder
4. Ensure all environment variables are set correctly
5. Make sure the dev server is actually running (`npm run dev`)

