# Opportunity Detector Microservice

## Purpose

The Opportunity Detector microservice identifies potential opportunities, investment signals, and actionable insights from the aggregated data across news, sentiment, trends, and onchain activity. It uses AI to detect patterns that indicate opportunities for content creation, research, or strategic insights.

## API

### Endpoints

- `GET /health` - Health check
- `GET /api/v1/opportunities` - Get detected opportunities
- `GET /api/v1/opportunities/:id` - Get opportunity details
- `POST /api/v1/detect` - Trigger opportunity detection

## Architecture

### Key Components

1. **Pattern Matcher**: Matches patterns against opportunity templates
2. **AI Analyzer**: Uses LLM to identify opportunities
3. **Scoring Engine**: Scores opportunities by relevance and potential
4. **Alert System**: Generates alerts for high-value opportunities

## Dependencies

- **Supabase Postgres**: Store opportunities
- **Redis**: Cache and job queue
- **OpenAI/Anthropic**: LLM for opportunity detection
- **n8n**: Event consumption and publishing

## Independence Rules

- No direct imports from other microservices
- Communication via HTTP and n8n events only
- Stateless and horizontally scalable

## Event Flow

### Input Events

Consumes from n8n:
- `trend.detected` - Analyze for opportunities
- `onchain.event.detected` - Check for opportunity signals
- `sentiment.analyzed` - Use sentiment context

### Output Events

Publishes to n8n:
```json
{
  "event": "opportunity.detected",
  "data": {
    "opportunityId": "uuid",
    "type": "content_idea",
    "score": 0.92,
    "description": "...",
    "relatedData": {}
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
   cd services/opportunity-detector-ms
   cp .env.example .env
   # Modifica .env con i tuoi valori
   ```

### Avvio

```bash
# Dalla cartella del microservizio
cd services/opportunity-detector-ms
pnpm dev

# Oppure dalla root usando pnpm filter
pnpm --filter opportunity-detector-ms dev
```

Il servizio sarà disponibile su `http://localhost:3005
6379`

### Health Check

```bash
curl http://localhost:3005
6379/health
```

## Run with Docker (dev/prod)

### Sviluppo

```bash
cd services/opportunity-detector-ms

# Build dell'immagine dev
docker build -f Dockerfile.dev -t houseblock/opportunity-detector-ms-dev .

# Avvio container
docker run --env-file .env.local -p 3005
6379:3005
6379 houseblock/opportunity-detector-ms-dev
```

### Produzione

```bash
cd services/opportunity-detector-ms

# Build dell'immagine produzione
docker build -t houseblock/opportunity-detector-ms .

# Avvio container
docker run --env-file .env.production -p 3005
6379:3005
6379 houseblock/opportunity-detector-ms
```

## Environment Variables (.env.example)

Copia `.env.example` in `.env` e configura le variabili necessarie. Vedi `.env.example` per la lista completa.

## API Endpoints

- `GET /health` - Health check endpoint
- Altri endpoint da implementare (vedi TODO.md)

Vedi [COMMANDS.md](../../COMMANDS.md) per comandi completi e [DEPLOY.md](../../DEPLOY.md) per dettagli sul deploy.
