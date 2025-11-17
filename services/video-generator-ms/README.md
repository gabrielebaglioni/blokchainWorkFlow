# Video Generator Microservice

## Purpose

The Video Generator microservice creates video content from images, text, and audio. It generates short-form videos for social media, video summaries, and animated content using templates and AI-generated assets.

## API

### Endpoints

- `GET /health` - Health check
- `POST /api/v1/generate` - Generate video
  - Body: `{ "template": "...", "assets": [...], "duration": 60 }`
- `GET /api/v1/videos/:id` - Get generated video
- `GET /api/v1/templates` - List available templates

## Architecture

### Key Components

1. **Video Composer**: Composes videos from assets
2. **Template Engine**: Manages video templates
3. **FFmpeg Wrapper**: Handles video processing
4. **Asset Manager**: Manages video assets

## Dependencies

- **Supabase Postgres**: Store video metadata
- **Supabase Storage**: Store generated videos
- **Redis**: Cache and job queue
- **FFmpeg**: Video processing
- **n8n**: Event consumption and publishing

## Independence Rules

- No direct imports from other microservices
- Communication via HTTP and n8n events only
- Stateless and horizontally scalable

## Event Flow

### Input Events

Consumes from n8n:
- `content.generated` + `visual.generated` - Generate video from content
- `video.request` - Direct video generation request

### Output Events

Publishes to n8n:
```json
{
  "event": "video.generated",
  "data": {
    "videoId": "uuid",
    "url": "https://...",
    "duration": 60,
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
   cd services/video-generator-ms
   cp .env.example .env
   # Modifica .env con i tuoi valori
   ```

### Avvio

```bash
# Dalla cartella del microservizio
cd services/video-generator-ms
pnpm dev

# Oppure dalla root usando pnpm filter
pnpm --filter video-generator-ms dev
```

Il servizio sarà disponibile su `http://localhost:3009
6379`

### Health Check

```bash
curl http://localhost:3009
6379/health
```

## Run with Docker (dev/prod)

### Sviluppo

```bash
cd services/video-generator-ms

# Build dell'immagine dev
docker build -f Dockerfile.dev -t houseblock/video-generator-ms-dev .

# Avvio container
docker run --env-file .env.local -p 3009
6379:3009
6379 houseblock/video-generator-ms-dev
```

### Produzione

```bash
cd services/video-generator-ms

# Build dell'immagine produzione
docker build -t houseblock/video-generator-ms .

# Avvio container
docker run --env-file .env.production -p 3009
6379:3009
6379 houseblock/video-generator-ms
```

## Environment Variables (.env.example)

Copia `.env.example` in `.env` e configura le variabili necessarie. Vedi `.env.example` per la lista completa.

## API Endpoints

- `GET /health` - Health check endpoint
- Altri endpoint da implementare (vedi TODO.md)

Vedi [COMMANDS.md](../../COMMANDS.md) per comandi completi e [DEPLOY.md](../../DEPLOY.md) per dettagli sul deploy.
