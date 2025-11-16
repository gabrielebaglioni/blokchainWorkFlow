# Visual Generator Microservice - Development TODO

## Development Phases

### Phase 1: Foundation
- [ ] Express.js server setup
- [ ] Supabase integration (Postgres + Storage)
- [ ] Image generation API integrations
- [ ] Health check endpoint

### Phase 2: Image Generation
- [ ] DALL-E integration
- [ ] Stable Diffusion integration
- [ ] Prompt engineering for visuals
- [ ] Style system

### Phase 3: Image Processing
- [ ] Image optimization
- [ ] Format conversion
- [ ] Resizing and cropping
- [ ] Quality enhancement

### Phase 4: Storage & Delivery
- [ ] Supabase Storage integration
- [ ] CDN configuration
- [ ] Image metadata storage

### Phase 5: Integration & Testing
- [ ] n8n integration
- [ ] Unit tests
- [ ] Integration tests

## Required Environment Variables

```bash
VISUAL_GENERATOR_PORT=3008
VISUAL_GENERATOR_REDIS_URL=redis://localhost:6379
VISUAL_GENERATOR_STORAGE_PATH=/tmp/visuals
VISUAL_GENERATOR_DEFAULT_STYLE=modern-minimal
VISUAL_GENERATOR_OPENAI_KEY=...
VISUAL_GENERATOR_STABILITY_API_KEY=...
SUPABASE_URL=...
SUPABASE_STORAGE_BUCKET=visuals
N8N_URL=...
```

## Scheduled Jobs

- **Storage Cleanup** (daily): Clean temporary files
- **Image Optimization** (daily): Re-optimize old images

## Postgres Tables

```sql
CREATE TABLE generated_visuals (
  id UUID PRIMARY KEY,
  prompt TEXT NOT NULL,
  style TEXT,
  storage_url TEXT NOT NULL,
  dimensions TEXT,
  metadata JSONB,
  generated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Technologies

- Node.js, Express, TypeScript
- OpenAI SDK (DALL-E), Stability AI SDK
- Sharp or ImageMagick for image processing
- Supabase Storage
- Redis

## Tests

- Image generation API tests
- Image processing tests
- Storage integration tests

