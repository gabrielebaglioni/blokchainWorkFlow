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


## Requirements

- Node.js 18+
- pnpm 8+
- Docker (opzionale, per containerizzazione)
- Supabase account (o PostgreSQL locale)
- Redis (opzionale, per caching)

## Run Locally (pnpm dev)

### Prerequisiti

1. Installa le dipendenze dalla root della monorepo:
   ```bash
   pnpm install
   ```

2. Configura le variabili d'ambiente:
   ```bash
   cd services/utility-layer/telemetry-logger-ms
   cp .env.example .env
   # Modifica .env con i tuoi valori
   ```

### Avvio

```bash
# Dalla cartella del microservizio
cd services/utility-layer/telemetry-logger-ms
pnpm dev

# Oppure dalla root usando pnpm filter
pnpm --filter telemetry-logger-ms dev
```

Il servizio sarà disponibile su `http://localhost:3012
6379`

### Health Check

```bash
curl http://localhost:3012
6379/health
```

## Run with Docker (dev/prod)

### Sviluppo

```bash
cd services/utility-layer/telemetry-logger-ms

# Build dell'immagine dev
docker build -f Dockerfile.dev -t houseblock/telemetry-logger-ms-dev .

# Avvio container
docker run --env-file .env.local -p 3012
6379:3012
6379 houseblock/telemetry-logger-ms-dev
```

### Produzione

```bash
cd services/utility-layer/telemetry-logger-ms

# Build dell'immagine produzione
docker build -t houseblock/telemetry-logger-ms .

# Avvio container
docker run --env-file .env.production -p 3012
6379:3012
6379 houseblock/telemetry-logger-ms
```

## Environment Variables (.env.example)

Copia `.env.example` in `.env` e configura le variabili necessarie. Vedi `.env.example` per la lista completa.

## API Endpoints

- `GET /health` - Health check endpoint
- Altri endpoint da implementare (vedi TODO.md)

Vedi [COMMANDS.md](../../COMMANDS.md) per comandi completi e [DEPLOY.md](../../DEPLOY.md) per dettagli sul deploy.
