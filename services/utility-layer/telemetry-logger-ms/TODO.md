# Telemetry Logger Microservice - Development TODO

## Development Phases

### Phase 1: Foundation (CRITICAL - Build First)
- [ ] Express.js server setup
- [ ] Supabase integration
- [ ] Health check endpoint
- [ ] Basic log ingestion endpoint

### Phase 2: Log Storage
- [ ] Database schema for logs
- [ ] Efficient indexing strategy
- [ ] Log partitioning (by date)
- [ ] Retention policy

### Phase 3: Query Engine
- [ ] Log query API
- [ ] Filtering and search
- [ ] Pagination
- [ ] Performance optimization

### Phase 4: Metrics
- [ ] Metrics calculation
- [ ] Aggregation queries
- [ ] Service health tracking

### Phase 5: Integration
- [ ] n8n integration for alerts
- [ ] Grafana integration (optional)
- [ ] Testing

## Required Environment Variables

```bash
TELEMETRY_LOGGER_PORT=3012
TELEMETRY_LOGGER_REDIS_URL=redis://localhost:6379
TELEMETRY_LOGGER_RETENTION_DAYS=90
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
N8N_URL=...
```

## Scheduled Jobs

- **Log Cleanup** (daily): Archive/delete logs older than retention period
- **Metrics Calculation** (hourly): Calculate aggregated metrics
- **Health Check** (every 5 minutes): Check service health

## Postgres Tables

```sql
CREATE TABLE telemetry_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service TEXT NOT NULL,
  level TEXT NOT NULL, -- 'info', 'error', 'warn', 'debug'
  message TEXT NOT NULL,
  metadata JSONB,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_telemetry_service ON telemetry_logs(service);
CREATE INDEX idx_telemetry_level ON telemetry_logs(level);
CREATE INDEX idx_telemetry_timestamp ON telemetry_logs(timestamp DESC);
CREATE INDEX idx_telemetry_service_timestamp ON telemetry_logs(service, timestamp DESC);
```

## Technologies

- Node.js, Express, TypeScript
- Supabase Postgres
- Redis for buffering
- Fast query optimization

## Tests

- Log ingestion tests
- Query performance tests
- Metrics calculation tests
- Load testing (high volume log ingestion)

## Docker Healthcheck

Critical service - must be highly available. Health check should verify:
- Database connectivity
- Query performance
- Storage capacity

