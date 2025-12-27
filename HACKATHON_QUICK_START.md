# YatriAI - Hackathon Quick Start Guide

## 🎯 Overview

This guide helps you quickly prepare and present YatriAI in 3 progressive stages for hackathon judging.

---

## 📚 Documentation Files

1. **`HACKATHON_ROADMAP.md`** - Complete roadmap with feature breakdown
2. **`STAGE_IMPLEMENTATION_GUIDE.md`** - Code examples and implementation details
3. **`PRESENTATION_OUTLINE.md`** - Slide structure and talking points
4. **`PRESENTATION_SCRIPT.md`** - Full presentation script (if doing full demo)
5. **`ELEVATOR_PITCH.md`** - Quick pitches for different time limits

---

## ⚡ Quick Setup (5 minutes)

### **1. Start Servers**

```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend  
npm install
npm run dev

# Terminal 3 - Mobile (for Stage 3)
cd mobile
npm install
npm start
```

### **2. Configure Environment**

Create `.env` in root:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_PRESENTATION_STAGE=STAGE_1  # Change to STAGE_2 or STAGE_3
```

Create `backend/.env`:
```env
GEMINI_API_KEY=your_gemini_api_key
PORT=3001
DATABASE_URL=your_database_url
```

### **3. Test Accounts**

```
Tourist:
Email: john.doe@example.com
Password: tourist123

Admin:
Email: admin@yatri.ai
Password: admin123
```

---

## 🎬 Stage Breakdown

### **STAGE 1: MVP (2-3 minutes)**
**Goal:** Show working foundation

**What to Show:**
1. Landing page (30s)
2. Login/Register (30s)
3. AI Chat in hero section (1-2 min)

**Key Files:**
- `src/App.tsx` - Simplified version
- `src/components/landing/HeroSection.tsx` - With chat button
- `src/components/landing/AIChatModal.tsx` - Simple chat component
- `backend/src/index.ts` - Gemini proxy endpoint

**Demo Flow:**
```
Landing Page → Click Login → Login → Click "Ask AI" → Ask Question → Show Response
```

---

### **STAGE 2: Core Features (5-7 minutes)**
**Goal:** Demonstrate 5 major features

**What to Show:**
1. Tourist Dashboard (30s)
2. AI Chat - Enhanced (1 min)
3. AI Itinerary Planner (1 min)
4. Heritage Walk (1 min)
5. Booking System (1 min)
6. Marketplace (1 min)

**Key Files:**
- `src/components/dashboard/TouristDashboard.tsx`
- `src/components/dashboard/components/AIChat.tsx`
- `src/components/dashboard/components/AIItineraryPlanner.tsx`
- `src/components/dashboard/components/HeritageWalk.tsx`
- `src/components/dashboard/components/BookingSystem.tsx`
- `src/components/dashboard/components/Marketplace.tsx`

**Demo Flow:**
```
Dashboard → Chat → Itinerary → Heritage Walk → Booking → Marketplace
```

---

### **STAGE 3: Full Project (8-10 minutes)**
**Goal:** Show complete platform

**What to Show:**
1. All Stage 2 features (2 min)
2. Blockchain Verification (1 min)
3. Mobile App (1 min)
4. Transport Tracker (1 min)
5. Cultural Features (1 min)
6. Admin Dashboard (1 min)
7. Technical Overview (1 min)

**Key Files:**
- All Stage 2 files +
- `src/components/dashboard/components/VerifiedMarketplace.tsx`
- `src/components/dashboard/components/HeritageNFT.tsx`
- `src/components/dashboard/components/TransportTracker.tsx`
- `src/components/dashboard/AdminDashboard.tsx`
- `mobile/` - React Native app

**Demo Flow:**
```
Overview → Core Features → Blockchain → Mobile → Advanced → Admin → Closing
```

---

## 🛠️ Feature Flags (Optional)

Create `src/config/stages.ts`:

```typescript
export const STAGE_CONFIG = {
  STAGE_1: {
    showDashboard: false,
    showFeatures: ['chat'],
  },
  STAGE_2: {
    showDashboard: true,
    showFeatures: ['chat', 'itinerary', 'heritage', 'booking', 'marketplace'],
  },
  STAGE_3: {
    showDashboard: true,
    showFeatures: 'all',
  }
};

