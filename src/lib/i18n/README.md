# YatriAI Multilingual System

A complete internationalization (i18n) system for the YatriAI heritage travel platform.

## Features

- 🌐 **10+ Languages** - English, Hindi, Bengali, French, Spanish, Arabic, German, Japanese, Chinese, Korean
- 🔄 **Dynamic Translation** - Uses LibreTranslate API for on-demand translation
- 💾 **Smart Caching** - LocalStorage caching with 7-day TTL
- 🔃 **RTL Support** - Full right-to-left support for Arabic
- 📶 **Offline Mode** - Service Worker caches translations for offline use
- 🚀 **SEO Friendly** - Language prefix in URLs (/en, /fr, etc.)

## Quick Start

### Using Translations in Components

```tsx
import { useLanguage } from '../../contexts/LanguageContext';

const MyComponent: React.FC = () => {
  const { t, currentLanguage, isRTL } = useLanguage();
  
  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.description')}</p>
      <button>{t('common.submit')}</button>
    </div>
  );
};
```

### Using LanguageSelector

```tsx
import LanguageSelector from './components/common/LanguageSelector';

// Header variant
<LanguageSelector variant="header" />

// Footer variant
<LanguageSelector variant="footer" />

// Settings variant with label
<LanguageSelector variant="settings" showLabel />
```

## File Structure

```
src/
├── lib/
│   └── i18n/
│       ├── index.ts           # Main i18n configuration
│       ├── types.ts           # TypeScript types
│       ├── languages.ts       # Supported languages config
│       ├── translationService.ts  # Translation API & caching
│       └── serviceWorker.ts   # Offline support utilities
├── locales/
│   └── en/
│       └── common.json        # English translations (source)
├── contexts/
│   └── LanguageContext.tsx    # React context provider
├── components/
│   └── common/
│       └── LanguageSelector.tsx  # Language dropdown component
└── styles/
    └── rtl.css               # RTL-specific styles

server/                        # Translation caching backend
├── src/
│   └── index.ts              # Express server
├── package.json
└── tsconfig.json
```

## Adding New Text Keys

### 1. Add to English JSON

Edit `src/locales/en/common.json`:

```json
{
  "myNewSection": {
    "title": "My New Title",
    "description": "This is a new description",
    "button": "Click Me"
  }
}
```

### 2. Use in Components

```tsx
const { t } = useLanguage();

return (
  <div>
    <h1>{t('myNewSection.title')}</h1>
    <p>{t('myNewSection.description')}</p>
    <button>{t('myNewSection.button')}</button>
  </div>
);
```

### 3. Clear Cache (Optional)

If users have cached translations, they'll get the new keys translated on next visit. To force-update:

```tsx
import { clearTranslationCache } from '../lib/i18n/translationService';

// Clear all caches
clearTranslationCache();

// Clear specific language
clearTranslationCache('fr');
```

## Adding New Languages

### 1. Add to Languages Config

Edit `src/lib/i18n/languages.ts`:

```typescript
export const SUPPORTED_LANGUAGES: Record<LanguageCode, LanguageConfig> = {
  // ... existing languages
  pt: {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇧🇷',
    rtl: false,
    libreTranslateCode: 'pt',
  },
};
```

### 2. Update Type Definition

Edit `src/lib/i18n/types.ts`:

```typescript
export type LanguageCode = 'en' | 'hi' | 'bn' | 'fr' | 'es' | 'ar' | 'de' | 'ja' | 'zh' | 'ko' | 'pt';
```

### 3. Translations Auto-Generate

When a user selects the new language, the system will:
1. Call LibreTranslate API to translate all English keys
2. Cache the result in localStorage
3. Load translations instantly on subsequent visits

## RTL Language Support

RTL languages (Arabic) automatically:
- Set `document.dir = "rtl"`
- Add `.rtl` class to `<html>`
- Apply RTL CSS helpers from `src/styles/rtl.css`

### RTL CSS Classes

```css
/* Flip flex direction */
html[dir="rtl"] .flex-row { flex-direction: row-reverse; }

/* Flip margins */
html[dir="rtl"] .ml-auto { margin-left: 0; margin-right: auto; }

/* Flip icons */
html[dir="rtl"] .rtl-flip-icon { transform: scaleX(-1); }
```

## Backend Translation Server

The optional Express backend provides translation caching:

### Setup

```bash
cd server
npm install
npm run dev
```

### Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/translate` | Translate single text |
| POST | `/translate/batch` | Translate multiple texts |
| GET | `/cache/stats` | Get cache statistics |
| DELETE | `/cache` | Clear translation cache |
| GET | `/health` | Health check |

### Using Backend Instead of Direct API

Set environment variable:
```env
VITE_LIBRE_TRANSLATE_URL=http://localhost:3001/translate
```

## Offline Support

The Service Worker (`public/sw.js`) provides:

- Caching of translation API responses
- Caching of locale JSON files
- Fallback to last known translations when offline

### Manual Service Worker Control

```tsx
import { 
  registerServiceWorker,
  clearSWTranslationCache,
  getSWCacheStats 
} from '../lib/i18n/serviceWorker';

// Register SW
await registerServiceWorker();

// Clear SW cache
await clearSWTranslationCache();

// Get cache stats
const stats = await getSWCacheStats();
console.log(`Cached: ${stats.translations} translations`);
```

## Best Practices

1. **Use Namespaced Keys**: Group related translations
   ```json
   {
     "auth": { "login": "Login", "logout": "Logout" },
     "nav": { "home": "Home", "about": "About" }
   }
   ```

2. **Avoid Hardcoding**: Always use `t()` for user-facing text

3. **Handle Loading States**: Show skeleton/spinner during translation
   ```tsx
   const { t, isTranslating } = useLanguage();
   
   if (isTranslating) return <Skeleton />;
   return <h1>{t('hero.title')}</h1>;
   ```

4. **Test RTL**: Preview Arabic to ensure RTL layout works

5. **Clear Cache on Deploy**: When updating English translations significantly

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_LIBRE_TRANSLATE_URL` | LibreTranslate API URL | `https://libretranslate.de/translate` |

## Troubleshooting

### Translations Not Updating

Clear localStorage cache:
```javascript
Object.keys(localStorage)
  .filter(k => k.startsWith('yatri_translations_'))
  .forEach(k => localStorage.removeItem(k));
```

### LibreTranslate Rate Limiting

If you hit rate limits:
1. Use the backend server for caching
2. Reduce batch size in `translationService.ts`
3. Add delays between API calls

### RTL Layout Issues

Check that:
1. `document.dir` is set correctly
2. RTL CSS is imported in `main.tsx`
3. Flex containers use `space-x-reverse`



