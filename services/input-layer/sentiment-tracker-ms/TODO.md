# Sentiment Tracker Microservice - Development TODO

## Development Phases

### Phase 1: Foundation
- [ ] Express.js server setup
- [ ] Supabase integration
- [ ] Redis integration
- [ ] Health check endpoint
- [ ] Logging to telemetry-logger-ms

### Phase 2: LLM Integration
- [ ] OpenAI API integration
- [ ] Anthropic API integration (fallback)
- [ ] Prompt engineering for sentiment analysis
- [ ] Response parsing and normalization
- [ ] Error handling and retry logic

### Phase 3: Analysis Engine
- [ ] Sentiment scoring algorithm
- [ ] Emotion classification
- [ ] Confidence calculation
- [ ] Batch processing support
- [ ] Caching strategy

### Phase 4: Storage & Retrieval
- [ ] Database schema for sentiment results
- [ ] Repository pattern implementation
- [ ] Trend calculation queries
- [ ] Indexing for performance

### Phase 5: Event Integration
- [ ] n8n webhook listener
- [ ] Event processing pipeline
- [ ] Event publishing
- [ ] Error handling and dead letter queue

### Phase 6: Testing & Documentation
- [ ] Unit tests
- [ ] Integration tests
- [ ] API documentation
- [ ] Performance testing

## Required Environment Variables

```bash
SENTIMENT_TRACKER_PORT=3002
SENTIMENT_TRACKER_REDIS_URL=redis://localhost:6379
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
N8N_URL=http://localhost:5678
```

## Scheduled Jobs

- **Trend Calculation** (hourly): Aggregate sentiment trends
- **Cache Cleanup** (daily): Clean old cached analyses

## Postgres Tables

```sql
CREATE TABLE sentiment_analyses (
  id UUID PRIMARY KEY,
  content_id UUID NOT NULL,
  content_type TEXT NOT NULL,
  sentiment TEXT NOT NULL, -- 'positive', 'negative', 'neutral'
  score DECIMAL(3,2) NOT NULL, -- -1.0 to 1.0
  confidence DECIMAL(3,2) NOT NULL,
  emotions TEXT[],
  metadata JSONB,
  analyzed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_sentiment_content_id ON sentiment_analyses(content_id);
CREATE INDEX idx_sentiment_analyzed_at ON sentiment_analyses(analyzed_at DESC);
```

## Technologies

- Node.js, Express, TypeScript
- OpenAI SDK, Anthropic SDK
- Supabase, Redis
- Jest for testing

## Tests

- LLM API integration tests
- Sentiment scoring tests
- Event processing tests
- Database operations tests

## Docker Healthcheck

Check `/health` endpoint, database, Redis, and LLM API connectivity.

