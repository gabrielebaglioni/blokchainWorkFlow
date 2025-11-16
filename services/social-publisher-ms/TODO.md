# Social Publisher Microservice - Development TODO

## Development Phases

### Phase 1: Foundation
- [ ] Express.js server setup
- [ ] Supabase integration
- [ ] Health check endpoint

### Phase 2: Platform Integrations
- [ ] Twitter/X API integration
- [ ] LinkedIn API integration
- [ ] Mastodon API integration
- [ ] OAuth flow for each platform

### Phase 3: Publishing Engine
- [ ] Content formatting per platform
- [ ] Media upload handling
- [ ] Publishing workflow
- [ ] Error handling and retry

### Phase 4: Scheduling
- [ ] Job queue setup
- [ ] Scheduled post management
- [ ] Timezone handling

### Phase 5: Analytics
- [ ] Post tracking
- [ ] Performance metrics
- [ ] Analytics API

### Phase 6: Integration & Testing
- [ ] n8n integration
- [ ] Unit tests
- [ ] Integration tests

## Required Environment Variables

```bash
SOCIAL_PUBLISHER_PORT=3010
SOCIAL_PUBLISHER_REDIS_URL=redis://localhost:6379
TWITTER_API_KEY=...
TWITTER_API_SECRET=...
TWITTER_ACCESS_TOKEN=...
TWITTER_ACCESS_TOKEN_SECRET=...
LINKEDIN_CLIENT_ID=...
LINKEDIN_CLIENT_SECRET=...
LINKEDIN_ACCESS_TOKEN=...
MASTODON_INSTANCE=https://mastodon.social
MASTODON_ACCESS_TOKEN=...
SUPABASE_URL=...
N8N_URL=...
```

## Scheduled Jobs

- **Scheduled Posts** (every minute): Check and publish scheduled posts
- **Analytics Update** (hourly): Update post analytics

## Postgres Tables

```sql
CREATE TABLE published_posts (
  id UUID PRIMARY KEY,
  platform TEXT NOT NULL,
  content TEXT NOT NULL,
  post_url TEXT,
  platform_post_id TEXT,
  published_at TIMESTAMPTZ,
  scheduled_for TIMESTAMPTZ,
  status TEXT NOT NULL, -- 'pending', 'published', 'failed'
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Technologies

- Node.js, Express, TypeScript
- Twitter API v2, LinkedIn API, Mastodon API
- Supabase, Redis
- node-cron for scheduling

## Tests

- Platform API integration tests
- Publishing workflow tests
- Scheduling tests

