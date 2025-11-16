# Telemetry Logger Microservice

## Purpose

The Telemetry Logger microservice is the central logging and observability system for HouseBlock. It receives, stores, and queries logs from all microservices, providing a unified view of system activity, errors, and performance metrics.

## API

### Endpoints

- `GET /health` - Health check
- `POST /api/v1/logs` - Ingest log entry
  - Body: `{ "service": "...", "level": "info|error|warn", "message": "...", "metadata": {} }`
- `GET /api/v1/logs` - Query logs
  - Query parameters: `service`, `level`, `dateFrom`, `dateTo`, `limit`
- `GET /api/v1/metrics` - Get aggregated metrics
- `GET /api/v1/services` - List all services sending logs

## Architecture

### Key Components

1. **Log Ingestion**: Receives logs from all services
2. **Log Storage**: Stores logs in Supabase with efficient indexing
3. **Query Engine**: Fast log queries and filtering
4. **Metrics Aggregator**: Calculates metrics from logs

## Dependencies

- **Supabase Postgres**: Store logs
- **Redis**: Cache and buffering
- **n8n**: Optional event publishing for alerts

## Independence Rules

- No direct imports from other microservices
- Communication via HTTP only
- Stateless and horizontally scalable
- Foundation service - must be available first

## Event Flow

### Input Events

Receives HTTP POST requests from all microservices:
```json
{
  "service": "news-scraper-ms",
  "level": "info",
  "message": "Scraped 10 new articles",
  "metadata": {
    "source": "Ethereum Blog",
    "duration": 1234
  },
  "timestamp": "2024-01-15T10:00:00Z"
}
```

### Output Events

Publishes to n8n for critical errors:
```json
{
  "event": "telemetry.critical.error",
  "data": {
    "service": "news-scraper-ms",
    "error": "...",
    "timestamp": "2024-01-15T10:00:00Z"
  }
}
```

