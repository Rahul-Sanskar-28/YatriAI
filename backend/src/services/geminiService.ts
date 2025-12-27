import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      console.log('✅ Gemini Service initialized');
    } else {
      console.warn('⚠️ Gemini API key not found - Gemini features will be disabled');
    }
  }

  async generateContent(prompt: string, model: string = 'gemini-1.5-flash'): Promise<string> {
    if (!this.genAI) {
      throw new Error('Gemini API not initialized - API key missing');
    }

    try {
      const generativeModel = this.genAI.getGenerativeModel({ model });
      const result = await generativeModel.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return text || 'No response generated';
    } catch (error: any) {
      console.error('❌ Gemini generation error:', error?.message || error);
      
      // Try fallback model if the first one fails
      if (error?.message?.includes('not found') && model !== 'gemini-1.5-flash') {
        console.log('🔄 Trying fallback model: gemini-1.5-flash');
        return this.generateContent(prompt, 'gemini-1.5-flash');
      }
      
      throw new Error(`Failed to generate content: ${error?.message || 'Unknown error'}`);
    }
  }

  async generateNarrative(locationMessage: string): Promise<string> {
    const prompt = `
You are a Bengali storyteller with a warm, engaging voice and a slight Bengali accent when speaking English. 
A beacon device has detected: "${locationMessage}"

Create a captivating narrative story about this place in English with Bengali cultural context and expressions. The story should:

1. Be 2-3 paragraphs long
2. Include historical or cultural significance
3. Use some Bengali expressions naturally (like "arre", "ki sundor", "ek dam", etc.)
4. Have a warm, storytelling tone as if speaking to a friend
5. Include interesting facts or legends about the place
6. End with an invitation to explore more

Make it sound like a friendly Bengali guide is telling you about this wonderful place.

Example style: "Arre, you have discovered Victoria Memorial! Ki sundor place this is, na? Let me tell you the fascinating story of this magnificent marble wonder..."

Generate the narrative now:
    `;

    return this.generateContent(prompt);
  }

  isAvailable(): boolean {
    return this.genAI !== null;
  }
}

export const geminiService = new GeminiService();