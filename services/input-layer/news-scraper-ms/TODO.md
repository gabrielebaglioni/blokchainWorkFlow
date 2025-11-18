# News Scraper Microservice - Development TODO

## Development Phases

### Phase 1: Foundation (Week 1)
- [ ] Set up Express.js server with TypeScript
- [ ] Configure environment variables and validation
- [ ] Set up Supabase client and connection
- [ ] Create database schema for articles table
- [ ] Implement health check endpoint
- [ ] Set up basic logging to telemetry-logger-ms
- [ ] Create Dockerfile and docker-compose configuration

### Phase 2: RSS Scraping (Week 1-2)
- [ ] Implement RSS/Atom feed parser
- [ ] Add support for multiple feed formats
- [ ] Create feed source configuration system
- [ ] Implement article content extraction
- [ ] Add content cleaning and normalization
- [ ] Store articles in Supabase
- [ ] Add basic error handling and retry logic

### Phase 3: Deduplication (Week 2)
- [ ] Implement content hashing for deduplication
- [ ] Create Redis-based duplicate detection
- [ ] Add URL-based duplicate checking
- [ ] Implement similarity matching (optional)
- [ ] Add deduplication metrics

### Phase 4: Scheduling (Week 2)
- [ ] Set up cron job scheduler
- [ ] Configure scraping intervals per source
- [ ] Implement job queue with Redis
- [ ] Add job status tracking
- [ ] Create manual trigger endpoint
- [ ] Add job history and logging

### Phase 5: Advanced Features (Week 3)
- [ ] Add web scraping fallback (Puppeteer/Playwright)
- [ ] Implement content quality scoring
- [ ] Add article categorization
- [ ] Create tag extraction system
- [ ] Implement rate limiting per source
- [ ] Add source health monitoring

### Phase 6: Integration (Week 3-4)
- [ ] Set up n8n webhook integration
- [ ] Implement event publishing for new articles
- [ ] Create event schema documentation
- [ ] Test integration with downstream services
- [ ] Add event retry logic
- [ ] Implement event batching for high volume

### Phase 7: Testing & Documentation (Week 4)
- [ ] Write unit tests (target: 80% coverage)
- [ ] Write integration tests
- [ ] Test error scenarios
- [ ] Load testing with multiple sources
- [ ] Update API documentation
- [ ] Create deployment guide

## Required Environment Variables

```bash
# Service Configuration
NEWS_SCRAPER_PORT=3001
NEWS_SCRAPER_REDIS_URL=redis://localhost:6379
NEWS_SCRAPER_USER_AGENT=HouseBlock-NewsScraper/1.0

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# n8n Integration
N8N_URL=http://localhost:5678
N8N_WEBHOOK_SECRET=your-webhook-secret

# RSS Feeds (comma-separated or JSON)
RSS_FEED_ETHEREUM=https://blog.ethereum.org/feed.xml
RSS_FEED_ETHEREUM_FOUNDATION=https://ethereum.org/en/blog/feed.xml
RSS_FEED_SOURCES='[{"url":"...","name":"...","category":"..."}]'

# Scraping Configuration
SCRAPING_INTERVAL_MINUTES=60
MAX_ARTICLES_PER_SOURCE=100
CONTENT_MIN_LENGTH=200
```

## Scheduled Jobs

### Cron Jobs

1. **RSS Feed Scraping** (every 60 minutes)
   - Iterate through configured RSS sources
   - Fetch and parse feeds
   - Extract new articles
   - Store in database
   - Publish events to n8n

2. **Deduplication Cleanup** (daily at 2 AM)
   - Clean old hash entries from Redis
   - Archive old articles (optional)
   - Update statistics

3. **Source Health Check** (every 30 minutes)
   - Check if sources are responding
   - Log failures
   - Alert if source is down for extended period

4. **Database Maintenance** (weekly)
   - Optimize database indexes
   - Clean up old articles (based on retention policy)
   - Generate statistics report

