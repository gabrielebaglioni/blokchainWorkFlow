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
cd houseblock
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

4. **Start infrastructure services**

```bash
cd infra/docker
docker-compose up -d
```

This starts:
- Redis (port 6379)
- PostgreSQL (port 5432) - for local dev only
- n8n (port 5678)

5. **Start a microservice**

```bash
# Example: Start news-scraper-ms
cd services/news-scraper-ms
pnpm install
cp .env.example .env
# Edit .env with service-specific config
pnpm dev
```

6. **Start the web landing app**

```bash
cd apps/web-landing
pnpm install
pnpm dev
```

Access at `http://localhost:3000`

### Docker Compose Setup

For a complete local environment:

```bash
# Start all infrastructure
docker-compose -f infra/docker/docker-compose.yml up -d

# Check services
docker-compose -f infra/docker/docker-compose.yml ps

# View logs
docker-compose -f infra/docker/docker-compose.yml logs -f
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

## Development

### Adding a New Microservice

1. Create directory: `services/my-new-ms/`
2. Initialize package: `pnpm init`
3. Create structure: `src/`, `__tests__/`, `README.md`, `TODO.md`
4. Implement service following independence rules
5. Add to workspace (automatic if in `services/`)
6. Create n8n workflow in `infra/n8n/workflows/`

See `CONTRIBUTING.md` for detailed guidelines.

### Running Services Locally

```bash
# Start infrastructure
docker-compose -f infra/docker/docker-compose.yml up -d

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
