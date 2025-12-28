# AI Models Training Guide for YatriAI

This guide covers AI models you can train from scratch to enhance YatriAI's capabilities.

---

## 🎯 Recommended Models (Priority Order)

### 1. **Semantic Search/Embedding Model** ⭐ **HIGHEST PRIORITY**

**Why:** Improves your RAG system's retrieval accuracy for heritage sites, guides, and itineraries.

**Current State:** You're using simple keyword matching (`scoreMatch` function in `rag.service.ts`)

**Model Architecture:**
- **Option A:** Fine-tune `sentence-transformers/all-MiniLM-L6-v2` (recommended)
- **Option B:** Train from scratch using DistilBERT + Mean Pooling
- **Size:** ~80MB, fast inference

**Training Data Needed:**
```python
# Format: (query, relevant_document, label)
[
  ("heritage sites in Kolkata", "Victoria Memorial description", 1),
  ("heritage sites in Kolkata", "Howrah Bridge description", 1),
  ("heritage sites in Kolkata", "Random restaurant", 0),
  ...
]
```

**Implementation Steps:**
1. Collect query-document pairs from user interactions
2. Use contrastive learning (positive pairs = relevant, negative = random)
3. Train for 3-5 epochs
4. Replace `scoreMatch` with cosine similarity on embeddings

**Resources Required:**
- GPU: Optional (CPU works, slower)
- Training Time: 2-4 hours on CPU, 30 mins on GPU
- Dataset Size: 1000-5000 pairs minimum

**Code Example:**
```python
from sentence_transformers import SentenceTransformer, InputExample, losses
from torch.utils.data import DataLoader

# Load base model
model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

# Prepare training data
train_examples = [
    InputExample(texts=["heritage sites Kolkata", "Victoria Memorial is a..."], label=1.0),
    InputExample(texts=["heritage sites Kolkata", "Random restaurant"], label=0.0),
]

# Train
train_dataloader = DataLoader(train_examples, shuffle=True, batch_size=16)
train_loss = losses.CosineSimilarityLoss(model)
model.fit(train_objectives=[(train_dataloader, train_loss)], epochs=3)

# Save
model.save('./models/heritage-embeddings')
```

**Integration:**
- Replace `retrieveLocalContext` function to use embeddings
- Cache embeddings for destinations/itineraries
- Use FAISS or similar for fast similarity search

---

### 2. **Intent Classification Model** ⭐ **HIGH PRIORITY**

**Why:** Routes user queries to correct features (chat, booking, itinerary, etc.)

**Model Architecture:**
- BERT-based classifier (e.g., `distilbert-base-uncased`)
- Output: Multi-class classification (8-10 intents)

**Intents to Classify:**
- `book_guide` - "I want to book a guide"
- `plan_itinerary` - "Plan a 3-day trip"
- `find_heritage` - "Show me heritage sites"
- `budget_question` - "How much will it cost?"
- `cultural_info` - "Tell me about Durga Puja"
- `booking_query` - "Check my bookings"
- `marketplace` - "Show me artisan products"
- `general_chat` - Everything else

**Training Data Format:**
```json
[
  {"text": "I want to book a guide for tomorrow", "intent": "book_guide"},
  {"text": "Plan a 3-day itinerary for Kolkata", "intent": "plan_itinerary"},
  {"text": "Show me heritage sites near me", "intent": "find_heritage"},
  ...
]
```

**Implementation:**
```python
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from transformers import Trainer, TrainingArguments

# Load model
model_name = "distilbert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(
    model_name, 
    num_labels=8  # Number of intents
)

# Train (use HuggingFace Trainer)
training_args = TrainingArguments(
    output_dir='./models/intent-classifier',
    num_train_epochs=3,
    per_device_train_batch_size=16,
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
)
trainer.train()
```

**Integration:**
- Add intent classification before calling Gemini
- Route to specific handlers based on intent
- Improves response time and accuracy

---

### 3. **Named Entity Recognition (NER) for Tourism**

**Why:** Extract structured information from queries (locations, dates, budgets, heritage sites)

**Model Architecture:**
- Fine-tune `bert-base-uncased` for NER
- Use BIO tagging scheme

**Entities to Extract:**
- `LOCATION` - "Kolkata", "Jharkhand", "Victoria Memorial"
- `DATE` - "tomorrow", "next week", "3 days"
- `BUDGET` - "₹5000", "budget-friendly", "luxury"
- `HERITAGE_SITE` - "Durga Puja pandals", "Howrah Bridge"
- `DURATION` - "3 days", "weekend trip"

**Training Data Format (CoNLL):**
```
I    O
want O
to   O
visit O
Kolkata B-LOCATION
next O
week B-DATE
with O
budget O
₹5000 B-BUDGET
```

