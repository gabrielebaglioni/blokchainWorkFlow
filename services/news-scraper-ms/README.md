# News Scraper Microservice

## Purpose

The News Scraper microservice is responsible for collecting news articles, blog posts, and updates from various sources in the Web3 and blockchain ecosystem. It serves as a primary data input for the HouseBlock system, feeding the AI layer with fresh content for analysis and content generation.

## API

### Endpoints

- `GET /health` - Health check endpoint
- `GET /api/v1/articles` - Retrieve scraped articles
  - Query parameters:
    - `limit` (number): Maximum number of articles to return (default: 50)
    - `offset` (number): Pagination offset (default: 0)
    - `source` (string): Filter by source (optional)
    - `dateFrom` (ISO date): Filter articles from date (optional)
    - `dateTo` (ISO date): Filter articles to date (optional)
- `POST /api/v1/scrape` - Trigger manual scraping job
  - Body: `{ "sources": ["rss-feed-url-1", "rss-feed-url-2"] }`
- `GET /api/v1/sources` - List configured RSS sources
- `POST /api/v1/sources` - Add new RSS source
  - Body: `{ "url": "https://...", "name": "Source Name", "category": "ethereum" }`

### Response Format

```typescript
{
  "id": "article-uuid",
  "title": "Article Title",
  "content": "Article content...",
  "url": "https://source.com/article",
  "source": "Ethereum Blog",
  "publishedAt": "2024-01-15T10:00:00Z",
  "scrapedAt": "2024-01-15T10:05:00Z",
  "category": "ethereum",
  "tags": ["defi", "scaling"]
}
```

## Architecture

### Internal Structure

```
news-scraper-ms/
├── src/
│   ├── index.ts              # Entry point
│   ├── server.ts             # Express server setup
│   ├── routes/               # API routes
│   ├── scrapers/             # Scraper implementations
│   │   ├── rss-scraper.ts
│   │   └── web-scraper.ts
│   ├── storage/              # Database operations
│   │   └── article-repository.ts
│   ├── scheduler/            # Job scheduling
│   │   └── cron-jobs.ts
│   └── utils/                # Utilities
│       ├── deduplication.ts
│       └── content-parser.ts
├── __tests__/
└── docs/
```

### Key Components

1. **RSS Scraper**: Parses RSS/Atom feeds from configured sources
2. **Web Scraper**: Fallback for sources without RSS feeds (optional)
3. **Deduplication Engine**: Prevents duplicate articles using content hashing
4. **Content Parser**: Extracts and cleans article content
5. **Scheduler**: Runs periodic scraping jobs via cron
6. **Storage Layer**: Persists articles to Supabase Postgres

## Dependencies

### External Services

- **Supabase Postgres**: Article storage and retrieval
- **Redis**: Caching and job queue management
- **n8n**: Event publishing for scraped articles

### Internal Communication

- Publishes events to n8n when new articles are scraped
- Events trigger downstream services (sentiment-tracker, trend-analyzer)

## Independence Rules

- **No direct imports** from other microservices
- **Communication via HTTP only** - uses n8n webhooks for event publishing
- **Self-contained** - all dependencies are external services or shared packages
- **Stateless** - can be scaled horizontally
- **Database isolation** - uses dedicated tables in shared Supabase instance

## Event Flow

### Input Events

- Scheduled cron jobs trigger scraping
- Manual API calls trigger immediate scraping
- n8n workflows can trigger scraping on demand

### Output Events

When new articles are scraped, publishes to n8n:

```json
{
  "event": "article.scraped",
  "timestamp": "2024-01-15T10:05:00Z",
  "data": {
    "articleId": "uuid",
    "title": "Article Title",
    "source": "Ethereum Blog",
    "category": "ethereum",
    "publishedAt": "2024-01-15T10:00:00Z"
  }
}
```

### Downstream Services

Events are consumed by:
- **sentiment-tracker-ms**: Analyzes sentiment of new articles
- **trend-analyzer-ms**: Includes articles in trend analysis
- **knowledge-base-ms**: Stores articles for semantic search

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
   cd services/news-scraper-ms
   cp .env.example .env
   # Modifica .env con i tuoi valori
   ```

### Avvio

```bash
# Dalla cartella del microservizio
cd services/news-scraper-ms
pnpm dev

# Oppure dalla root usando pnpm filter
pnpm --filter news-scraper-ms dev
```

Il servizio sarà disponibile su `http://localhost:3001`

### Health Check

```bash
curl http://localhost:3001/health
```

## Run with Docker (dev/prod)

### Sviluppo

```bash
cd services/news-scraper-ms

# Build dell'immagine dev
docker build -f Dockerfile.dev -t houseblock/news-scraper-ms-dev .

# Avvio container
docker run --env-file .env.local -p 3001:3001 houseblock/news-scraper-ms-dev
```

### Produzione

```bash
cd services/news-scraper-ms

# Build dell'immagine produzione
docker build -t houseblock/news-scraper-ms .

# Avvio container
docker run --env-file .env.production -p 3001:3001 houseblock/news-scraper-ms
```

## Environment Variables (.env.example)

Copia `.env.example` in `.env` e configura:

- `PORT`: Porta del servizio (default: 3001)
- `NODE_ENV`: Ambiente (development/production)
- `SUPABASE_URL`: URL del progetto Supabase
- `SUPABASE_ANON_KEY`: Chiave anonima Supabase
- `SUPABASE_SERVICE_ROLE_KEY`: Chiave service role Supabase
- `REDIS_HOST`: Host Redis (opzionale)
- `REDIS_PORT`: Porta Redis (opzionale)
- `N8N_WEBHOOK_URL`: URL webhook n8n per pubblicare eventi
- `RSS_SOURCES`: URL RSS sources (comma-separated)

Vedi `.env.example` per la lista completa.

## Deployment

- Containerized with Docker
- Health check endpoint required for orchestration
- Environment variables must be configured
- Database migrations run on startup

Vedi [DEPLOY.md](../../DEPLOY.md) per dettagli completi sul deploy.

