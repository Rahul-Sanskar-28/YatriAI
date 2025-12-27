# Translation Setup Guide

YatriAI includes automatic Google Translate integration for 15+ languages.

## Features

- ✅ **Automatic Translation** - Zero manual steps
- ✅ **15+ Languages** - Including Hindi, Bengali, and more
- ✅ **3 Methods** - Redirect, Iframe, Widget
- ✅ **Works on Localhost** - Perfect for development
- ✅ **Mobile Responsive** - Header and floating buttons

## Quick Setup

### 1. Add Translation Component

Already integrated in:
- `src/components/common/AutoTranslate.tsx`
- `src/components/common/BrowserOnlyTranslate.tsx`

### 2. Use in Components

```tsx
import { AutoTranslate } from '../common/AutoTranslate';

<AutoTranslate />
```

## Supported Languages

🇺🇸 English | 🇮🇳 Hindi | 🇧🇩 Bengali | 🇫🇷 French | 🇪🇸 Spanish | 🇸🇦 Arabic | 🇩🇪 German | 🇯🇵 Japanese | 🇨🇳 Chinese | 🇰🇷 Korean | 🇵🇹 Portuguese | 🇷🇺 Russian | 🇮🇹 Italian | 🇳🇱 Dutch | 🇸🇪 Swedish

## Translation Methods

### 1. Redirect Method (Default)
- Redirects to Google Translate URL
- Works on any domain
- Fast and reliable

### 2. Iframe Method
- Embeds Google Translate in iframe
- No page reload
- May have CORS limitations

### 3. Widget Method
- Uses Google Translate widget
- Best UX
- Requires Google Translate script

## Configuration

### Enable Translation

Translation is enabled by default. To disable:

```tsx
// In component
{import.meta.env.VITE_ENABLE_TRANSLATION !== 'false' && <AutoTranslate />}
```

### Customize Languages

Edit language list in `AutoTranslate.tsx`:

```tsx
const languages = [
  { code: 'hi', name: 'हिन्दी' },
  { code: 'bn', name: 'বাংলা' },
  // Add more...
];
```

## Troubleshooting

### Issue: Translation not working
**Solution:** Check browser console for errors. Try different translation method.

### Issue: CORS errors
**Solution:** Use redirect method instead of iframe/widget.

### Issue: Page not translating
**Solution:** Ensure page content is in HTML (not dynamically loaded).

## Related Files

- `src/components/common/AutoTranslate.tsx` - Main translation component
- `src/components/common/BrowserOnlyTranslate.tsx` - Browser-native guide
- `src/components/common/Header.tsx` - Header with translate button

---

**Translation works automatically - no API keys needed!**


