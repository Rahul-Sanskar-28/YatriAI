# Axicov AI Agent Setup for YatriAI

This guide explains how to set up and use Axicov for AI agent deployment in the YatriAI project.

## What is Axicov?

[Axicov](https://axicov.com) is a platform that allows you to deploy AI workflows as plug-and-play APIs. It supports:

- **Multi-agent orchestration** - Combine multiple AI agents for complex tasks
- **Instant API deployment** - No infrastructure management needed
- **Ethereum wallet login** - Free tier available with MetaMask
- **Real-time monitoring** - Track agent performance and usage

## YatriAI AI Agents

YatriAI uses the following Axicov agents:

| Agent | Purpose | Use Cases |
|-------|---------|-----------|
| **Travel Assistant** | General tourism chat | Answering questions about Jharkhand, travel tips |
| **Itinerary Planner** | Trip planning | Generating personalized multi-day itineraries |
| **Recommendations** | Suggestions engine | Destination and activity recommendations |
| **Guide Matcher** | Tourist-guide matching | Finding the best local guides based on preferences |
| **Cultural Expert** | Heritage insights | Information about tribal culture, festivals, traditions |

## Setup Instructions

### 1. Create an Axicov Account

1. Visit [axicov.com](https://axicov.com)
2. Sign in with your Ethereum wallet (MetaMask recommended)
3. Access your dashboard to create agents

### 2. Create Your AI Agents

For each agent, you'll need to:

1. Click "Create New Agent" in the Axicov dashboard
2. Define the agent's purpose and behavior
3. Configure input/output schemas
4. Deploy the agent to get an API endpoint

#### Travel Assistant Agent

```yaml
Name: YatriAI Travel Assistant
Description: AI-powered travel assistant for Jharkhand tourism
System Prompt: |
  You are a friendly travel assistant specializing in Jharkhand, India tourism.
  You help tourists with:
  - Destination information and recommendations
  - Travel tips and local insights
  - Booking assistance and itinerary suggestions
  
  Always be helpful, accurate, and enthusiastic about Jharkhand's natural beauty,
  tribal culture, and unique experiences.

Input Schema:
  message: string (user's question)
  context: object (optional previous messages and preferences)

Output Schema:
  message: string (AI response)
  suggestions: string[] (follow-up suggestions)
  relatedDestinations: string[] (relevant places)
```

#### Itinerary Planner Agent

```yaml
Name: YatriAI Itinerary Planner
Description: Generates personalized travel itineraries for Jharkhand
System Prompt: |
  You are an expert travel planner for Jharkhand, India.
  Create detailed, personalized itineraries based on:
  - User interests (nature, culture, adventure, spiritual)
  - Budget constraints
  - Duration and travel style
  
  Include specific destinations, activities, accommodations, and estimated costs.

Input Schema:
  preferences:
    interests: string[]
    budget: "budget" | "mid-range" | "luxury"
    travelStyle: "solo" | "couple" | "family" | "group"
    duration: number (days)
    startDate: string (optional)
    groupSize: number (optional)
  weather: object (optional current weather data)

Output Schema:
  id: string
  title: string
  duration: number
  estimatedCost: number
  destinations: array
  dailyPlan: array
  highlights: string[]
  tips: string[]
  weather: string
  bestTimeToVisit: string
```

### 3. Configure Environment Variables

After deploying your agents, add the following to your `.env.local` file:

```env
# Enable Axicov integration
VITE_USE_AXICOV=true

# Axicov API credentials
VITE_AXICOV_API_KEY=your_axicov_api_key_here

# Agent IDs (from your Axicov dashboard)
VITE_AXICOV_AGENT_TRAVEL_ASSISTANT=agent_travel_xxxxx
VITE_AXICOV_AGENT_ITINERARY_PLANNER=agent_itinerary_xxxxx
VITE_AXICOV_AGENT_RECOMMENDATIONS=agent_recommendations_xxxxx
VITE_AXICOV_AGENT_GUIDE_MATCHER=agent_guide_xxxxx
VITE_AXICOV_AGENT_CULTURAL_EXPERT=agent_cultural_xxxxx
```

### 4. Verify Integration

Start your development server and check the console:

```bash
npm run dev
```

You should see:
```
🤖 YatriAI AI Agents: Powered by Axicov
Axicov Agents: {
  travelAssistant: true,
  itineraryPlanner: true,
  recommendations: true,
  guideMatcher: true,
  culturalExpert: true
}
```

## Using Axicov Agents in Code

### AI Service Integration

The `aiService` automatically uses Axicov when configured:

```typescript
import { aiService } from './lib/services';

// Generate itinerary - uses Axicov if configured
const itinerary = await aiService.generateItinerary({
  interests: ['nature', 'cultural'],
  budget: 'mid-range',
  travelStyle: 'family',
  duration: 5,
});

// Chat - uses Axicov Travel Assistant
const response = await aiService.chat('What are the best waterfalls to visit?');

// Get cultural insights - uses Cultural Expert agent
const insights = await aiService.getCulturalInsights('Santhali festivals');

// Match guides - uses Guide Matcher agent
const matches = await aiService.matchGuides({
  interests: ['wildlife', 'photography'],
  language: 'English',
  budget: 'mid-range',
  dates: ['2024-01-15', '2024-01-18'],
});
```

### Direct Axicov Service Access

For advanced use cases, access the Axicov service directly:

```typescript
import { axicovService } from './lib/services';

// Check if Axicov is configured
if (axicovService.isConfigured()) {
  // Orchestrate complex multi-agent queries
  const result = await axicovService.orchestrateComplexQuery({
    message: 'Plan a cultural trip with tribal experiences',
    includeRecommendations: true,
    includeCulturalContext: true,
    userPreferences: {
      interests: ['cultural', 'heritage'],
      budget: 'mid-range',
      duration: 4,
    },
  });

  console.log('Chat:', result.chatResponse?.data);
  console.log('Recommendations:', result.recommendations?.data);
  console.log('Cultural Context:', result.culturalContext?.data);
}
```

## Fallback Behavior

The service architecture provides graceful fallbacks:

1. **Axicov configured** → Uses Axicov agents
2. **Axicov fails** → Falls back to Beeceptor mock (if configured)
3. **No external service** → Uses local mock data

This ensures the app always works, even without external services.

## Monitoring & Debugging

### Console Logging

When Axicov is active, you'll see console logs:

```
🤖 Using Axicov Itinerary Planner agent...
✅ Axicov itinerary generated in 1234ms
```

### Axicov Dashboard

Visit your Axicov dashboard to:
- Monitor agent performance
- View request logs
- Track API usage
- Debug errors

## Cost Considerations

Axicov offers:
- **Free tier** with Ethereum wallet login
- Usage-based pricing for higher volumes
- No credit card required for development

## Troubleshooting

### Agent Not Responding

1. Check if the agent ID is correct in `.env.local`
2. Verify your API key is valid
3. Check the Axicov dashboard for agent status

### Fallback to Mock Data

If you see "⚠️ Axicov agent failed, falling back" in console:

1. Verify `VITE_USE_AXICOV=true`
2. Check `VITE_AXICOV_API_KEY` is set
3. Confirm agent IDs are configured
4. Check network connectivity to Axicov API

### Performance Issues

If agent responses are slow:
1. Check your network latency
2. Review agent complexity in Axicov dashboard
3. Consider caching frequent queries

## Integration with Other Services

Axicov works alongside other YatriAI services:

| Service | Purpose | Works with Axicov? |
|---------|---------|-------------------|
| Beeceptor | API mocking | Fallback when Axicov unavailable |
| ElevenLabs | Voice synthesis | Speaks Axicov responses |
| Blockchain | Verification | Independent service |
| n8n | Workflow automation | Can trigger Axicov agents |

## Next Steps

1. Create and deploy your agents on Axicov
2. Configure environment variables
3. Test the integration locally
4. Monitor performance in the Axicov dashboard
5. Iterate on agent prompts based on user feedback