export const CURRENT_STAGE = import.meta.env.VITE_PRESENTATION_STAGE || 'STAGE_3';
export const config = STAGE_CONFIG[CURRENT_STAGE];
```

Use in components:
```typescript
import { config } from '../config/stages';

{config.showFeatures.includes('chat') && <AIChat />}
```

---

## 📋 Pre-Presentation Checklist

### **30 Minutes Before:**
- [ ] All servers running
- [ ] Test accounts working
- [ ] API keys configured
- [ ] Browser tabs prepared
- [ ] Demo data ready

### **10 Minutes Before:**
- [ ] Slides ready (if using)
- [ ] Demo flow practiced
- [ ] Backup screenshots ready
- [ ] Mobile app built (Stage 3)
- [ ] Blockchain wallet connected (Stage 3)

### **Right Before:**
- [ ] Refresh browser
- [ ] Check network tab
- [ ] Test one feature
- [ ] Deep breath!

---

## 🎤 Presentation Tips

### **Stage 1:**
- **Focus:** One thing done well
- **Emphasize:** Working integration
- **Show:** Real AI responses

### **Stage 2:**
- **Focus:** User experience
- **Emphasize:** Full functionality
- **Show:** Real data flow

### **Stage 3:**
- **Focus:** Complete solution
- **Emphasize:** Technical depth
- **Show:** Impact and future

---

## 🚨 Troubleshooting

### **Backend not starting:**
```bash
# Check if port 3001 is free
netstat -ano | findstr :3001

# Kill process if needed
taskkill /PID <pid> /F
```

### **Frontend not loading:**
```bash
# Clear cache
rm -rf node_modules/.vite
npm run dev
```

### **Gemini API failing:**
- Check API key in `.env`
- Use mock responses as fallback
- Show Postman collection

### **Database errors:**
- Use mock data
- Show Prisma schema
- Explain architecture

---

## 💡 Pro Tips

1. **Practice transitions** between features
2. **Have backup plans** for each demo
3. **Show enthusiasm** - be passionate!
4. **Tell a story** - connect to real problems
5. **Time yourself** - stay within limits
6. **Prepare Q&A** - anticipate questions
7. **Have screenshots** ready as backup

---

## 📊 Quick Reference

### **Stage 1:**
- Landing Page ✅
- Authentication ✅
- AI Chat ✅

### **Stage 2:**
- All Stage 1 ✅
- AI Chat (Enhanced) ✅
- Itinerary Planner ✅
- Heritage Walk ✅
- Booking System ✅
- Marketplace ✅

### **Stage 3:**
- All Stage 2 ✅
- Blockchain ✅
- Mobile App ✅
- Transport Tracker ✅
- Cultural Features ✅
- Admin Dashboard ✅

---

## 🎯 Key Messages

**For Judges:**
- Scalable, production-ready platform
- Real integrations, not mockups
- Supporting local communities
- Modern tech stack

**For Technical:**
- React + Node.js + TypeScript
- Prisma + PostgreSQL
- Google Gemini AI
- Ethereum Blockchain
- React Native Mobile

**For Business:**
- Revenue from bookings & marketplace
- Supporting artisans & guides
- Cultural preservation focus
- Growing domestic tourism market

---

## 📞 Quick Help

**If something breaks:**
1. Don't panic!
2. Use backup screenshots
3. Explain what it does
4. Show code if needed
5. Move to next feature

**If time runs short:**
1. Focus on strongest features
2. Skip less critical demos
3. Emphasize impact
4. Show mobile/blockchain (impressive!)

---

## ✅ Final Checklist

- [ ] Read `HACKATHON_ROADMAP.md`
- [ ] Review `STAGE_IMPLEMENTATION_GUIDE.md`
- [ ] Practice with `PRESENTATION_OUTLINE.md`
- [ ] Servers running
- [ ] Test accounts ready
- [ ] Demo flow practiced
- [ ] Backup materials ready
- [ ] Confidence high!

---

**You've got this! 🚀**

**Remember:**
- You built something amazing
- Judges want to see it work
- Show your passion
- Have fun!

**Good luck with your hackathon! 🎉**






