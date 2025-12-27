import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Capacitor requires base path to be relative
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: false, // Allow Vite to use next available port if 5173 is taken
    hmr: {
      // Let Vite auto-detect the protocol and port
      // This fixes the 426 Upgrade Required error
    },
  },
});