**Implementation:**
```python
from transformers import AutoTokenizer, AutoModelForTokenClassification
from transformers import Trainer, TrainingArguments

model_name = "bert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForTokenClassification.from_pretrained(
    model_name,
    num_labels=15  # BIO tags for 5 entity types
)

# Train with labeled sequences
trainer = Trainer(...)
trainer.train()
```

**Integration:**
- Extract entities before sending to Gemini
- Pre-fill forms (itinerary planner, booking)
- Improve query understanding

---

### 4. **Recommendation System**

**Why:** Personalized recommendations based on user behavior

**Model Architecture:**
- **Option A:** Matrix Factorization (NMF, SVD) - Simple, fast
- **Option B:** Neural Collaborative Filtering - More complex, better accuracy
- **Option C:** Hybrid (Content-based + Collaborative)

**Training Data:**
```python
# User-item interactions
user_id | item_id | rating | interaction_type
1       | dest_1  | 5      | view
1       | dest_2  | 4      | bookmark
2       | dest_1  | 3      | view
...
```

**Implementation (Matrix Factorization):**
```python
from surprise import SVD, Dataset, Reader
import pandas as pd

# Load data
df = pd.read_csv('user_interactions.csv')
reader = Reader(rating_scale=(1, 5))
data = Dataset.load_from_df(df[['user_id', 'item_id', 'rating']], reader)

# Train
algo = SVD()
trainset = data.build_full_trainset()
algo.fit(trainset)

# Predict
predictions = algo.predict(user_id=1, item_id='dest_5')
```

**Integration:**
- Generate personalized destination recommendations
- "Users like you also visited..."
- Improve engagement and bookings

---

### 5. **Sentiment Analysis Model**

**Why:** Analyze reviews and feedback in multiple languages

**Model Architecture:**
- Multilingual BERT (mBERT) or XLM-RoBERTa
- Binary or 3-class (positive/negative/neutral)

**Training Data:**
```json
[
  {"text": "Amazing heritage walk experience!", "label": "positive", "language": "en"},
  {"text": "बहुत बढ़िया अनुभव", "label": "positive", "language": "hi"},
  {"text": "Guide was not knowledgeable", "label": "negative", "language": "en"},
  ...
]
```

**Implementation:**
```python
from transformers import AutoTokenizer, AutoModelForSequenceClassification

model_name = "xlm-roberta-base"  # Multilingual
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(
    model_name,
    num_labels=3  # positive, negative, neutral
)

# Train on multilingual data
trainer.train()
```

**Integration:**
- Analyze user reviews automatically
- Filter negative reviews for follow-up
- Generate sentiment reports for guides/destinations

---

### 6. **Budget Estimation Model**

**Why:** Predict trip costs more accurately than rule-based systems

**Model Architecture:**
- **Option A:** XGBoost Regression (recommended for structured data)
- **Option B:** Neural Network (for complex patterns)
- **Option C:** Transformer-based (overkill but possible)

**Features:**
- Duration (days)
- Group size
- Budget preference (budget/mid-range/luxury)
- Destination
- Interests (heritage, food, shopping, etc.)
- Season/travel dates

**Training Data:**
```python
# Historical booking data
{
  "duration": 3,
  "group_size": 2,
  "budget_pref": "mid-range",
  "destination": "Kolkata",
  "interests": ["heritage", "food"],
  "actual_cost": 15000
}
```

**Implementation:**
```python
import xgboost as xgb
import pandas as pd

# Prepare features
X = df[['duration', 'group_size', 'budget_pref_encoded', ...]]
y = df['actual_cost']

# Train
model = xgb.XGBRegressor()
model.fit(X, y)

# Predict
prediction = model.predict([[3, 2, 1, ...]])
```

**Integration:**
- Replace mock budget estimates in itinerary planner
- Show realistic cost ranges
- Improve user trust

---

## 📊 Comparison Table

| Model | Difficulty | Training Time | GPU Needed | Impact | Priority |
|-------|-----------|---------------|------------|--------|----------|
| Semantic Embeddings | Low | 2-4 hours | Optional | High | ⭐⭐⭐ |
| Intent Classification | Low | 1-2 hours | Optional | High | ⭐⭐⭐ |
| NER | Medium | 3-5 hours | Optional | Medium | ⭐⭐ |
| Recommendation | Low | 30 mins | No | Medium | ⭐⭐ |
| Sentiment Analysis | Medium | 2-3 hours | Optional | Low | ⭐ |
| Budget Estimation | Low | 1 hour | No | Medium | ⭐⭐ |

---

## 🚀 Quick Start: Semantic Embeddings Model

**This is the easiest and highest-impact model to start with.**

### Step 1: Install Dependencies
```bash
pip install sentence-transformers torch pandas numpy
```

