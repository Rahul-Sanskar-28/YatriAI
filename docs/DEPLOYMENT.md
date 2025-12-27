# Deployment Guide

Complete guide for deploying YatriAI to production.

## Quick Deploy

### Frontend (Vercel)

```bash
npm i -g vercel
vercel
```

### Backend (Railway)

1. Push to GitHub
2. Connect repository to Railway
3. Set environment variables
4. Deploy

## Deployment Options

### Frontend

| Platform | Best For | Cost | Setup |
|----------|----------|------|-------|
| **Vercel** ⭐ | React/Vite apps | Free tier | `vercel` CLI |
| **Netlify** | Static sites | Free tier | Drag & drop |
| **GitHub Pages** | Simple hosting | Free | GitHub Actions |

### Backend

| Platform | Best For | Cost | Database |
|----------|----------|------|----------|
| **Railway** ⭐ | Node.js + PostgreSQL | Free tier | Included |
| **Render** | Full-stack apps | Free tier | PostgreSQL |
| **Heroku** | Traditional apps | Paid | Add-on |

### Database

| Platform | Type | Cost | Notes |
|----------|------|------|-------|
| **Neon** ⭐ | PostgreSQL | Free tier | Serverless |
| **Supabase** | PostgreSQL | Free tier | Full-featured |
| **Railway** | PostgreSQL | Included | With backend |

## Environment Variables

### Frontend (.env)

```env
VITE_GEMINI_API_KEY=your_key
VITE_GEMINI_MODEL=gemini-2.0-flash-exp
VITE_GEMINI_PROXY=https://your-backend.railway.app/gemini
VITE_API_URL=https://your-backend.railway.app
```

### Backend (.env)

```env
GEMINI_API_KEY=your_key
DATABASE_URL=postgresql://...
FRONTEND_URL=https://your-frontend.vercel.app
PORT=3001
```

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Database connection string set
- [ ] API keys added
- [ ] CORS configured for production domain
- [ ] Build succeeds locally
- [ ] Tests pass
- [ ] Frontend builds without errors
- [ ] Backend starts successfully

## Post-Deployment

1. Test all features
2. Monitor logs for errors
3. Check API usage/quota
4. Set up monitoring/alerts
5. Configure custom domain (optional)

---

**See main README.md for detailed setup instructions.**




