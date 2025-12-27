# YatriAI - Stage Implementation Guide

This guide helps you implement and present each stage of YatriAI for hackathon judging.

---

## 🎯 Quick Reference: What to Show in Each Stage

### **STAGE 1: MVP**
**Show:** Landing Page + Auth + AI Chat in Hero Section
**Hide:** Dashboard, other features, mobile app

### **STAGE 2: Core Features**
**Show:** Tourist Dashboard + 5 Features (Chat, Itinerary, Heritage Walk, Booking, Marketplace)
**Hide:** Advanced features, blockchain, mobile app, admin features

### **STAGE 3: Full Project**
**Show:** Everything including mobile app, blockchain, admin dashboard

---

## 📁 Stage 1: MVP Implementation

### **Step 1: Simplify App.tsx**

Create a simplified version that only shows landing page:

```typescript
// src/App.tsx (Stage 1 Version)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HeroSection from './components/landing/HeroSection';
import FeaturesSection from './components/landing/FeaturesSection';
import AuthModal from './components/common/AuthModal';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <Footer />
      <AuthModal />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
```

### **Step 2: Add AI Chat to Hero Section**

Modify `HeroSection.tsx` to include a simple AI chat button:

```typescript
// Add to HeroSection.tsx after the search form
<div className="mt-6">
  <button
    onClick={() => setIsChatOpen(true)}
    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full hover:shadow-lg transition-all"
  >
    💬 Ask AI Assistant
  </button>
</div>

// Add state and modal
const [isChatOpen, setIsChatOpen] = useState(false);

// Add AIChat component (simplified version)
{isChatOpen && (
  <AIChatModal 
    isOpen={isChatOpen} 
    onClose={() => setIsChatOpen(false)} 
  />
)}
```

### **Step 3: Create Simplified AIChat Component**

```typescript
// src/components/landing/AIChatModal.tsx
import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const AIChatModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { id: '1', type: 'bot', content: 'Namaste! I\'m your AI travel assistant. How can I help you?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { id: Date.now().toString(), type: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input })
      });
      const data = await response.json();
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: data.text || 'I apologize, but I couldn\'t process that request.'
      }]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md h-[600px] flex flex-col shadow-2xl"
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-bold text-lg">YatriAI Assistant</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${
                msg.type === 'user' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && <div className="text-gray-500">AI is thinking...</div>}
        </div>

        <div className="p-4 border-t flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about Kolkata..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AIChatModal;
```

### **Step 4: Backend Setup for Stage 1**

Ensure `backend/src/index.ts` has:

```typescript
// Basic Gemini proxy endpoint
app.post('/gemini', async (req, res) => {
  try {
    const { prompt } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'Gemini API key not configured' });
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
      {
        contents: [{
          role: 'user',
          parts: [{ text: `You are a travel assistant for Kolkata, India. ${prompt}` }]
        }]
      }
    );

    const text = response.data.candidates[0].content.parts[0].text;
    res.json({ text });
  } catch (error) {
    console.error('Gemini error:', error);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
});
```

---

## 🎨 Stage 2: Core Features Implementation

### **Step 1: Enable Dashboard**

Restore full `App.tsx` with dashboard routes:

```typescript
// Uncomment dashboard routes
<Route path="/tourist-dashboard" element={<TouristDashboard />} />
```

### **Step 2: Create Feature Flags**

Add feature flags to control what's shown:

```typescript
// src/config/stages.ts
export const STAGE_CONFIG = {
  STAGE_1: {
    showDashboard: false,
    showFeatures: ['chat'],
    showAdvanced: false
  },
  STAGE_2: {
    showDashboard: true,
    showFeatures: ['chat', 'itinerary', 'heritage', 'booking', 'marketplace'],
    showAdvanced: false
  },
  STAGE_3: {
    showDashboard: true,
    showFeatures: 'all',
    showAdvanced: true
  }
};

export const CURRENT_STAGE = process.env.VITE_PRESENTATION_STAGE || 'STAGE_3';
export const config = STAGE_CONFIG[CURRENT_STAGE];
```

### **Step 3: Conditional Rendering in Dashboard**

```typescript
// src/components/dashboard/TouristDashboard.tsx
import { config } from '../../config/stages';

const menuItems = [
  { id: 'dashboard', labelKey: 'dashboard.menuItems.dashboard', icon: Home },
  ...(config.showFeatures.includes('chat') ? [
    { id: 'chat', labelKey: 'AI Chat', icon: MessageCircle }
  ] : []),
  ...(config.showFeatures.includes('itinerary') ? [
    { id: 'itinerary', labelKey: 'AI Itinerary', icon: Map }
  ] : []),
  // ... etc
];
```

### **Step 4: Backend Routes for Stage 2**

Ensure these routes are working:
- `/api/auth/*` - Authentication
- `/api/destinations/*` - Heritage sites
- `/api/guides/*` - Guide listings
- `/api/bookings/*` - Booking system
- `/api/products/*` - Marketplace
- `/api/itineraries/*` - Itinerary generation
- `/gemini` - AI chat

---