## Postgres Tables

### articles

```sql
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  url TEXT UNIQUE NOT NULL,
  source TEXT NOT NULL,
  source_url TEXT,
  published_at TIMESTAMPTZ,
  scraped_at TIMESTAMPTZ DEFAULT NOW(),
  category TEXT,
  tags TEXT[],
  content_hash TEXT UNIQUE NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX idx_articles_source ON articles(source);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_content_hash ON articles(content_hash);
CREATE INDEX idx_articles_scraped_at ON articles(scraped_at DESC);
```

### scraping_jobs

```sql
CREATE TABLE scraping_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL,
  status TEXT NOT NULL, -- 'pending', 'running', 'completed', 'failed'
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  articles_found INTEGER DEFAULT 0,
  articles_new INTEGER DEFAULT 0,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_scraping_jobs_status ON scraping_jobs(status);
CREATE INDEX idx_scraping_jobs_source ON scraping_jobs(source);
```

## Scripts to Write

1. **migrate.ts** - Database migration script
   - Create tables
   - Set up indexes
   - Seed initial RSS sources (optional)

2. **seed-sources.ts** - Seed RSS sources
   - Populate initial list of sources
   - Can be run manually or on first startup

3. **healthcheck.ts** - Health check script
   - Check database connection
   - Check Redis connection
   - Verify n8n webhook endpoint
   - Return exit code 0 if healthy, 1 if unhealthy

4. **test-scraper.ts** - Manual testing script
   - Test RSS feed parsing
   - Test content extraction
   - Test deduplication logic

## Technologies

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: Supabase Postgres (via @supabase/supabase-js)
- **Cache/Queue**: Redis (via ioredis)
- **HTTP Client**: axios or node-fetch
- **RSS Parser**: rss-parser or feedparser
- **Scheduling**: node-cron
- **Testing**: Jest, Supertest
- **Logging**: Winston or Pino (send to telemetry-logger-ms)

## Tests to Write

### Unit Tests

- [ ] RSS feed parser with various feed formats
- [ ] Content extraction and cleaning
- [ ] Deduplication logic (hash generation, comparison)
- [ ] Article repository (CRUD operations)
- [ ] Scheduler (cron job triggering)
- [ ] Event publishing to n8n

### Integration Tests

- [ ] Full scraping flow (RSS → parse → store → publish)
- [ ] Database operations (create, read, update)
- [ ] Redis operations (caching, deduplication)
- [ ] n8n webhook integration
- [ ] Error handling and retry logic

### E2E Tests

- [ ] Complete scraping job execution
- [ ] API endpoint testing
- [ ] Health check verification
- [ ] Event flow to downstream services

## Docker Healthcheck

```dockerfile
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node healthcheck.js || exit 1
```

The healthcheck script should:
1. Check Express server is responding on `/health`
2. Verify database connection
3. Verify Redis connection
4. Return exit code 0 if all checks pass

## Performance Considerations

- **Batch Processing**: Process multiple feeds in parallel
- **Caching**: Cache feed responses in Redis (TTL: 5 minutes)
- **Rate Limiting**: Respect source rate limits
- **Connection Pooling**: Use connection pools for database and Redis
- **Async Processing**: Use job queue for heavy operations
- **Memory Management**: Stream large responses, don't load everything in memory

## Security Considerations

- **Input Validation**: Validate all RSS feed URLs
- **Content Sanitization**: Sanitize scraped content to prevent XSS
- **Rate Limiting**: Implement rate limiting on API endpoints
- **Authentication**: Add API key authentication for manual triggers
- **Error Messages**: Don't expose internal errors to clients

## Monitoring & Observability

- **Metrics**: Track articles scraped, sources health, job success rate
- **Logging**: Log all scraping operations, errors, and events
- **Alerts**: Alert on source failures, high error rates, database issues
- **Dashboards**: Create Grafana dashboards for key metrics

