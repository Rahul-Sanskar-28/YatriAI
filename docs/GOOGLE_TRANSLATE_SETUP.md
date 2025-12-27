# Google Translate Integration

This document explains the Google Translate feature that has been added to the YatriAI website.

## Overview

The Google Translate integration allows users to translate the entire website content into 60+ languages using Google's translation service. The feature is implemented with two components:

1. **Header Translate Button** - Located in the main navigation header
2. **Floating Translate Button** - A floating action button in the bottom-right corner

## Features

- **60+ Languages**: Supports all major world languages including Hindi, Bengali, Arabic, Chinese, Japanese, and many more
- **Real-time Translation**: Translates the entire page content instantly
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode Support**: Integrates with the existing dark/light theme system
- **Loading States**: Shows loading indicators during translation
- **Error Handling**: Graceful fallback when Google Translate is unavailable

## How It Works

### For Users

1. **Header Button**: Click the globe icon (🌐) in the header navigation
2. **Floating Button**: Click the floating translate button in the bottom-right corner
3. **Select Language**: Choose from the dropdown list of available languages
4. **Reset**: Click "Original (English)" to return to the original content

### Technical Implementation

The feature uses Google Translate's free web widget API:

```typescript
// Loads Google Translate script
https://translate.google.com/translate_a/element.js

// Initializes translation widget
new google.translate.TranslateElement({
  pageLanguage: 'en',
  includedLanguages: 'hi,bn,fr,es,ar,de,ja,zh,ko...',
  layout: google.translate.TranslateElement.InlineLayout.SIMPLE
});
```

## Components

### GoogleTranslate Component
- **Location**: `src/components/common/GoogleTranslate.tsx`
- **Props**: `variant: 'header' | 'floating'`
- **Features**: Custom UI, language selection, state management

### FloatingTranslate Component
- **Location**: `src/components/common/FloatingTranslate.tsx`
- **Usage**: Wrapper for floating variant
- **Position**: Fixed bottom-right corner

### useGoogleTranslate Hook
- **Location**: `src/lib/hooks/useGoogleTranslate.ts`
- **Purpose**: State management and utility functions
- **Features**: Loading states, error handling, language switching

## Styling

Custom CSS has been added to integrate Google Translate with the existing theme:

```css
/* Hide Google Translate branding */
.goog-te-banner-frame { display: none !important; }

/* Custom dropdown styling */
.goog-te-combo { /* Custom styles */ }

/* Dark mode support */
.dark .goog-te-combo { /* Dark theme styles */ }
```

## Supported Languages

The integration supports 60+ languages including:

- **Indian Languages**: Hindi (हिन्दी), Bengali (বাংলা), Tamil (தமிழ்), Telugu (తెలుగు), Malayalam (മലയാളം), Kannada (ಕನ್ನಡ), Gujarati (ગુજરાતી), Punjabi (ਪੰਜਾਬੀ), Marathi (मराठी), Urdu (اردو)
- **European Languages**: French, Spanish, German, Italian, Portuguese, Russian, Dutch, Swedish, Danish, Norwegian
- **Asian Languages**: Chinese (中文), Japanese (日本語), Korean (한국어), Thai (ไทย), Vietnamese (Tiếng Việt), Indonesian, Malay
- **Middle Eastern**: Arabic (العربية), Hebrew (עברית), Persian (فارسی)
- **African Languages**: Swahili, Zulu, Afrikaans, Amharic

## Browser Compatibility

- **Chrome**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support
- **Mobile Browsers**: Full support

## Limitations

1. **Internet Required**: Requires active internet connection
2. **Google Services**: Depends on Google Translate availability
3. **Translation Quality**: Quality depends on Google's translation algorithms
4. **Dynamic Content**: May not translate dynamically loaded content
5. **Rate Limits**: Subject to Google's usage limits

## Privacy Considerations

- Google Translate processes the page content on Google's servers
- No personal data is sent beyond the visible page content
- Users should be aware that page content is shared with Google for translation

## Troubleshooting

### Translation Not Working
1. Check internet connection
2. Verify Google Translate is not blocked by firewall/ad-blocker
3. Try refreshing the page
4. Check browser console for errors

### Styling Issues
1. Clear browser cache
2. Check if custom CSS is conflicting
3. Verify dark/light mode compatibility

### Mobile Issues
1. Ensure responsive design is working
2. Check touch interactions on dropdown
3. Verify floating button positioning

## Future Enhancements

Potential improvements for the future:

1. **Language Detection**: Auto-detect user's preferred language
2. **Persistent Settings**: Remember user's language choice
3. **Offline Support**: Cache translations for offline use
4. **Custom Translations**: Override specific translations
5. **Analytics**: Track translation usage
6. **Voice Translation**: Add text-to-speech for translated content

## Integration with Existing i18n

The Google Translate feature works alongside the existing react-i18next system:

- **react-i18next**: Handles UI text and navigation elements
- **Google Translate**: Translates page content and dynamic text
- **Complementary**: Both systems work together without conflicts

## Code Examples

### Adding to a Component
```tsx
import GoogleTranslate from './components/common/GoogleTranslate';

// Header variant
<GoogleTranslate variant="header" />

// Floating variant
<GoogleTranslate variant="floating" />
```

### Using the Hook
```tsx
import { useGoogleTranslate } from './lib/hooks/useGoogleTranslate';

const MyComponent = () => {
  const { translateTo, resetTranslation, currentLanguage, isTranslating } = useGoogleTranslate();
  
  return (
    <button onClick={() => translateTo('hi')}>
      Translate to Hindi
    </button>
  );
};
```

## Support

For issues or questions about the Google Translate integration:

1. Check the browser console for error messages
2. Verify Google Translate service status
3. Test with different browsers
4. Review the component documentation

The Google Translate feature enhances the accessibility of the YatriAI website by making it available to users worldwide in their preferred languages.