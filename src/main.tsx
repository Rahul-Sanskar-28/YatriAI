import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/rtl.css';

// Initialize i18next
import './lib/i18n';

// Register service worker for offline translation support
import { registerServiceWorker } from './lib/i18n/serviceWorker';

// Register SW in production
if (import.meta.env.PROD) {
  registerServiceWorker();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
