# Knowledge Base Microservice

## Purpose

The Knowledge Base microservice stores, indexes, and retrieves information using vector embeddings and semantic search. It acts as the long-term memory of the HouseBlock system, enabling semantic search across all collected and generated content.

## API

### Endpoints

- `GET /health` - Health check
- `POST /api/v1/store` - Store content in knowledge base
  - Body: `{ "content": "...", "metadata": {}, "type": "article" }`
- `POST /api/v1/search` - Semantic search
  - Body: `{ "query": "...", "limit": 10, "threshold": 0.7 }`
- `GET /api/v1/entries/:id` - Get knowledge base entry

## Architecture

### Key Components

1. **Embedding Generator**: Generates vector embeddings using OpenAI/other models
2. **Vector Store**: Stores embeddings in Supabase vector extension
3. **Search Engine**: Performs semantic similarity search
4. **Content Indexer**: Indexes content with metadata

## Dependencies

- **Supabase Postgres**: Vector database with pgvector extension
- **Redis**: Cache search results
- **OpenAI**: Embedding generation API
- **n8n**: Event consumption

## Independence Rules

- No direct imports from other microservices
- Communication via HTTP and n8n events only
- Stateless and horizontally scalable

## Event Flow

### Input Events

Consumes from n8n:
- `article.scraped` - Store articles
- `content.generated` - Store generated content
- `onchain.event.detected` - Store onchain events

### Output Events

Publishes to n8n:
```json
{
  "event": "knowledge.stored",
  "data": {
    "entryId": "uuid",
    "type": "article",
    "storedAt": "2024-01-15T10:00:00Z"
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
   cd services/knowledge-base-ms
   cp .env.example .env
   # Modifica .env con i tuoi valori
   ```

### Avvio

```bash
# Dalla cartella del microservizio
cd services/knowledge-base-ms
pnpm dev

# Oppure dalla root usando pnpm filter
pnpm --filter knowledge-base-ms dev
```

Il servizio sarà disponibile su `http://localhost:3011
6379`

### Health Check

```bash
curl http://localhost:3011
6379/health
```

## Run with Docker (dev/prod)

### Sviluppo

```bash
cd services/knowledge-base-ms

# Build dell'immagine dev
docker build -f Dockerfile.dev -t houseblock/knowledge-base-ms-dev .

# Avvio container
docker run --env-file .env.local -p 3011
6379:3011
6379 houseblock/knowledge-base-ms-dev
```

### Produzione

```bash
cd services/knowledge-base-ms

# Build dell'immagine produzione
docker build -t houseblock/knowledge-base-ms .

# Avvio container
docker run --env-file .env.production -p 3011
6379:3011
6379 houseblock/knowledge-base-ms
```

## Environment Variables (.env.example)

Copia `.env.example` in `.env` e configura le variabili necessarie. Vedi `.env.example` per la lista completa.

## API Endpoints

- `GET /health` - Health check endpoint
- Altri endpoint da implementare (vedi TODO.md)

Vedi [COMMANDS.md](../../COMMANDS.md) per comandi completi e [DEPLOY.md](../../DEPLOY.md) per dettagli sul deploy.
