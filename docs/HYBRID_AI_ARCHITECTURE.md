# Hybrid AI Architecture: APIs + Custom Models

## 🎯 The Strategy: **Complement, Don't Replace**

**TL;DR:** Keep using Gemini API for general intelligence. Train custom models to improve domain-specific tasks that APIs handle poorly.

---

## 📊 Current Architecture

```
User Query
    ↓
[Simple Keyword Search] ← Your current RAG retrieval
    ↓
[Gemini API] ← General conversation & itinerary generation
    ↓
Response
```

**Problems:**
- Keyword search misses semantic matches ("heritage sites" vs "historical monuments")
- Gemini API is expensive for simple tasks (intent classification, entity extraction)
- No personalization based on user behavior
- Slow response times (API latency)

---

## 🚀 Improved Hybrid Architecture

```
User Query
    ↓
[Custom Intent Classifier] ← NEW: Routes to correct handler
    ↓
[Custom NER Model] ← NEW: Extracts locations, dates, budgets
    ↓
[Custom Embedding Model] ← NEW: Better semantic search
    ↓
[Retrieve Relevant Context] ← Improved RAG retrieval
    ↓
[Gemini API] ← Still used for final response generation
    ↓
[Custom Budget Model] ← NEW: Validates/improves budget estimates
    ↓
Response
```

---

## 💡 What to Keep vs. What to Train

### ✅ **KEEP Using Gemini API For:**

1. **General Conversation**
   - Natural language understanding
   - Contextual responses
   - Multi-turn conversations
   - **Why:** Gemini excels at this, expensive to replicate

2. **Itinerary Generation**
   - Creating structured travel plans
   - Synthesizing multiple sources
   - Creative suggestions
   - **Why:** Requires deep reasoning, Gemini handles this well

3. **Cultural Context**
   - Explaining heritage significance
   - Storytelling about sites
   - **Why:** Needs broad knowledge, Gemini has this

### 🎯 **TRAIN Custom Models For:**

1. **Semantic Search/Embeddings** ⭐ **HIGHEST VALUE**
   - **Current:** Simple keyword matching (`scoreMatch` function)
   - **Custom Model:** Embedding-based similarity search
   - **Why:** 
     - APIs don't provide good search
     - Your domain data (heritage sites) is unique
     - Much faster than API calls
     - Better accuracy for your specific content

2. **Intent Classification**
   - **Current:** Gemini figures it out (slow, expensive)
   - **Custom Model:** Instant classification (book_guide, plan_itinerary, etc.)
   - **Why:**
     - Simple task, waste of API calls
     - Faster response time
     - Can route to specialized handlers

3. **Named Entity Recognition (NER)**
   - **Current:** Gemini extracts entities (slow, inconsistent)
   - **Custom Model:** Fast, accurate extraction
   - **Why:**
     - Structured task, models excel at this
     - Pre-fills forms automatically
     - Reduces API calls

4. **Recommendation System**
   - **Current:** No personalization
   - **Custom Model:** Collaborative filtering
   - **Why:**
     - Uses YOUR user data
     - APIs can't do this (no access to your DB)
     - Classic ML, very effective

5. **Budget Estimation**
   - **Current:** Rule-based or Gemini estimates
   - **Custom Model:** Data-driven predictions
   - **Why:**
     - Uses YOUR historical booking data
     - More accurate than general estimates
     - Fast, no API needed

---

## 💰 Cost & Performance Comparison

### Current Approach (API-Only):
```
User Query → Gemini API → Response
Cost: $0.01-0.05 per query
Latency: 500-2000ms
```

### Hybrid Approach (API + Custom Models):
```
User Query → Custom Models (fast, free) → Gemini API (only when needed) → Response
Cost: $0.001-0.01 per query (90% reduction)
Latency: 100-500ms (80% faster)
```

**Example Flow:**
1. Intent Classification (custom model, 10ms, free) → "plan_itinerary"
2. NER (custom model, 20ms, free) → Extract: location="Kolkata", duration="3 days"
3. Semantic Search (custom model, 50ms, free) → Find relevant heritage sites
4. Gemini API (only for final generation, $0.01) → Generate itinerary
5. Budget Model (custom model, 5ms, free) → Validate/improve budget

**Total:** ~85ms custom models + 500ms Gemini = 585ms (vs 2000ms API-only)
**Cost:** $0.01 (vs $0.05 API-only)

---

## 🔄 Real-World Example

### Scenario: User asks "Plan a 3-day heritage tour of Kolkata"

#### **Current Flow (API-Only):**
```
1. Send full query to Gemini API
2. Gemini does everything:
   - Understands intent
   - Extracts entities
   - Searches knowledge
   - Generates response
3. Response in 2000ms, costs $0.05
```

#### **Improved Flow (Hybrid):**
```
1. Intent Classifier (custom, 10ms): "plan_itinerary"
2. NER Model (custom, 20ms): 
   - duration: "3 days"
   - location: "Kolkata"
   - type: "heritage"
3. Embedding Search (custom, 50ms): 
   - Finds relevant heritage sites
   - Retrieves top 5 matches
4. Send to Gemini API with pre-processed context:
   "Generate itinerary for 3 days in Kolkata. 
    Relevant sites: [pre-retrieved list]"
5. Gemini focuses on generation only
6. Budget Model (custom, 5ms): Validates cost estimate
7. Response in 585ms, costs $0.01
```

**Benefits:**
- ✅ 70% faster
- ✅ 80% cheaper
- ✅ More accurate (better context retrieval)
- ✅ Better user experience

