import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

interface GeminiCandidate {
  content: {
    parts: Array<{
      text: string;
    }>;
  };
}

interface GeminiResponse {
  candidates: GeminiCandidate[];
}

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

  async generateArtStory(artworkData: {
    title: string;
    description: string;
    artStyle: string;
    region: string;
    culturalSignificance: string;
    colors: string[];
    techniques: string[];
  }): Promise<string> {
    const prompt = `
You are an expert art historian and storyteller specializing in traditional Indian art forms, particularly Pattachitra and Bengali cultural arts.

Create a captivating story about this artwork:
- Title: ${artworkData.title}
- Description: ${artworkData.description}
- Art Style: ${artworkData.artStyle}
- Region: ${artworkData.region}
- Cultural Significance: ${artworkData.culturalSignificance}
- Colors Used: ${artworkData.colors.join(', ')}
- Techniques: ${artworkData.techniques.join(', ')}

Write a compelling narrative story (2-3 paragraphs) that:
- Brings the artwork to life with vivid imagery
- Explains the cultural and spiritual significance
- Describes the artistic techniques and their importance
- Connects the artwork to its regional heritage
- Uses poetic and engaging language
- Makes the reader feel the emotion and devotion behind the art

Write as if you're guiding someone through a museum, sharing the deep cultural stories behind this masterpiece.
    `;

    return this.generateContent(prompt);
  }

  isAvailable(): boolean {
    return this.genAI !== null;
  }
}

export const geminiService = new GeminiService();

// Export individual functions for backward compatibility
export const generateBeaconNarrative = (locationString: string) => 
  geminiService.generateNarrative(locationString);

export const generateArtStory = (artworkData: {
  title: string;
  description: string;
  artStyle: string;
  region: string;
  culturalSignificance: string;
  colors: string[];
  techniques: string[];
}) => geminiService.generateArtStory(artworkData);

// Generate AI story for Artisan Chronicles
export const generateArtisanStory = async (artisanData: {
  name: string;
  specialization: string;
  location: string;
  experience: number;
  generation?: string;
  bio: string;
}): Promise<string> => {
  const prompt = `
You are a master storyteller specializing in Bengali cultural heritage and traditional crafts.

Create a compelling narrative story about this master artisan:
- Name: ${artisanData.name}
- Specialization: ${artisanData.specialization}
- Location: ${artisanData.location}
- Experience: ${artisanData.experience} years
- Generation: ${artisanData.generation || 'Traditional craftsperson'}
- Bio: ${artisanData.bio}

Write a captivating story (2-3 paragraphs) that:
- Captures the artisan's journey and dedication to their craft
- Describes the traditional techniques and skills they've mastered
- Connects their work to Bengali cultural heritage and traditions
- Mentions their location and its significance to the craft
- Uses respectful, inspiring language that honors their expertise
- Includes sensory details about their workshop and craft process
- Shows the continuity of tradition from generation to generation

Write as if you're documenting the living heritage of Bengal, preserving the stories of master craftspeople for future generations.
  `;

  return geminiService.generateContent(prompt);
};

// Legacy function for monument story generation (from picture deck feature)
export async function generateMonumentStory(imageBase64: string): Promise<string> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY not found in environment variables");
    }

    if (!imageBase64) {
      throw new Error("No image data provided");
    }

    const prompt = `Identify the historic monument shown in the image. Write a clear, engaging historical story (150–200 words) about this monument, covering:
- Its historical background
- Architectural features
- Cultural and social importance

The core language should remain English, but the narration style must reflect a strong Bengali accent and tone — slightly informal, warm, and expressive, similar to how a Bengali person naturally speaks English (e.g., gentle sentence flow, emotional emphasis, cultural warmth).

The story should feel story-like, conversational, and vivid, while still being historically accurate and informative.`;

    // Remove data URL prefix if present
    const cleanBase64: string = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');

    console.log("🤖 Using Gemini 2.5 Flash model for story generation");

    const requestBody = {
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: "image/jpeg",
                data: cleanBase64,
              },
            },
          ],
        },
      ],
    };

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.data || !(response.data as GeminiResponse).candidates || !(response.data as GeminiResponse).candidates[0]) {
      throw new Error("Empty response from Gemini API");
    }

    const generatedText: string = (response.data as GeminiResponse).candidates[0].content.parts[0].text;
    console.log("✅ Story generated successfully with Gemini 2.5 Flash");
    return generatedText;
  } catch (error: any) {
    console.error("❌ Gemini API Error:", error.response?.data || error.message);
    throw new Error(`AI generation failed: ${error.response?.data?.error?.message || error.message}`);
  }
}
