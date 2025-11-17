# Social Publisher Microservice

## Purpose

The Social Publisher microservice publishes content to multiple social media platforms (Twitter/X, LinkedIn, Mastodon). It handles platform-specific formatting, scheduling, and manages publishing workflows across different social networks.

## API

### Endpoints

- `GET /health` - Health check
- `POST /api/v1/publish` - Publish content
  - Body: `{ "platform": "twitter|linkedin|mastodon", "content": "...", "media": [...] }`
- `GET /api/v1/posts` - Get published posts
- `POST /api/v1/schedule` - Schedule post for later

## Architecture

### Key Components

1. **Platform Adapters**: Platform-specific API integrations
2. **Content Formatter**: Formats content for each platform
3. **Scheduler**: Manages scheduled posts
4. **Analytics Tracker**: Tracks post performance

## Dependencies

- **Supabase Postgres**: Store published posts and schedules
- **Redis**: Job queue for scheduling
- **Twitter API, LinkedIn API, Mastodon API**: Social platform APIs
- **n8n**: Event consumption and publishing

## Independence Rules

- No direct imports from other microservices
- Communication via HTTP and n8n events only
- Stateless and horizontally scalable

## Event Flow

### Input Events

Consumes from n8n:
- `content.generated` - Publish generated content
- `visual.generated` - Include visual in post
- `video.generated` - Include video in post
- `publish.request` - Direct publishing request

### Output Events

Publishes to n8n:
```json
{
  "event": "content.published",
  "data": {
    "postId": "uuid",
    "platform": "twitter",
    "url": "https://twitter.com/...",
    "publishedAt": "2024-01-15T10:00:00Z"
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
   cd services/social-publisher-ms
   cp .env.example .env
   # Modifica .env con i tuoi valori
   ```

### Avvio

```bash
# Dalla cartella del microservizio
cd services/social-publisher-ms
pnpm dev

# Oppure dalla root usando pnpm filter
pnpm --filter social-publisher-ms dev
```

Il servizio sarà disponibile su `http://localhost:3010
6379`

### Health Check

```bash
curl http://localhost:3010
6379/health
```

## Run with Docker (dev/prod)

### Sviluppo

```bash
cd services/social-publisher-ms

# Build dell'immagine dev
docker build -f Dockerfile.dev -t houseblock/social-publisher-ms-dev .

# Avvio container
docker run --env-file .env.local -p 3010
6379:3010
6379 houseblock/social-publisher-ms-dev
```

### Produzione

```bash
cd services/social-publisher-ms

# Build dell'immagine produzione
docker build -t houseblock/social-publisher-ms .

# Avvio container
docker run --env-file .env.production -p 3010
6379:3010
6379 houseblock/social-publisher-ms
```

## Environment Variables (.env.example)

Copia `.env.example` in `.env` e configura le variabili necessarie. Vedi `.env.example` per la lista completa.

## API Endpoints

- `GET /health` - Health check endpoint
- Altri endpoint da implementare (vedi TODO.md)

Vedi [COMMANDS.md](../../COMMANDS.md) per comandi completi e [DEPLOY.md](../../DEPLOY.md) per dettagli sul deploy.
