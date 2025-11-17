# Trend Analyzer Microservice

## Purpose

The Trend Analyzer microservice identifies patterns, trends, and correlations across multiple data sources (news articles, sentiment data, onchain events, social media). It provides trend detection, anomaly identification, and predictive insights to help understand emerging patterns in the Web3 ecosystem.

## API

### Endpoints

- `GET /health` - Health check
- `GET /api/v1/trends` - Get detected trends
- `GET /api/v1/trends/:id` - Get specific trend details
- `GET /api/v1/anomalies` - Get detected anomalies
- `POST /api/v1/analyze` - Trigger trend analysis

## Architecture

### Key Components

1. **Pattern Detector**: Identifies patterns in time series data
2. **Correlation Engine**: Finds correlations between different data sources
3. **Anomaly Detector**: Detects unusual patterns or outliers
4. **Trend Calculator**: Calculates trend direction and strength

## Dependencies

- **Supabase Postgres**: Store trends and analysis results
- **Redis**: Cache and time series data
- **n8n**: Event consumption and publishing

## Independence Rules

- No direct imports from other microservices
- Communication via HTTP and n8n events only
- Stateless and horizontally scalable

## Event Flow

### Input Events

Consumes from n8n:
- `article.scraped` - Include in trend analysis
- `sentiment.analyzed` - Use sentiment data
- `onchain.event.detected` - Include onchain events

### Output Events

Publishes to n8n:
```json
{
  "event": "trend.detected",
  "data": {
    "trendId": "uuid",
    "type": "rising",
    "category": "defi",
    "strength": 0.85,
    "dataPoints": []
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
   cd services/trend-analyzer-ms
   cp .env.example .env
   # Modifica .env con i tuoi valori
   ```

### Avvio

```bash
# Dalla cartella del microservizio
cd services/trend-analyzer-ms
pnpm dev

# Oppure dalla root usando pnpm filter
pnpm --filter trend-analyzer-ms dev
```

Il servizio sarà disponibile su `http://localhost:3004
6379`

### Health Check

```bash
curl http://localhost:3004
6379/health
```

## Run with Docker (dev/prod)

### Sviluppo

```bash
cd services/trend-analyzer-ms

# Build dell'immagine dev
docker build -f Dockerfile.dev -t houseblock/trend-analyzer-ms-dev .

# Avvio container
docker run --env-file .env.local -p 3004
6379:3004
6379 houseblock/trend-analyzer-ms-dev
```

### Produzione

```bash
cd services/trend-analyzer-ms

# Build dell'immagine produzione
docker build -t houseblock/trend-analyzer-ms .

# Avvio container
docker run --env-file .env.production -p 3004
6379:3004
6379 houseblock/trend-analyzer-ms
```

## Environment Variables (.env.example)

Copia `.env.example` in `.env` e configura le variabili necessarie. Vedi `.env.example` per la lista completa.

## API Endpoints

- `GET /health` - Health check endpoint
- Altri endpoint da implementare (vedi TODO.md)

Vedi [COMMANDS.md](../../COMMANDS.md) per comandi completi e [DEPLOY.md](../../DEPLOY.md) per dettagli sul deploy.