## 🌟 Stage 3: Full Project

### **Step 1: Enable All Features**

Set `CURRENT_STAGE = 'STAGE_3'` in config

### **Step 2: Show Mobile App**

```bash
# In mobile directory
cd mobile
npm start
# Show Expo Go app or emulator
```

### **Step 3: Demonstrate Blockchain**

```typescript
// Show in VerifiedMarketplace component
// Connect wallet
// Show verified products
// Demonstrate NFT minting
```

### **Step 4: Show Admin Dashboard**

```typescript
// Login as admin
// Show user management
// Show analytics
// Show content moderation
```

---

## 🛠️ Quick Switch Script

Create a script to switch between stages:

```bash
# scripts/switch-stage.sh
#!/bin/bash

STAGE=$1

if [ "$STAGE" == "1" ]; then
  echo "VITE_PRESENTATION_STAGE=STAGE_1" > .env.stage
  echo "Switched to Stage 1: MVP"
elif [ "$STAGE" == "2" ]; then
  echo "VITE_PRESENTATION_STAGE=STAGE_2" > .env.stage
  echo "Switched to Stage 2: Core Features"
elif [ "$STAGE" == "3" ]; then
  echo "VITE_PRESENTATION_STAGE=STAGE_3" > .env.stage
  echo "Switched to Stage 3: Full Project"
else
  echo "Usage: ./switch-stage.sh [1|2|3]"
fi
```

---

## 📋 Pre-Presentation Checklist

### **Before Stage 1 Demo:**
- [ ] Backend server running (`npm run dev` in backend/)
- [ ] Frontend server running (`npm run dev` in root)
- [ ] Gemini API key configured
- [ ] Test login credentials ready
- [ ] Browser tab open to `http://localhost:5173`
- [ ] Network tab open (to show API calls)

### **Before Stage 2 Demo:**
- [ ] All Stage 1 items checked
- [ ] Database seeded with sample data
- [ ] All 5 features tested
- [ ] Sample bookings created
- [ ] Sample products in marketplace
- [ ] Tourist dashboard accessible

### **Before Stage 3 Demo:**
- [ ] All Stage 2 items checked
- [ ] Mobile app built/running
- [ ] Blockchain wallet connected (MetaMask)
- [ ] Admin account ready
- [ ] All features tested
- [ ] Demo data prepared

---

## 🎤 Demo Flow Recommendations

### **Stage 1 Flow (2-3 min):**
1. **Landing Page** (30s)
   - "Beautiful landing page showcasing Kolkata heritage"
   - Scroll through hero section
   
2. **Authentication** (30s)
   - Click login
   - Show register form
   - Login with test account
   
3. **AI Chat** (1-2 min)
   - Click "Ask AI Assistant" in hero
   - Ask: "Tell me about Victoria Memorial"
   - Show AI response
   - Ask follow-up: "What's the best time to visit?"
   - Show contextual response

### **Stage 2 Flow (5-7 min):**
1. **Dashboard Overview** (30s)
   - Show tourist dashboard
   - Highlight menu structure
   
2. **Feature 1: AI Chat** (1 min)
   - Open chat
   - Complex query: "Plan a 3-day budget trip"
   - Show budget estimation
   
3. **Feature 2: Itinerary Planner** (1 min)
   - Fill form
   - Generate itinerary
   - Show weather integration
   
4. **Feature 3: Heritage Walk** (1 min)
   - Select site
   - Play audio
   - Show GPS tracking
   
5. **Feature 4: Booking** (1 min)
   - Browse guides
   - Make booking
   - Show confirmation
   
6. **Feature 5: Marketplace** (1 min)
   - Browse products
   - View details
   - Add to cart

### **Stage 3 Flow (8-10 min):**
1. **Overview** (1 min)
   - Show complete platform
   - Highlight all features
   
2. **Core Features Recap** (2 min)
   - Quick walkthrough of 5 features
   - Show integration
   
3. **Advanced Features** (3 min)
   - Blockchain verification
   - Mobile app demo
   - Transport tracker
   - Cultural features
   
4. **Technical Deep Dive** (2 min)
   - Show architecture
   - Database schema
   - API endpoints
   
5. **Impact & Future** (1 min)
   - Social impact
   - Roadmap
   - Closing

---

## 🚨 Troubleshooting

### **If Gemini API fails:**
```typescript
// Use mock response
const mockResponse = "Victoria Memorial is one of Kolkata's most iconic landmarks...";
```

### **If backend crashes:**
- Have Postman collection ready
- Show API documentation
- Explain architecture

### **If feature doesn't load:**
- Have screenshots ready
- Explain what it does
- Show code if needed

---

## 💡 Pro Tips

1. **Have backups**: Screenshots, videos, Postman collections
2. **Practice transitions**: Know how to switch between features smoothly
3. **Prepare answers**: Anticipate questions about tech choices
4. **Show enthusiasm**: Be passionate about heritage preservation
5. **Tell a story**: Connect features to real user problems
6. **Time management**: Practice timing for each stage
7. **Have fallbacks**: If something breaks, know how to recover

---

**Good luck! 🚀**





