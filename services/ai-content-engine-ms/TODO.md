# AI Content Engine Microservice - Development TODO

## Development Phases

### Phase 1: Foundation
- [ ] Express.js server setup
- [ ] Supabase integration
- [ ] LLM API integrations (OpenAI, Anthropic, Gemini)
- [ ] Health check endpoint

### Phase 2: Prompt Management
- [ ] Integrate hb-shared-ai package
- [ ] Prompt loading system
- [ ] Prompt variable substitution
- [ ] Prompt versioning

### Phase 3: Content Generation
- [ ] Content generation engine
- [ ] Multi-LLM orchestration
- [ ] Content formatting
- [ ] Quality validation

### Phase 4: Templates & Styles
- [ ] Content templates
- [ ] Style definitions
- [ ] Platform-specific formatting

### Phase 5: Storage & API
- [ ] Database schema
- [ ] API endpoints
- [ ] Content caching

### Phase 6: Integration & Testing
- [ ] n8n integration
- [ ] Unit tests
- [ ] Integration tests

## Required Environment Variables

```bash
AI_CONTENT_ENGINE_PORT=3007
AI_CONTENT_ENGINE_REDIS_URL=redis://localhost:6379
AI_CONTENT_ENGINE_DEFAULT_MODEL=gpt-4-turbo-preview
AI_CONTENT_ENGINE_MAX_TOKENS=2000
OPENAI_API_KEY=...
ANTHROPIC_API_KEY=...
GOOGLE_AI_API_KEY=...
SUPABASE_URL=...
N8N_URL=...
```

## Scheduled Jobs

- **Content Quality Review** (daily): Review and score generated content
- **Cache Cleanup** (daily): Clean old cached content

## Postgres Tables

```sql
CREATE TABLE generated_content (
  id UUID PRIMARY KEY,
  content_type TEXT NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  style TEXT,
  metadata JSONB,
  quality_score DECIMAL(3,2),
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Technologies

- Node.js, Express, TypeScript
- OpenAI SDK, Anthropic SDK, Google AI SDK
- Supabase, Redis
- @houseblock/shared-ai package

## Tests

- LLM integration tests
- Content generation tests
- Prompt management tests
- Quality validation tests

