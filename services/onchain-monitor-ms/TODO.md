# Onchain Monitor Microservice - Development TODO

## Development Phases

### Phase 1: Foundation
- [ ] Express.js server setup
- [ ] Web3 provider integration (ethers.js or viem)
- [ ] Multi-chain RPC configuration
- [ ] Supabase integration
- [ ] Health check endpoint

### Phase 2: Event Monitoring
- [ ] Smart contract event listener
- [ ] Transaction monitoring
- [ ] Block monitoring
- [ ] Event filtering and parsing

### Phase 3: Storage
- [ ] Database schema for events
- [ ] Transaction storage
- [ ] Address monitoring configuration
- [ ] Indexing for queries

### Phase 4: Metrics
- [ ] Calculate onchain metrics
- [ ] Aggregate data over time
- [ ] Create metrics API endpoints

### Phase 5: Integration
- [ ] n8n event publishing
- [ ] Event processing pipeline
- [ ] Error handling

### Phase 6: Testing
- [ ] Unit tests
- [ ] Integration tests with testnet
- [ ] Performance testing

## Required Environment Variables

```bash
ONCHAIN_MONITOR_PORT=3003
ONCHAIN_MONITOR_REDIS_URL=redis://localhost:6379
ONCHAIN_MONITOR_POLL_INTERVAL=60000
ETHEREUM_RPC_URL=https://...
POLYGON_RPC_URL=https://...
ARBITRUM_RPC_URL=https://...
SUPABASE_URL=...
N8N_URL=...
```

## Scheduled Jobs

- **Event Polling** (every 60 seconds): Poll for new events
- **Metrics Calculation** (hourly): Calculate aggregated metrics
- **Cleanup** (daily): Archive old events

## Postgres Tables

```sql
CREATE TABLE onchain_events (
  id UUID PRIMARY KEY,
  chain TEXT NOT NULL,
  event_type TEXT NOT NULL,
  contract_address TEXT NOT NULL,
  block_number BIGINT NOT NULL,
  transaction_hash TEXT NOT NULL,
  event_data JSONB,
  detected_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE monitored_addresses (
  id UUID PRIMARY KEY,
  address TEXT NOT NULL,
  chain TEXT NOT NULL,
  monitor_type TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Technologies

- Node.js, Express, TypeScript
- ethers.js or viem for Web3
- Supabase, Redis
- node-cron for scheduling

## Tests

- Web3 provider integration tests
- Event parsing tests
- Database operations
- Multi-chain support tests

## Docker Healthcheck

Check `/health`, RPC provider connectivity, database, Redis.

