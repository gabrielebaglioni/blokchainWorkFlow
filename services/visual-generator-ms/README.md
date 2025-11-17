# Visual Generator Microservice

## Purpose

The Visual Generator microservice creates images, graphics, and visual content using AI image generation models (DALL-E, Stable Diffusion, Midjourney) and design templates. It generates visuals to accompany articles, social media posts, and other content.

## API

### Endpoints

- `GET /health` - Health check
- `POST /api/v1/generate` - Generate visual
  - Body: `{ "prompt": "...", "style": "...", "dimensions": "1024x1024" }`
- `GET /api/v1/visuals/:id` - Get generated visual
- `POST /api/v1/improve` - Improve existing visual
- `GET /api/v1/styles` - List available styles

## Architecture

### Key Components

1. **Image Generator**: Interfaces with DALL-E, Stable Diffusion APIs
2. **Style Manager**: Manages visual styles and templates
3. **Image Processor**: Post-processes and optimizes images
4. **Storage Manager**: Manages image storage and CDN

## Dependencies

- **Supabase Postgres**: Store visual metadata
- **Supabase Storage**: Store generated images
- **Redis**: Cache and job queue
- **OpenAI/Stability AI**: Image generation APIs
- **n8n**: Event consumption and publishing

## Independence Rules

- No direct imports from other microservices
- Communication via HTTP and n8n events only
- Stateless and horizontally scalable

## Event Flow

### Input Events

Consumes from n8n:
- `content.generated` - Generate visual for content
- `visual.request` - Direct visual generation request

### Output Events

Publishes to n8n:
```json
{
  "event": "visual.generated",
  "data": {
    "visualId": "uuid",
    "url": "https://...",
    "style": "...",
    "metadata": {}
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
   cd services/visual-generator-ms
   cp .env.example .env
   # Modifica .env con i tuoi valori
   ```

### Avvio

```bash
# Dalla cartella del microservizio
cd services/visual-generator-ms
pnpm dev

# Oppure dalla root usando pnpm filter
pnpm --filter visual-generator-ms dev
```

Il servizio sarà disponibile su `http://localhost:3008
6379`

### Health Check

```bash
curl http://localhost:3008
6379/health
```

## Run with Docker (dev/prod)

### Sviluppo

```bash
cd services/visual-generator-ms

# Build dell'immagine dev
docker build -f Dockerfile.dev -t houseblock/visual-generator-ms-dev .

# Avvio container
docker run --env-file .env.local -p 3008
6379:3008
6379 houseblock/visual-generator-ms-dev
```

### Produzione

```bash
cd services/visual-generator-ms

# Build dell'immagine produzione
docker build -t houseblock/visual-generator-ms .

# Avvio container
docker run --env-file .env.production -p 3008
6379:3008
6379 houseblock/visual-generator-ms
```

## Environment Variables (.env.example)

Copia `.env.example` in `.env` e configura le variabili necessarie. Vedi `.env.example` per la lista completa.

## API Endpoints

- `GET /health` - Health check endpoint
- Altri endpoint da implementare (vedi TODO.md)

Vedi [COMMANDS.md](../../COMMANDS.md) per comandi completi e [DEPLOY.md](../../DEPLOY.md) per dettagli sul deploy.
