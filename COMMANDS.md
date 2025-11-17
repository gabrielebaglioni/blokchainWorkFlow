# HouseBlock - Comandi di Lancio

Questa guida documenta tutti i comandi per avviare le applicazioni e i microservizi della monorepo HouseBlock.

## Indice

- [Applicazioni Web](#applicazioni-web)
- [Microservizi](#microservizi)
- [Infrastruttura Docker](#infrastruttura-docker)
- [Comandi Utili](#comandi-utili)

## Applicazioni Web

### Web Landing (`apps/web-landing`)

#### Sviluppo Locale (senza Docker)

```bash
# Opzione 1: Dalla root della monorepo
pnpm --filter web-landing dev

# Opzione 2: Dalla cartella dell'app
cd apps/web-landing
pnpm dev
```

L'app sarà disponibile su `http://localhost:3000`

#### Build di Produzione

```bash
# Dalla root
pnpm --filter web-landing build

# Dalla cartella dell'app
cd apps/web-landing
pnpm build
```

#### Start (se non si usa Vercel)

```bash
# Dalla root
pnpm --filter web-landing start

# Dalla cartella dell'app
cd apps/web-landing
pnpm start
```

#### Sviluppo con Docker

```bash
# Avvia solo web-landing in dev
docker compose -f infra/docker/docker-compose.dev.yml up web-landing

# Avvia in background
docker compose -f infra/docker/docker-compose.dev.yml up -d web-landing
```

#### Produzione con Docker

```bash
# Build e avvio
docker compose -f infra/docker/docker-compose.prod.yml up web-landing

# In background
docker compose -f infra/docker/docker-compose.prod.yml up -d web-landing
```

### Dashboard (`apps/dashboard`)

**Nota:** Il dashboard non è ancora implementato. Quando sarà disponibile, seguirà lo stesso pattern di `web-landing`.

## Microservizi

Tutti i microservizi seguono lo stesso pattern. Sostituisci `<ms-name>` con il nome del microservizio (es: `news-scraper-ms`, `sentiment-tracker-ms`, etc.).

### Sviluppo Locale (senza Docker)

#### Prerequisiti

1. Assicurati di aver installato le dipendenze dalla root:
   ```bash
   pnpm install
   ```

2. Configura le variabili d'ambiente:
   ```bash
   cd services/<ms-name>
   cp .env.example .env
   # Modifica .env con i tuoi valori
   ```

#### Avvio

```bash
# Opzione 1: Dalla root
cd services/<ms-name>
pnpm dev

# Opzione 2: Usando pnpm filter (dalla root)
pnpm --filter <ms-name> dev
```

#### Build e Start

```bash
cd services/<ms-name>

# Build
pnpm build

# Start (produzione)
pnpm start
```

### Sviluppo con Docker

```bash
cd services/<ms-name>

# Build dell'immagine dev
docker build -f Dockerfile.dev -t houseblock/<ms-name>-dev .

# Avvio container
docker run --env-file .env.local -p <PORT>:<PORT> houseblock/<ms-name>-dev
```

**Esempio per news-scraper-ms:**
```bash
cd services/news-scraper-ms
docker build -f Dockerfile.dev -t houseblock/news-scraper-ms-dev .
docker run --env-file .env.local -p 3001:3001 houseblock/news-scraper-ms-dev
```

### Produzione con Docker

```bash
cd services/<ms-name>

# Build dell'immagine produzione
docker build -t houseblock/<ms-name> .

# Avvio container
docker run --env-file .env.production -p <PORT>:<PORT> houseblock/<ms-name>
```

**Esempio per news-scraper-ms:**
```bash
cd services/news-scraper-ms
docker build -t houseblock/news-scraper-ms .
docker run --env-file .env.production -p 3001:3001 houseblock/news-scraper-ms
```

### Porte dei Microservizi

| Microservizio | Porta |
|---------------|-------|
| `news-scraper-ms` | 3001 |
| `sentiment-tracker-ms` | 3002 |
| `onchain-monitor-ms` | 3003 |
| `trend-analyzer-ms` | 3004 |
| `opportunity-detector-ms` | 3005 |
| `competitor-watchdog-ms` | 3006 |
| `ai-content-engine-ms` | 3007 |
| `visual-generator-ms` | 3008 |
| `video-generator-ms` | 3009 |
| `social-publisher-ms` | 3010 |
| `knowledge-base-ms` | 3011 |
| `telemetry-logger-ms` | 3012 |

### Health Check

Tutti i microservizi espongono un endpoint `/health`:

```bash
curl http://localhost:<PORT>/health
```

**Esempio:**
```bash
curl http://localhost:3001/health
# Risposta: {"status":"ok","service":"news-scraper-ms","timestamp":"2024-01-15T10:00:00.000Z"}
```

## Infrastruttura Docker

### Sviluppo

Avvia tutta l'infrastruttura di sviluppo (Redis, Postgres, n8n, web-landing):

```bash
# Dalla root
docker compose -f infra/docker/docker-compose.dev.yml up

# In background
docker compose -f infra/docker/docker-compose.dev.yml up -d

# Solo infrastruttura (senza web-landing)
docker compose -f infra/docker/docker-compose.dev.yml up redis postgres n8n
```

### Produzione

Avvia tutta l'infrastruttura di produzione:

```bash
# Dalla root
docker compose -f infra/docker/docker-compose.prod.yml up

# In background
docker compose -f infra/docker/docker-compose.prod.yml up -d
```

### Gestione Container

```bash
# Visualizza container attivi
docker compose -f infra/docker/docker-compose.dev.yml ps

# Visualizza log
docker compose -f infra/docker/docker-compose.dev.yml logs -f

# Log di un servizio specifico
docker compose -f infra/docker/docker-compose.dev.yml logs -f web-landing

# Ferma tutti i servizi
docker compose -f infra/docker/docker-compose.dev.yml down

# Ferma e rimuove volumi
docker compose -f infra/docker/docker-compose.dev.yml down -v
```

## Comandi Utili

### Script Root

Dalla root della monorepo, puoi usare questi script (definiti in `package.json`):

```bash
# Sviluppo web landing
pnpm dev:web

# Avvia infrastruttura Docker (dev)
pnpm dev:services

# Avvia tutto (infrastruttura + web landing)
pnpm dev:all

# Build di tutti i package
pnpm build:all

# Docker compose dev
pnpm docker:dev

# Docker compose prod
pnpm docker:prod
```

### Comandi pnpm Workspace

```bash
# Esegui comando in tutti i workspace
pnpm -r <command>

# Esegui comando in workspace specifico
pnpm --filter <workspace-name> <command>

# Esempi
pnpm -r build                    # Build tutti i package
pnpm --filter web-landing dev    # Avvia web-landing
pnpm --filter news-scraper-ms test  # Test news-scraper-ms
```

### Pulizia

```bash
# Rimuovi node_modules da tutti i workspace
pnpm clean

# Rimuovi build artifacts
pnpm -r clean
```

## Troubleshooting

### Porta già in uso

Se una porta è già in uso, puoi:

1. Cambiare la porta nel file `.env` del servizio
2. Fermare il processo che usa la porta:
   ```bash
   # Trova il processo
   lsof -i :<PORT>
   
   # Ferma il processo
   kill -9 <PID>
   ```

### Container non si avvia

1. Verifica i log:
   ```bash
   docker compose -f infra/docker/docker-compose.dev.yml logs <service-name>
   ```

2. Verifica le variabili d'ambiente nel file `.env`

3. Ricostruisci l'immagine:
   ```bash
   docker compose -f infra/docker/docker-compose.dev.yml build --no-cache <service-name>
   ```

### Dipendenze non installate

```bash
# Dalla root, reinstalla tutto
pnpm install

# Per un workspace specifico
cd services/<ms-name>
pnpm install
```

