# ML Models Training & Evaluation Guide

Complete guide for training, evaluating, and using ML models in YatriAI.

## Overview

YatriAI uses two custom-trained ML models:
1. **Semantic Embeddings Model** - For semantic search and RAG retrieval
2. **Intent Classification Model** - For understanding user queries

## Current Model Performance

### Semantic Embeddings Model
- **Accuracy:** 98.46%
- **Precision:** 98.04%
- **Recall:** 100.00%
- **F1-Score:** 99.01%
- **Status:** ✅ Excellent - Production ready

### Intent Classification Model
- **Accuracy:** 88.89%
- **Precision:** 89.85%
- **Recall:** 88.89%
- **F1-Score:** 88.45%
- **Status:** ✅ Good - Production ready

## Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

**Required packages:**
- `sentence-transformers` - For embeddings model
- `transformers` - For intent classifier
- `torch` - PyTorch backend
- `datasets` - Data handling
- `scikit-learn` - Evaluation metrics

### 2. Prepare Training Data

```bash
python scripts/prepare_training_data.py
```

This extracts data from `mockData.ts` and creates:
- `training_data/embedding_pairs.json` - Embedding training pairs
- `training_data/intent_data.json` - Intent classification examples

### 3. Train Models

**Train all models:**
```bash
python scripts/train_models.py --model all
```

**Train individual models:**
```bash
# Embeddings model (recommended first)
python scripts/train_models.py --model embeddings

# Intent classifier
python scripts/train_models.py --model intent
```

### 4. Evaluate Models

```bash
python scripts/evaluate_models.py
```

This generates:
- Console output with metrics
- `evaluation_results.json` - Detailed results

## Model Details

### Semantic Embeddings Model

**Purpose:** Semantic similarity search for destinations, itineraries, and guides

**Architecture:**
- Base: `sentence-transformers/all-MiniLM-L6-v2`
- Fine-tuned on heritage tourism data
- Output: 384-dimensional embeddings

**Training:**
- Method: Contrastive learning (positive/negative pairs)
- Epochs: 3-5
- Batch size: 16
- Learning rate: 2e-5

**Usage:**
```typescript
import { getEmbedding, cosineSimilarity } from './lib/services/embeddingService';

const queryEmbedding = await getEmbedding("heritage sites");
const docEmbedding = await getEmbedding("Victoria Memorial description");
const similarity = cosineSimilarity(queryEmbedding, docEmbedding);
```

### Intent Classification Model

**Purpose:** Classify user queries into predefined intents

**Architecture:**
- Base: `distilbert-base-uncased`
- Fine-tuned for travel domain
- Output: Multi-class classification (8-10 intents)

**Intents:**
- `plan_itinerary` - Planning trips
- `book_guide` - Booking guides
- `find_heritage` - Finding heritage sites
- `budget_question` - Budget queries
- `general_chat` - General conversation
- And more...

**Training:**
- Method: Supervised classification
- Epochs: 5-10
- Batch size: 16
- Learning rate: 2e-5

**Usage:**
```typescript
import { intentClassifier } from './lib/services/intentClassifier';

const result = await intentClassifier.classify("Plan a 3-day tour");
// Returns: { intent: "plan_itinerary", confidence: 0.95, entities: {...} }
```

## Training Data Format

### Embeddings Training Data

```json
{
  "query": "heritage sites in Kolkata",
  "document": "Victoria Memorial is a historical monument...",
  "label": 1.0
}
```

- `label: 1.0` = Relevant (positive pair)
- `label: 0.0` = Not relevant (negative pair)

### Intent Training Data

```json
{
  "text": "I want to book a guide",
  "intent": "book_guide"
}
```

## Evaluation Metrics

### Embeddings Model

- **Accuracy:** Threshold-based classification accuracy
- **Precision:** True positives / (True positives + False positives)
- **Recall:** True positives / (True positives + False negatives)
- **F1-Score:** Harmonic mean of precision and recall
- **Separation:** Average positive similarity - Average negative similarity

### Intent Classifier

- **Accuracy:** Overall classification accuracy
- **Precision (weighted):** Average precision across all classes
- **Recall (weighted):** Average recall across all classes
- **F1-Score (weighted):** Average F1-score across all classes
- **Confusion Matrix:** Per-class performance breakdown

## Model Files

### Embeddings Model
```
models/heritage-embeddings/
├── config.json
├── tokenizer.json
├── model.safetensors
└── ...
```

### Intent Classifier
```
models/intent-classifier/
├── config.json
├── tokenizer.json
├── pytorch_model.bin
├── intent_mapping.json
└── ...
```

## Integration

### Frontend Integration

Models are used through:
- `src/lib/services/embeddingService.ts` - Embeddings
- `src/lib/services/intentClassifier.ts` - Intent classification
- `src/lib/services/hybridAIService.ts` - Combined pipeline

### Backend Integration

Models can be served via:
- `backend/src/routes/mlRoutes.ts` - ML API endpoints
- `backend/src/services/mlModels.ts` - Model loading service

## Retraining

### When to Retrain

- New destinations/itineraries added
- User feedback indicates poor performance
- New intents need to be supported
- Performance metrics drop below thresholds

### Retraining Process

1. Update `mockData.ts` with new data
2. Run `prepare_training_data.py` to regenerate training data
3. Train models with updated data
4. Evaluate new models
5. Compare with previous metrics
6. Deploy if improved

## Performance Optimization

### For Production

1. **Cache embeddings** - Pre-compute embeddings for destinations
2. **Batch inference** - Process multiple queries together
3. **Model quantization** - Reduce model size for faster inference
4. **GPU acceleration** - Use GPU if available

### Expected Performance

- **Embeddings inference:** < 50ms per query
- **Intent classification:** < 100ms per query
- **Full pipeline:** < 500ms end-to-end

## Troubleshooting

### Issue: Low accuracy
**Solution:**
- Add more training data
- Increase training epochs
- Check data quality
- Try different learning rates

### Issue: Slow inference
**Solution:**
- Use smaller batch sizes
- Enable model caching
- Consider model quantization
- Use GPU if available

### Issue: Model not loading
**Solution:**
- Check model files exist
- Verify file paths
- Check model format compatibility
- Re-download base models

## Related Files

- `scripts/train_models.py` - Training script
- `scripts/evaluate_models.py` - Evaluation script
- `scripts/prepare_training_data.py` - Data preparation
- `src/lib/services/embeddingService.ts` - Embeddings service
- `src/lib/services/intentClassifier.ts` - Intent classifier
- `evaluation_results.json` - Latest evaluation results

---

**Last Updated:** December 2024  
**Status:** ✅ Models trained and evaluated






