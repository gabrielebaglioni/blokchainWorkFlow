# Competitor Watchdog Microservice - Development TODO

## Development Phases

### Phase 1: Foundation
- [ ] Express.js server setup
- [ ] Supabase integration
- [ ] Health check endpoint

### Phase 2: Monitoring
- [ ] Competitor configuration
- [ ] Activity tracking
- [ ] Content scraping
- [ ] Change detection

### Phase 3: Analysis
- [ ] Content analysis
- [ ] Strategy detection
- [ ] Report generation

### Phase 4: Integration
- [ ] n8n integration
- [ ] API endpoints
- [ ] Testing

## Required Environment Variables

```bash
COMPETITOR_WATCHDOG_PORT=3006
COMPETITOR_WATCHDOG_REDIS_URL=redis://localhost:6379
SUPABASE_URL=...
N8N_URL=...
```

## Scheduled Jobs

- **Activity Monitoring** (every 4 hours): Check for new activities
- **Change Detection** (daily): Detect strategy changes

## Postgres Tables

```sql
CREATE TABLE competitors (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  platforms TEXT[],
  monitoring_config JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE competitor_activities (
  id UUID PRIMARY KEY,
  competitor_id UUID REFERENCES competitors(id),
  activity_type TEXT NOT NULL,
  content TEXT,
  platform TEXT,
  detected_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Technologies

- Node.js, Express, TypeScript
- Supabase, Redis
- Web scraping tools

## Tests

- Monitoring tests
- Change detection tests
- Integration tests

