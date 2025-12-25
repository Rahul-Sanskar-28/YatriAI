import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/authRoutes.js';
import destinationRoutes from './routes/destinationRoutes.js';
import guideRoutes from './routes/guideRoutes.js';
import productRoutes from './routes/productRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import itineraryRoutes from './routes/itineraryRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import trainRoutes from './routes/trainRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load env from backend/.env and fallback to root .env
dotenv.config();
try {
  dotenv.config({ path: path.resolve(process.cwd(), '../.env') });
} catch {}

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/guides', guideRoutes);
app.use('/api/products', productRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/itineraries', itineraryRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/trains', trainRoutes);

// Gemini proxy to avoid CORS and hide API key
app.post('/gemini', async (req, res) => {
  try {
    const { model = 'gemini-1.5-pro', prompt, localContext = [], webContext = [], budget } = req.body;
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Missing required field: prompt' });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.error('❌ Gemini API key not found in environment variables');
      return res.status(500).json({ error: 'Gemini API key not configured on server' });
    }

    console.log(`🔍 Gemini proxy called with model: ${model}`);

    const contextText = [...(Array.isArray(localContext) ? localContext : []), ...(Array.isArray(webContext) ? webContext : [])]
      .slice(0, 8)
      .map((c: any) => `${c.type || 'context'}: ${c.title || ''} — ${c.snippet || ''}`)
      .join('\n');

    const budgetText = budget
      ? `Budget window: ₹${new Intl.NumberFormat('en-IN').format(budget.low)} - ₹${new Intl.NumberFormat('en-IN').format(budget.high)} (${budget.basis}).`
      : 'Budget not provided.';

    const body = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: [
                'You are a concise Indian travel planner for Kolkata.',
                `User request: ${prompt}`,
                budgetText,
                contextText ? `Context:\n${contextText}` : 'No retrieved context.',
                'Return 2-4 bullets: sights, suggested flow, food, and a one-line value tip.',
              ].join('\n\n'),
            },
          ],
        },
      ],
    };

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    console.log(`📡 Calling Gemini API at ${url.split('?')[0]}`);
    
    const resp = await axios.post(url, body, { headers: { 'Content-Type': 'application/json' } });
    const data = resp.data;
    const text = (data as any)?.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log(`✅ Gemini response received, length: ${text?.length || 0} chars`);
    return res.json({ text: typeof text === 'string' ? text : '' });
  } catch (error: any) {
    console.error('❌ Gemini proxy error:', error?.response?.status, error?.response?.data || error?.message || error);
    return res.status(error?.response?.status || 500).json({ 
      error: 'Gemini proxy failed',
      details: error?.response?.data?.error || error?.message
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 YatriAI Backend running on http://localhost:${PORT}`);
});

export default app;












