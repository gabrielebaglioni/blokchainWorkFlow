# Sentiment Tracker Microservice

## Purpose

The Sentiment Tracker microservice analyzes the emotional tone and sentiment of text content (articles, social media posts, onchain data descriptions) using AI/LLM models. It provides sentiment scores, emotional classification, and trend analysis to help understand the overall mood and perception in the Web3 ecosystem.

## API

### Endpoints

- `GET /health` - Health check endpoint
- `POST /api/v1/analyze` - Analyze sentiment of text content
  - Body: `{ "text": "content to analyze", "source": "article", "metadata": {} }`
  - Response: `{ "sentiment": "positive|negative|neutral", "score": 0.85, "emotions": [...], "confidence": 0.92 }`
- `GET /api/v1/sentiment/:id` - Get sentiment analysis by content ID
- `GET /api/v1/trends` - Get sentiment trends over time
  - Query parameters: `category`, `dateFrom`, `dateTo`, `groupBy` (hour|day|week)
- `POST /api/v1/batch-analyze` - Analyze multiple texts in batch

## Architecture

### Internal Structure

```
sentiment-tracker-ms/
├── src/
│   ├── index.ts
│   ├── server.ts
│   ├── routes/
│   ├── analyzers/
│   │   ├── llm-analyzer.ts      # LLM-based sentiment analysis
│   │   ├── rule-based.ts        # Fallback rule-based analysis
│   │   └── emotion-detector.ts   # Emotion classification
│   ├── storage/
│   │   └── sentiment-repository.ts
│   ├── processors/
│   │   └── event-processor.ts   # Process events from n8n
│   └── utils/
```

### Key Components

1. **LLM Analyzer**: Uses OpenAI/Anthropic for advanced sentiment analysis
2. **Emotion Detector**: Classifies specific emotions (joy, fear, anger, etc.)
3. **Trend Calculator**: Aggregates sentiment over time
4. **Event Processor**: Listens to n8n events for new content

## Dependencies

- **Supabase Postgres**: Store sentiment analysis results
- **Redis**: Cache analysis results, job queue
- **OpenAI/Anthropic**: LLM API for sentiment analysis
- **n8n**: Event consumption and publishing

## Independence Rules

- No direct imports from other microservices
- Communication via HTTP and n8n events only
- Uses shared packages only for types and config
- Stateless and horizontally scalable

## Event Flow

### Input Events

Consumes from n8n:
- `article.scraped` - Analyze sentiment of new articles
- `content.created` - Analyze any new content

### Output Events

Publishes to n8n:
```json
{
  "event": "sentiment.analyzed",
  "data": {
    "contentId": "uuid",
    "sentiment": "positive",
    "score": 0.85,
    "emotions": ["joy", "anticipation"]
  }
}
```

### Downstream Services

- **trend-analyzer-ms**: Uses sentiment data for trend analysis
- **ai-content-engine-ms**: Uses sentiment context for content generation
- **knowledge-base-ms**: Stores sentiment metadata