---

## 🛠️ Implementation Strategy

### Phase 1: Start with Embeddings (Week 1)
**Impact:** Immediate improvement in RAG retrieval
**Effort:** Low (2-4 hours)
**Replace:** `scoreMatch` function in `rag.service.ts`

```typescript
// Before (current)
const score = scoreMatch(`${dest.name} ${dest.description}`, query);

// After (with custom embeddings)
const queryEmbedding = await embeddingModel.encode(query);
const destEmbedding = await embeddingModel.encode(`${dest.name} ${dest.description}`);
const score = cosineSimilarity(queryEmbedding, destEmbedding);
```

### Phase 2: Add Intent Classification (Week 2)
**Impact:** Faster routing, better UX
**Effort:** Low (1-2 hours)
**Add:** Pre-processing before Gemini calls

```typescript
// Before (current)
const response = await callGemini(userQuery, context);

// After (with intent classifier)
const intent = await intentClassifier.predict(userQuery);
if (intent === 'book_guide') {
  // Route to booking handler, skip Gemini
} else {
  const response = await callGemini(userQuery, context);
}
```

### Phase 3: Add NER (Week 3)
**Impact:** Better form pre-filling, query understanding
**Effort:** Medium (3-5 hours)
**Add:** Entity extraction before API calls

```typescript
// Extract entities first
const entities = await nerModel.extract(userQuery);
// entities: { location: "Kolkata", duration: "3 days", budget: "₹5000" }

// Pre-fill itinerary form
setPreferences({
  location: entities.location,
  duration: parseInt(entities.duration),
  budget: entities.budget,
});

// Send enriched query to Gemini
const response = await callGemini(enrichedQuery, context);
```

### Phase 4: Add Recommendation System (Week 4)
**Impact:** Personalization, better engagement
**Effort:** Low (1 hour)
**Add:** Personalized suggestions

```typescript
// Get personalized recommendations
const recommendations = await recommendationModel.predict(userId);
// Show: "Users like you also visited..."
```

---

## 📈 Expected Improvements

| Metric | Current (API-Only) | Hybrid (API + Custom) | Improvement |
|--------|-------------------|----------------------|-------------|
| **Response Time** | 1500-2000ms | 300-600ms | **70% faster** |
| **Cost per Query** | $0.03-0.05 | $0.005-0.01 | **80% cheaper** |
| **Search Accuracy** | 60-70% | 85-95% | **+25% accuracy** |
| **API Calls** | 100% | 20-30% | **70% reduction** |
| **User Satisfaction** | Baseline | Higher | Better UX |

---

## 🎯 Decision Framework

**Use Gemini API when:**
- ✅ Need creative generation
- ✅ Need broad knowledge
- ✅ Need natural conversation
- ✅ Task is complex/ambiguous

**Train Custom Model when:**
- ✅ Task is structured (classification, extraction)
- ✅ You have domain-specific data
- ✅ Speed is critical
- ✅ Cost is a concern
- ✅ Task repeats frequently

---

## 💻 Code Example: Hybrid Implementation

```typescript
// src/lib/services/hybridAIService.ts

import { embeddingService } from './embeddingService';
import { intentClassifier } from './intentClassifier';
import { nerModel } from './nerModel';
import { callGemini } from './rag.service';

class HybridAIService {
  async processQuery(userQuery: string, userId?: string) {
    // Step 1: Intent Classification (custom model, fast)
    const intent = await intentClassifier.predict(userQuery);
    
    // Step 2: Entity Extraction (custom model, fast)
    const entities = await nerModel.extract(userQuery);
    
    // Step 3: Semantic Search (custom model, fast)
    const relevantContext = await this.retrieveContext(userQuery);
    
    // Step 4: Route based on intent
    if (intent === 'book_guide' && entities.location) {
      // Skip Gemini, use structured data
      return this.handleBooking(entities);
    }
    
    if (intent === 'get_recommendations' && userId) {
      // Use recommendation model, skip Gemini
      return await recommendationModel.getRecommendations(userId);
    }
    
    // Step 5: Use Gemini only for complex queries
    const geminiResponse = await callGemini(
      userQuery,
      relevantContext, // Pre-retrieved with custom embeddings
      entities // Pre-extracted with custom NER
    );
    
    // Step 6: Post-process with custom models
    if (geminiResponse.budget) {
      const validatedBudget = await budgetModel.validate(
        geminiResponse.budget,
        entities
      );
      geminiResponse.budget = validatedBudget;
    }
    
    return geminiResponse;
  }
  
  private async retrieveContext(query: string) {
    // Use custom embedding model instead of keyword search
    const queryEmbedding = await embeddingService.encode(query);
    // ... semantic search logic
  }
}
```

---

## ✅ Summary

**Don't replace Gemini API** - it's excellent for what it does.

**Do train custom models** for:
1. **Search/Retrieval** (embeddings) - Biggest impact
2. **Intent Classification** - Faster routing
3. **NER** - Better query understanding
4. **Recommendations** - Personalization
5. **Budget Estimation** - Accuracy

**Result:** Faster, cheaper, more accurate system that still leverages Gemini's strengths.

---

## 🚀 Next Steps

1. **Start with Semantic Embeddings** (easiest, highest impact)
2. **Keep using Gemini** for final response generation
3. **Gradually add** other custom models
4. **Measure improvements** (latency, cost, accuracy)
5. **Iterate** based on results

**The goal:** Best of both worlds - API intelligence + custom domain expertise.



