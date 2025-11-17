# HouseBlock

HouseBlock is a personal experiment: a microservices system working on three fundamental layers – AI, automation, and Web3. It's not an agency, it's not a SaaS, it's not a product for sale. It's a system that works for one thing: feeding my understanding of the blockchain world and transforming it into content, notes, and ideas that last over time.

At the center is a pseudonymous identity, HouseBlock, that observes, interprets, and tells stories. Everything that gets published – posts, threads, images, experiments – is the result of a microservices ecosystem working in the background, like an automatic house that never stops growing.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [System Layers](#system-layers)
- [Microservices](#microservices)
- [Technical Stack](#technical-stack)
- [Getting Started](#getting-started)
- [Monorepo Structure](#monorepo-structure)
- [Event-Driven Architecture](#event-driven-architecture)
- [Development](#development)
- [Contributing](#contributing)

## Architecture Overview

HouseBlock is built as a **monorepo** using **pnpm workspaces**, containing:

- **3 Applications**: Web landing page, Dashboard, n8n integration
- **12 Microservices**: Independent services handling specific domains
- **3 Shared Packages**: Configuration, types, and AI prompts
- **Infrastructure**: Docker, database, monitoring, and automation configs

The system follows an **event-driven architecture** where microservices communicate via **n8n workflows** and **HTTP APIs**, ensuring complete independence and scalability.

## System Layers

HouseBlock operates on three fundamental layers:

### 1. Input Layer

The Input Layer collects data from various sources:

- **News Scraper**: RSS feeds, blog posts, articles from the Web3 ecosystem
- **Onchain Monitor**: Blockchain events, transactions, smart contract interactions
- **Competitor Watchdog**: Tracks competitor activities and strategies

### 2. AI Layer

The AI Layer processes and analyzes collected data:

- **Sentiment Tracker**: Analyzes emotional tone and sentiment using LLMs
- **Trend Analyzer**: Identifies patterns, trends, and correlations
- **Opportunity Detector**: Detects opportunities and actionable insights

### 3. Output Layer

The Output Layer generates and distributes content:

- **AI Content Engine**: Generates articles, posts, threads using LLMs
- **Visual Generator**: Creates images and graphics using AI image models
- **Video Generator**: Produces video content from assets
- **Knowledge Base**: Stores and enables semantic search across all content
- **Social Publisher**: Publishes content to Twitter, LinkedIn, Mastodon

### Supporting Infrastructure

- **Telemetry Logger**: Central logging and observability system
- **n8n**: Event-driven workflow orchestration
- **Supabase**: Centralized PostgreSQL database and storage

## Microservices

### Input Services

| Service | Port | Purpose |
|---------|------|---------|
| `news-scraper-ms` | 3001 | Scrapes RSS feeds and articles from Web3 sources |
| `onchain-monitor-ms` | 3003 | Monitors blockchain events and transactions |
| `competitor-watchdog-ms` | 3006 | Tracks competitor activities and content |

### AI Services

| Service | Port | Purpose |
|---------|------|---------|
| `sentiment-tracker-ms` | 3002 | Analyzes sentiment using LLMs |
| `trend-analyzer-ms` | 3004 | Detects trends and patterns |
| `opportunity-detector-ms` | 3005 | Identifies opportunities and insights |

### Output Services

| Service | Port | Purpose |
|---------|------|---------|
| `ai-content-engine-ms` | 3007 | Generates written content using LLMs |
| `visual-generator-ms` | 3008 | Creates images using AI models |
| `video-generator-ms` | 3009 | Generates video content |
| `social-publisher-ms` | 3010 | Publishes to social media platforms |
| `knowledge-base-ms` | 3011 | Semantic search and vector storage |

### Infrastructure Services

| Service | Port | Purpose |
|---------|------|---------|
| `telemetry-logger-ms` | 3012 | Central logging and observability |

Each microservice is **100% independent**:
- No direct code imports from other services
- Communication only via HTTP/REST APIs
- Event publishing/consumption via n8n
- Self-contained deployment
- Horizontal scalability

## Technical Stack

### Core Technologies

- **Runtime**: Node.js 18+
- **Language**: TypeScript
- **Package Manager**: pnpm 8+
- **Monorepo**: pnpm workspaces

### Applications

- **Web Landing**: Next.js 14, React 18, Three.js, Sass
- **Dashboard**: Next.js 14+ (planned)
- **n8n**: Workflow automation platform

### Microservices

- **Framework**: Express.js
- **Database**: Supabase PostgreSQL (centralized)
- **Cache/Queue**: Redis
- **Orchestration**: n8n (event-driven workflows)

### AI & LLM

- **Providers**: OpenAI (GPT-4), Anthropic (Claude), Google (Gemini)
- **Image Generation**: DALL-E, Stable Diffusion
- **Embeddings**: OpenAI text-embedding-3-large

### Web3

- **RPC Providers**: Alchemy, Infura
- **Networks**: Ethereum, Polygon, Arbitrum, Optimism, Base
- **Libraries**: ethers.js or viem

### Infrastructure

- **Containerization**: Docker
- **Database**: Supabase (PostgreSQL with extensions: pgvector)
- **Monitoring**: Grafana (planned)
- **Workflow**: n8n

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- Docker and Docker Compose
- Supabase account (or local PostgreSQL)

### Local Setup

1. **Clone the repository**

```bash
git clone <repository-url>
cd homeBlock
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Configure environment**

```bash
cp .env.example .env
# Edit .env with your configuration:
# - Supabase credentials
# - LLM API keys (OpenAI, Anthropic, etc.)
# - Web3 RPC URLs
# - Social media API keys
```

## Come Avviare la Landing in Locale

### Opzione 1: Senza Docker (consigliato per sviluppo)

```bash
# Dalla root della monorepo
pnpm --filter web-landing dev

# Oppure dalla cartella dell'app
cd apps/web-landing
pnpm dev
```

L'app sarà disponibile su `http://localhost:3000`

### Opzione 2: Con Docker

```bash
# Avvia infrastruttura + web-landing
docker compose -f infra/docker/docker-compose.dev.yml up -d

# Oppure solo web-landing
docker compose -f infra/docker/docker-compose.dev.yml up -d web-landing
```

Vedi [COMMANDS.md](./COMMANDS.md) per dettagli completi.

## Come Avviare i Microservizi in Locale

### Prerequisiti

1. Assicurati di aver installato le dipendenze dalla root:
   ```bash
   pnpm install
   ```

2. Configura le variabili d'ambiente per ogni microservizio:
   ```bash
   cd services/<ms-name>
   cp .env.example .env
   # Modifica .env con i tuoi valori
   ```

### Avvio Microservizio

```bash
# Dalla cartella del microservizio
cd services/news-scraper-ms
pnpm dev

# Oppure dalla root usando pnpm filter
pnpm --filter news-scraper-ms dev
```

### Porte dei Microservizi

| Microservizio | Porta | Health Check |
|---------------|-------|--------------|
| `news-scraper-ms` | 3001 | `http://localhost:3001/health` |
| `sentiment-tracker-ms` | 3002 | `http://localhost:3002/health` |
| `onchain-monitor-ms` | 3003 | `http://localhost:3003/health` |
| `trend-analyzer-ms` | 3004 | `http://localhost:3004/health` |
| `opportunity-detector-ms` | 3005 | `http://localhost:3005/health` |
| `competitor-watchdog-ms` | 3006 | `http://localhost:3006/health` |
| `ai-content-engine-ms` | 3007 | `http://localhost:3007/health` |
| `visual-generator-ms` | 3008 | `http://localhost:3008/health` |
| `video-generator-ms` | 3009 | `http://localhost:3009/health` |
| `social-publisher-ms` | 3010 | `http://localhost:3010/health` |
| `knowledge-base-ms` | 3011 | `http://localhost:3011/health` |
| `telemetry-logger-ms` | 3012 | `http://localhost:3012/health` |

Vedi [COMMANDS.md](./COMMANDS.md) per comandi completi e dettagli.

## Come Avviare l'Infrastruttura Docker (dev/prod)

### Sviluppo

Avvia tutta l'infrastruttura di sviluppo (Redis, Postgres, n8n, web-landing):

```bash
# Dalla root
docker compose -f infra/docker/docker-compose.dev.yml up -d

# Visualizza log
docker compose -f infra/docker/docker-compose.dev.yml logs -f

# Ferma tutto
docker compose -f infra/docker/docker-compose.dev.yml down
```

### Produzione

```bash
# Dalla root
docker compose -f infra/docker/docker-compose.prod.yml up -d
```

### Servizi Disponibili

- **Redis:** `localhost:6379`
- **PostgreSQL:** `localhost:5432` (solo per dev locale, produzione usa Supabase)
- **n8n:** `http://localhost:5678`
- **Web Landing:** `http://localhost:3000`

Vedi [COMMANDS.md](./COMMANDS.md) per dettagli completi.

## Come Deployare su Vercel

### Web Landing

1. **Collega il repository** a Vercel
2. **Configura il progetto:**
   - **Root Directory:** `apps/web-landing`
   - **Build Command:** `pnpm install && pnpm --filter web-landing build`
   - **Output Directory:** `.next`
   - **Install Command:** `pnpm install`
   - **Framework:** Next.js

3. **Aggiungi variabili d'ambiente** se necessarie

4. **Deploy automatico** ad ogni push sul branch principale

Il file `apps/web-landing/vercel.json` è già configurato.

Vedi [DEPLOY.md](./DEPLOY.md) per dettagli completi.

## Come Deployare su VPS/Hostinger

### n8n

```bash
# Sul server VPS
git clone <repository-url> /opt/houseblock
cd /opt/houseblock/infra/docker

# Avvia n8n
docker compose -f docker-compose.prod.yml up -d n8n
```

Accesso: `http://your-server-ip:5678`

### Microservizi

```bash
# Deploy singolo microservizio
cd /opt/houseblock/services/<ms-name>
docker build -t houseblock/<ms-name> .
docker run -d \
  --name houseblock-<ms-name> \
  --env-file .env.production \
  -p <PORT>:<PORT> \
  --restart unless-stopped \
  houseblock/<ms-name>
```

### Stack Completo

```bash
# Avvia tutto lo stack
cd /opt/houseblock/infra/docker
docker compose -f docker-compose.prod.yml up -d
```

Vedi [DEPLOY.md](./DEPLOY.md) per guida completa al deploy.

### Quick Start Scripts

Dalla root della monorepo, puoi usare questi script:

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

### Database Setup

1. **Supabase Setup** (Production/Development)

   - Create a Supabase project
   - Enable PostgreSQL extensions:
     - `pgvector` (for knowledge-base-ms)
   - Run migrations from each microservice
   - Configure connection in `.env`

2. **Local PostgreSQL** (Development only)

   - Uses Docker Compose PostgreSQL
   - Migrations run automatically on startup
   - Data persists in Docker volumes

## Monorepo Structure

```
houseblock/
├── apps/                          # Applications
│   ├── web-landing/               # Next.js landing page
│   ├── dashboard/                 # Monitoring dashboard (planned)
│   └── n8n/                       # n8n configuration
│
├── services/                      # Microservices
│   ├── news-scraper-ms/           # RSS and article scraping
│   ├── sentiment-tracker-ms/      # Sentiment analysis
│   ├── onchain-monitor-ms/         # Blockchain monitoring
│   ├── trend-analyzer-ms/         # Trend detection
│   ├── opportunity-detector-ms/   # Opportunity identification
│   ├── competitor-watchdog-ms/    # Competitive intelligence
│   ├── ai-content-engine-ms/      # Content generation
│   ├── visual-generator-ms/       # Image generation
│   ├── video-generator-ms/         # Video generation
│   ├── social-publisher-ms/       # Social media publishing
│   ├── knowledge-base-ms/          # Semantic search
│   └── telemetry-logger-ms/        # Central logging
│
├── packages/                      # Shared packages
│   ├── hb-shared-config/          # Configuration utilities
│   ├── hb-shared-types/           # TypeScript types
│   └── hb-shared-ai/              # AI prompts and templates
│
├── infra/                         # Infrastructure
│   ├── docker/                    # Docker Compose configs
│   ├── db/                        # Database migrations
│   ├── grafana/                   # Monitoring dashboards
│   ├── n8n/                       # n8n workflows
│   └── scripts/                   # Utility scripts
│
├── pnpm-workspace.yaml            # pnpm workspace config
├── package.json                   # Root package.json
├── .env.example                   # Environment variables template
├── CONTRIBUTING.md                # Contribution guidelines
└── TODO.md                        # Development roadmap
```

### Workspace Commands

```bash
# Run command in all workspaces
pnpm -r <command>

# Run command in specific workspace
pnpm --filter <workspace-name> <command>

# Examples
pnpm -r build                    # Build all packages
pnpm --filter web-landing dev   # Start web-landing
pnpm --filter news-scraper-ms test  # Test news-scraper-ms
```

## Event-Driven Architecture

HouseBlock uses an **event-driven architecture** orchestrated by **n8n**. Services communicate through events, not direct API calls.

### Event Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      INPUT LAYER                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ News Scraper │  │ Onchain      │  │ Competitor   │     │
│  │              │  │ Monitor      │  │ Watchdog     │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         │                  │                  │             │
│         └──────────────────┼──────────────────┘             │
│                            │                                │
│                            ▼                                │
│                    [n8n Event Bus]                          │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                       AI LAYER                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Sentiment    │  │ Trend        │  │ Opportunity  │     │
│  │ Tracker      │  │ Analyzer     │  │ Detector     │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         │                  │                  │             │
│         └──────────────────┼──────────────────┘             │
│                            │                                │
│                            ▼                                │
│                    [n8n Event Bus]                          │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      OUTPUT LAYER                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ AI Content   │  │ Visual       │  │ Video        │     │
│  │ Engine       │  │ Generator    │  │ Generator    │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         │                  │                  │             │
│         └──────────────────┼──────────────────┘             │
│                            │                                │
│                            ▼                                │
│                    [n8n Event Bus]                          │
│                            │                                │
│                            ▼                                │
│  ┌──────────────┐  ┌──────────────┐                       │
│  │ Knowledge    │  │ Telemetry    │                       │
│  │ Base         │  │ Logger       │                       │
│  └──────────────┘  └──────────────┘                       │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    PUBLISHING LAYER                         │
│  ┌──────────────┐                                          │
│  │ Social       │                                          │
│  │ Publisher    │                                          │
│  └──────────────┘                                          │
│         │                                                   │
│         ▼                                                   │
│  [Twitter, LinkedIn, Mastodon]                             │
└─────────────────────────────────────────────────────────────┘
```

### How Events Work

1. **Service publishes event** to n8n webhook
2. **n8n workflow** receives event and routes to appropriate services
3. **Downstream services** consume events via webhooks
4. **Services process** and may publish new events
5. **Chain continues** until content reaches publishing layer

### Event Schema

Events follow a consistent schema (defined in `@houseblock/shared-types`):

```typescript
{
  event: "article.scraped" | "sentiment.analyzed" | "content.generated" | ...,
  timestamp: string,
  data: {
    // Event-specific data
  }
}
```

### n8n Workflows

Workflows are stored in `infra/n8n/workflows/`:

- `input-to-ai.json`: Routes input events to AI services
- `ai-to-output.json`: Routes AI results to output services
- `output-to-publish.json`: Routes content to publisher
- `error-handler.json`: Centralized error handling

## Documentazione Aggiuntiva

- **[COMMANDS.md](./COMMANDS.md)** - Guida completa ai comandi di lancio
- **[DEPLOY.md](./DEPLOY.md)** - Guida al deploy su Vercel e VPS/Hostinger
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Linee guida per contribuire
- **[TODO.md](./TODO.md)** - Roadmap di sviluppo

## Development

### Adding a New Microservice

1. Create directory: `services/my-new-ms/`
2. Initialize package: `pnpm init`
3. Create structure: `src/`, `__tests__/`, `README.md`, `TODO.md`, `Dockerfile`, `.env.example`
4. Implement service following independence rules
5. Add to workspace (automatic if in `services/`)
6. Create n8n workflow in `infra/n8n/workflows/`

See `CONTRIBUTING.md` for detailed guidelines.

### Running Services Locally

```bash
# Start infrastructure
docker compose -f infra/docker/docker-compose.dev.yml up -d

# Start a service
cd services/news-scraper-ms
pnpm dev

# Health check
curl http://localhost:3001/health
```

### Testing

```bash
# Test all packages
pnpm -r test

# Test specific service
pnpm --filter news-scraper-ms test
```

### Building

```bash
# Build all packages
pnpm -r build

# Build specific package
pnpm --filter web-landing build
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for:

- Commit conventions (Conventional Commits)
- Branch strategy
- Naming conventions
- Testing guidelines
- Code review process

## Development Roadmap

See [TODO.md](./TODO.md) for:

- Development phases
- Priority order
- Technical checklists
- Package creation guide
- Microservice activation steps

## License

Private project - not for distribution.

## Contact

For questions or discussions about HouseBlock, open an issue or reach out through the contact page on the web landing.

---

**HouseBlock** - A microservices system for AI, automation, and Web3.
