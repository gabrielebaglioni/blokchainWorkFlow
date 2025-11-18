# Trend Analyzer Microservice - Development TODO

## Development Phases

### Phase 1: Foundation
- [ ] Express.js server setup
- [ ] Supabase integration
- [ ] Redis time series setup
- [ ] Health check endpoint

### Phase 2: Data Aggregation
- [ ] Aggregate data from multiple sources
- [ ] Time series data processing
- [ ] Data normalization
- [ ] Window-based analysis

### Phase 3: Trend Detection
- [ ] Pattern recognition algorithms
- [ ] Trend direction calculation
- [ ] Trend strength scoring
- [ ] Correlation analysis

### Phase 4: Anomaly Detection
- [ ] Statistical anomaly detection
- [ ] Outlier identification
- [ ] Alert generation

### Phase 5: Storage & API
- [ ] Database schema for trends
- [ ] API endpoints
- [ ] Query optimization

### Phase 6: Integration & Testing
- [ ] n8n event integration
- [ ] Unit tests
- [ ] Integration tests

## Required Environment Variables

```bash
TREND_ANALYZER_PORT=3004
TREND_ANALYZER_REDIS_URL=redis://localhost:6379
TREND_ANALYZER_WINDOW_HOURS=24
SUPABASE_URL=...
N8N_URL=...
```

## Scheduled Jobs

- **Trend Analysis** (hourly): Analyze trends in last 24 hours
- **Anomaly Detection** (every 15 minutes): Check for anomalies
- **Data Cleanup** (daily): Archive old trend data

## Postgres Tables

```sql
CREATE TABLE trends (
  id UUID PRIMARY KEY,
  trend_type TEXT NOT NULL,
  category TEXT,
  direction TEXT NOT NULL, -- 'rising', 'falling', 'stable'
  strength DECIMAL(3,2) NOT NULL,
  data_points JSONB,
  detected_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);
```

## Technologies

- Node.js, Express, TypeScript
- Statistical libraries (simple-statistics)
- Supabase, Redis
- Time series analysis

## Tests

- Pattern detection tests
- Trend calculation tests
- Anomaly detection tests
- Integration tests

