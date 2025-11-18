# Competitor Watchdog Microservice

## Purpose

The Competitor Watchdog microservice monitors competitor activities, content, and strategies across various platforms. It tracks competitor publications, social media activity, and strategic moves to provide competitive intelligence for content strategy and positioning.

## API

### Endpoints

- `GET /health` - Health check
- `GET /api/v1/competitors` - List monitored competitors
- `GET /api/v1/activities` - Get competitor activities
- `POST /api/v1/monitor` - Add competitor to monitor

## Architecture

### Key Components

1. **Activity Tracker**: Tracks competitor activities
2. **Content Analyzer**: Analyzes competitor content
3. **Change Detector**: Detects changes in competitor strategies
4. **Report Generator**: Generates competitive intelligence reports

## Dependencies

- **Supabase Postgres**: Store competitor data
- **Redis**: Cache and job queue
- **n8n**: Event consumption and publishing
- **External APIs**: Social media APIs, RSS feeds

## Independence Rules

- No direct imports from other microservices
- Communication via HTTP and n8n events only
- Stateless and horizontally scalable

## Event Flow

### Input Events

- Manual monitoring requests
- Scheduled monitoring jobs

### Output Events

Publishes to n8n:
```json
{
  "event": "competitor.activity.detected",
  "data": {
    "competitorId": "uuid",
    "activityType": "post",
    "content": "...",
    "detectedAt": "2024-01-15T10:00:00Z"
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
   cd services/ai-layer/competitor-watchdog-ms
   cp .env.example .env
   # Modifica .env con i tuoi valori
   ```

### Avvio

```bash
# Dalla cartella del microservizio
cd services/ai-layer/competitor-watchdog-ms
pnpm dev

# Oppure dalla root usando pnpm filter
pnpm --filter competitor-watchdog-ms dev
```

Il servizio sarà disponibile su `http://localhost:3006
6379`

### Health Check

```bash
curl http://localhost:3006
6379/health
```

## Run with Docker (dev/prod)

### Sviluppo

```bash
cd services/ai-layer/competitor-watchdog-ms

# Build dell'immagine dev
docker build -f Dockerfile.dev -t houseblock/competitor-watchdog-ms-dev .

# Avvio container
docker run --env-file .env.local -p 3006
6379:3006
6379 houseblock/competitor-watchdog-ms-dev
```

### Produzione

```bash
cd services/ai-layer/competitor-watchdog-ms

# Build dell'immagine produzione
docker build -t houseblock/competitor-watchdog-ms .

# Avvio container
docker run --env-file .env.production -p 3006
6379:3006
6379 houseblock/competitor-watchdog-ms
```

## Environment Variables (.env.example)

Copia `.env.example` in `.env` e configura le variabili necessarie. Vedi `.env.example` per la lista completa.

## API Endpoints

- `GET /health` - Health check endpoint
- Altri endpoint da implementare (vedi TODO.md)

Vedi [COMMANDS.md](../../COMMANDS.md) per comandi completi e [DEPLOY.md](../../DEPLOY.md) per dettagli sul deploy.
