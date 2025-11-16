# HouseBlock Development Roadmap

This document outlines the development roadmap, technical guidelines, and checklists for building out the HouseBlock monorepo.

## Table of Contents

- [Creating New Packages](#creating-new-packages)
- [Activating and Configuring Microservices](#activating-and-configuring-microservices)
- [Pipeline Architecture](#pipeline-architecture)
- [Development Priorities](#development-priorities)
- [Technical Checklist for Services](#technical-checklist-for-services)

## Creating New Packages

### Location

All shared packages live in `/packages/` directory.

### Steps to Create a New Package

1. **Create Directory Structure**
   ```bash
   mkdir -p packages/hb-my-new-package/{src,__tests__,docs}
   ```

2. **Initialize Package**
   ```bash
   cd packages/hb-my-new-package
   pnpm init
   ```

3. **Update package.json**
   ```json
   {
     "name": "@houseblock/my-new-package",
     "version": "0.1.0",
     "main": "dist/index.js",
     "types": "dist/index.d.ts",
     "scripts": {
       "build": "tsc",
       "test": "jest",
       "lint": "eslint src"
     }
   }
   ```

4. **Create Essential Files**
   - `README.md`: Document purpose, usage, and API
   - `tsconfig.json`: TypeScript configuration
   - `src/index.ts`: Main entry point
   - `.env.example`: If configuration is needed

5. **Add to Workspace**
   - Ensure `pnpm-workspace.yaml` includes `packages/*`
   - No manual registration needed if following naming convention

6. **Build and Publish Locally**
   ```bash
   pnpm --filter hb-my-new-package build
   ```

7. **Use in Other Packages**
   ```typescript
   import { something } from '@houseblock/my-new-package'
   ```

### Package Types

- **Config Packages** (`hb-shared-config`): Shared configuration, constants, environment helpers
- **Type Packages** (`hb-shared-types`): TypeScript type definitions, interfaces, enums
- **AI Packages** (`hb-shared-ai`): Shared AI prompts, templates, prompt engineering utilities
- **Utility Packages**: Reusable utilities (validation, formatting, etc.)

## Activating and Configuring Microservices

### Prerequisites

1. **Environment Setup**
   ```bash
   cp .env.example .env
   # Fill in all required values
   ```

2. **Infrastructure Services**
   ```bash
   # Start Docker services (Postgres, Redis, etc.)
   docker-compose -f infra/docker/docker-compose.yml up -d
   ```

3. **Database Setup**
   ```bash
   # Run migrations
   pnpm --filter infra run migrate
   ```

### Activating a Microservice

1. **Install Dependencies**
   ```bash
   pnpm install
   ```

2. **Configure Environment**
   ```bash
   cd services/my-microservice-ms
   cp .env.example .env
   # Edit .env with service-specific values
   ```

3. **Build Service**
   ```bash
   pnpm --filter my-microservice-ms build
   ```

4. **Run Locally**
   ```bash
   pnpm --filter my-microservice-ms dev
   ```

5. **Verify Health**
   ```bash
   curl http://localhost:PORT/health
   ```

6. **Register in n8n**
   - Create workflow in `infra/n8n/workflows/`
   - Configure webhooks and event triggers
   - Test workflow execution

### Service Configuration Checklist

- [ ] Environment variables documented in `.env.example`
- [ ] Health check endpoint implemented (`/health`)
- [ ] Dockerfile created and tested
- [ ] Database migrations (if needed)
- [ ] Redis connection configured
- [ ] Logging to telemetry-logger-ms configured
- [ ] API documentation (OpenAPI/Swagger)
- [ ] n8n workflow created
- [ ] Error handling and retry logic
- [ ] Rate limiting (if applicable)

## Pipeline Architecture

### Input Layer → AI Layer → Output Layer → Publishing Layer

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
│                    [Event Bus / n8n]                        │
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
│                    [Event Bus / n8n]                        │
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
│                    [Event Bus / n8n]                        │
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
│  [Twitter, LinkedIn, Mastodon, etc.]                       │
└─────────────────────────────────────────────────────────────┘
```

### Event Flow

1. **Input Services** collect data (news, onchain events, competitor activity)
2. **Events** are published to n8n event bus
3. **AI Services** process and analyze data
4. **Output Services** generate content, visuals, videos
5. **Knowledge Base** stores processed information
6. **Telemetry Logger** tracks all operations
7. **Social Publisher** distributes content to platforms

### n8n Workflow Examples

- `input-to-ai.json`: Routes input events to AI services
- `ai-to-output.json`: Routes AI results to output services
- `output-to-publish.json`: Routes generated content to publisher
- `error-handler.json`: Centralized error handling and retry logic

## Development Priorities

### Phase 1: Foundation Services (Weeks 1-4)

**Priority: Critical Infrastructure**

- [ ] **telemetry-logger-ms**: Central logging system
  - Health check endpoint
  - Log ingestion API
  - Storage to Supabase
  - Query interface

- [ ] **news-scraper-ms**: Basic RSS feed scraping
  - RSS parser
  - Article storage
  - Deduplication
  - Basic scheduling

- [ ] **onchain-monitor-ms**: Ethereum event monitoring
  - Web3 provider integration
  - Event filtering
  - Storage to Supabase
  - Basic alerting

- [ ] **knowledge-base-ms**: Vector database setup
  - Supabase vector extension
  - Embedding generation
  - Basic search
  - Storage schema

### Phase 2: AI Layer (Weeks 5-8)

**Priority: Core Intelligence**

- [ ] **sentiment-tracker-ms**: Sentiment analysis
  - LLM integration (OpenAI/Anthropic)
  - Sentiment scoring
  - Trend detection
  - Storage and retrieval

- [ ] **trend-analyzer-ms**: Pattern recognition
  - Time series analysis
  - Trend identification
  - Correlation detection
  - Alert generation

- [ ] **ai-content-engine-ms**: Content generation
  - Prompt templates
  - LLM orchestration
  - Content formatting
  - Quality validation

### Phase 3: Visual & Media (Weeks 9-12)

**Priority: Content Creation**

- [ ] **visual-generator-ms**: Image generation
  - DALL-E / Stable Diffusion integration
  - Style templates
  - Image optimization
  - Storage management

- [ ] **video-generator-ms**: Video creation
  - FFmpeg integration
  - Template system
  - Asset management
  - Rendering pipeline

### Phase 4: Publishing & Dashboard (Weeks 13-16)

**Priority: Distribution & Monitoring**

- [ ] **social-publisher-ms**: Multi-platform publishing
  - Twitter/X API
  - LinkedIn API
  - Mastodon API
  - Scheduling system

- [ ] **opportunity-detector-ms**: Advanced analytics
  - Pattern matching
  - Opportunity scoring
  - Alert system

- [ ] **competitor-watchdog-ms**: Competitive intelligence
  - Monitoring setup
  - Change detection
  - Reporting

- [ ] **dashboard**: Web interface
  - Service status monitoring
  - Content preview
  - Analytics visualization
  - Configuration UI

## Technical Checklist for Services

For each microservice, ensure completion of:

### Environment & Configuration

- [ ] `.env.example` with all required variables
- [ ] Environment validation on startup
- [ ] Configuration loading from environment
- [ ] Support for different environments (dev, staging, prod)

### Docker

- [ ] `Dockerfile` with multi-stage build
- [ ] `.dockerignore` file
- [ ] Health check in Dockerfile
- [ ] Optimized image size
- [ ] Non-root user in container

### Database

- [ ] Migration scripts in `infra/db/migrations/`
- [ ] Schema documentation
- [ ] Indexes for performance
- [ ] Connection pooling
- [ ] Transaction handling

### API

- [ ] RESTful API design
- [ ] OpenAPI/Swagger documentation
- [ ] Request validation
- [ ] Response formatting
- [ ] Error handling with proper status codes
- [ ] Rate limiting
- [ ] Authentication (if needed)

### Health & Monitoring

- [ ] `/health` endpoint
- [ ] `/ready` endpoint (readiness probe)
- [ ] Dependency health checks (DB, Redis, external APIs)
- [ ] Metrics endpoint (optional)
- [ ] Structured logging
- [ ] Integration with telemetry-logger-ms

### Testing

- [ ] Unit tests (80%+ coverage)
- [ ] Integration tests
- [ ] Health check tests
- [ ] API endpoint tests
- [ ] Error scenario tests
- [ ] Load testing (for critical services)

### Documentation

- [ ] `README.md` with:
  - Purpose and overview
  - API documentation
  - Architecture diagram
  - Dependencies
  - Local development setup
  - Deployment instructions
- [ ] `TODO.md` with development roadmap
- [ ] Code comments and JSDoc
- [ ] Architecture decision records (if applicable)

### n8n Integration

- [ ] Webhook endpoints for n8n
- [ ] Workflow definition in `infra/n8n/workflows/`
- [ ] Event schema documentation
- [ ] Error handling in workflows
- [ ] Retry logic configuration

### Security

- [ ] Input sanitization
- [ ] SQL injection prevention
- [ ] XSS prevention (if web interface)
- [ ] API key management
- [ ] Secrets management (no hardcoded secrets)
- [ ] CORS configuration (if needed)

### Performance

- [ ] Caching strategy (Redis)
- [ ] Database query optimization
- [ ] Connection pooling
- [ ] Async processing where applicable
- [ ] Resource cleanup (memory leaks prevention)

### Independence

- [ ] No direct code imports from other services
- [ ] Communication only via HTTP/REST
- [ ] Use shared packages only for types/config
- [ ] Self-contained deployment
- [ ] No shared state with other services

## Next Steps

1. Start with Phase 1 services
2. Set up infrastructure (Docker, database, Redis)
3. Implement telemetry-logger-ms first (foundation)
4. Build services incrementally
5. Test each service in isolation
6. Integrate via n8n workflows
7. Monitor and iterate

## Questions or Issues?

- Check service-specific `README.md` and `TODO.md`
- Review `CONTRIBUTING.md` for development guidelines
- Open an issue for discussion
- Document decisions in service README

