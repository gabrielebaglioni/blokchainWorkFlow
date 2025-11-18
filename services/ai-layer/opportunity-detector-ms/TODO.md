# Opportunity Detector Microservice - Development TODO

## Development Phases

### Phase 1: Foundation
- [ ] Express.js server setup
- [ ] Supabase integration
- [ ] LLM API integration
- [ ] Health check endpoint

### Phase 2: Detection Engine
- [ ] Opportunity pattern templates
- [ ] LLM prompt engineering
- [ ] Scoring algorithm
- [ ] Relevance filtering

### Phase 3: Storage & API
- [ ] Database schema
- [ ] API endpoints
- [ ] Query optimization

### Phase 4: Integration
- [ ] n8n event integration
- [ ] Alert system
- [ ] Testing

## Required Environment Variables

```bash
OPPORTUNITY_DETECTOR_PORT=3005
OPPORTUNITY_DETECTOR_REDIS_URL=redis://localhost:6379
OPENAI_API_KEY=...
SUPABASE_URL=...
N8N_URL=...
```

## Scheduled Jobs

- **Opportunity Detection** (hourly): Analyze data for opportunities
- **Score Recalculation** (daily): Recalculate opportunity scores

## Postgres Tables

```sql
CREATE TABLE opportunities (
  id UUID PRIMARY KEY,
  opportunity_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  score DECIMAL(3,2) NOT NULL,
  status TEXT NOT NULL, -- 'new', 'reviewed', 'acted_upon'
  related_data JSONB,
  detected_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Technologies

- Node.js, Express, TypeScript
- OpenAI/Anthropic SDK
- Supabase, Redis

## Tests

- Detection algorithm tests
- Scoring tests
- LLM integration tests