### Step 2: Prepare Training Data
```python
# scripts/prepare_embedding_data.py
import json
from data.mockData import destinations, itineraries, guides

# Create query-document pairs
training_pairs = []

# For each destination, create positive pairs
for dest in destinations:
    queries = [
        f"heritage sites in {dest.location}",
        f"places to visit {dest.name}",
        f"{dest.category} attractions",
    ]
    for query in queries:
        training_pairs.append({
            "query": query,
            "document": f"{dest.name}. {dest.description}",
            "label": 1.0
        })

# Add negative pairs (random mismatches)
# Save to JSON
with open('training_data/embedding_pairs.json', 'w') as f:
    json.dump(training_pairs, f)
```

### Step 3: Train Model
```python
# scripts/train_embeddings.py
from sentence_transformers import SentenceTransformer, InputExample, losses
from torch.utils.data import DataLoader
import json

# Load data
with open('training_data/embedding_pairs.json') as f:
    data = json.load(f)

# Create model
model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

# Prepare examples
train_examples = [
    InputExample(texts=[item["query"], item["document"]], label=item["label"])
    for item in data
]

# Train
train_dataloader = DataLoader(train_examples, shuffle=True, batch_size=16)
train_loss = losses.CosineSimilarityLoss(model)

model.fit(
    train_objectives=[(train_dataloader, train_loss)],
    epochs=3,
    output_path='./models/heritage-embeddings'
)
```

### Step 4: Integrate into Backend
```typescript
// backend/src/services/embeddingService.ts
import { SentenceTransformer } from '@xenova/transformers'; // Browser-compatible

class EmbeddingService {
  private model: any;
  
  async initialize() {
    this.model = await SentenceTransformer.from_pretrained('./models/heritage-embeddings');
  }
  
  async getEmbedding(text: string): Promise<number[]> {
    return await this.model.encode(text);
  }
  
  cosineSimilarity(a: number[], b: number[]): number {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (normA * normB);
  }
}
```

### Step 5: Update RAG Service
```typescript
// src/lib/services/rag.service.ts
import { embeddingService } from './embeddingService';

export const retrieveLocalContext = async (query: string): Promise<RagSource[]> => {
  const queryEmbedding = await embeddingService.getEmbedding(query);
  
  // Pre-compute embeddings for all destinations (cache these)
  const destinationEmbeddings = await Promise.all(
    destinations.map(d => embeddingService.getEmbedding(`${d.name} ${d.description}`))
  );
  
  // Calculate similarities
  const scores = destinationEmbeddings.map(emb => 
    embeddingService.cosineSimilarity(queryEmbedding, emb)
  );
  
  // Return top matches
  return destinations
    .map((d, i) => ({ ...d, score: scores[i] }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
};
```

---

## 📝 Data Collection Strategy

### 1. **User Query Logs**
- Log all user queries in chat
- Tag with user actions (clicked destination, booked guide, etc.)
- Use as positive examples

### 2. **A/B Testing**
- Compare keyword search vs. embedding search
- Measure click-through rates
- Iterate based on user behavior

### 3. **Active Learning**
- Show low-confidence predictions to users
- Collect feedback
- Retrain with new data

---

## 🛠️ Infrastructure Requirements

### Minimum Setup:
- **CPU:** Modern multi-core processor
- **RAM:** 8GB minimum, 16GB recommended
- **Storage:** 10GB for models and data
- **Training Time:** Can run overnight on CPU

### Recommended Setup:
- **GPU:** NVIDIA GPU with 4GB+ VRAM (optional but faster)
- **Cloud:** Google Colab (free GPU) or AWS/GCP
- **Framework:** PyTorch or TensorFlow

---

## 📚 Resources & Tutorials

1. **Sentence Transformers:** https://www.sbert.net/
2. **HuggingFace Transformers:** https://huggingface.co/docs/transformers/
3. **XGBoost:** https://xgboost.readthedocs.io/
4. **Recommendation Systems:** https://surprise.readthedocs.io/

---

## 🎯 Next Steps

1. **Start with Semantic Embeddings** (easiest, highest impact)
2. **Collect user interaction data** for training
3. **Set up evaluation metrics** (precision@k, recall@k)
4. **Deploy model to backend** (use ONNX for production)
5. **Monitor performance** and retrain periodically

---

## 💡 Tips

- **Start small:** Train on 100-500 examples first, validate, then scale
- **Use pre-trained models:** Fine-tune instead of training from scratch when possible
- **Cache embeddings:** Pre-compute embeddings for destinations/itineraries
- **Version control:** Track model versions and training data
- **A/B testing:** Compare old vs. new models before full rollout

---

**Questions?** Check the codebase or create an issue for model-specific questions.










