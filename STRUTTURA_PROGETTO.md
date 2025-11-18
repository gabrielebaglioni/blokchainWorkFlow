# Struttura del Progetto HOMEBLOCK

## Panoramica
HOMEBLOCK è un sistema di microservizi per AI, automazione e Web3, organizzato come monorepo utilizzando pnpm workspaces.

```
homeBlock/
├── apps/                          # Applicazioni frontend/backend
│   ├── dashboard/                 # Dashboard (vuota)
│   ├── n8n/                      # Configurazione n8n (vuota)
│   └── web-landing/              # Applicazione Next.js principale
│       ├── public/                # Asset pubblici statici
│       │   ├── assets/            # Immagini, modelli 3D, icone
│       │   │   ├── silviculture/  # Immagini membri silviculture (15 jpg)
│       │   │   ├── *.jpg          # Immagini landscape (varie risoluzioni)
│       │   │   ├── *.webp         # Immagini webp ottimizzate
│       │   │   ├── *.svg          # Icone e grafiche vettoriali
│       │   │   ├── *.png          # Immagini raster
│       │   │   ├── *.glb          # Modelli 3D (eth_12k.glb, ether.glb, sphare.glb)
│       │   │   └── *.obj          # Modelli 3D alternativi
│       │   ├── *.svg              # Icone principali
│       │   ├── *.png              # Favicon e icone
│       │   └── *.pdf              # Report (2022, 2024)
│       ├── src/                   # Codice sorgente
│       │   ├── _pages/            # Pagine legacy
│       │   │   └── something.tsx
│       │   ├── app/               # Next.js App Router
│       │   │   ├── ai-layer/      # Pagina AI Layer
│       │   │   │   ├── head.tsx
│       │   │   │   └── page.tsx
│       │   │   ├── architecture/  # Pagina Architecture
│       │   │   │   ├── head.tsx
│       │   │   │   └── page.tsx
│       │   │   ├── contact/        # Pagina Contact
│       │   │   │   ├── head.tsx
│       │   │   │   └── page.tsx
│       │   │   ├── future/         # Pagina Future
│       │   │   │   ├── head.tsx
│       │   │   │   └── page.tsx
│       │   │   ├── identity/       # Pagina Identity
│       │   │   │   ├── head.tsx
│       │   │   │   └── page.tsx
│       │   │   ├── input-layer/    # Pagina Input Layer
│       │   │   │   ├── head.tsx
│       │   │   │   └── page.tsx
│       │   │   ├── output-layer/   # Pagina Output Layer
│       │   │   │   ├── head.tsx
│       │   │   │   └── page.tsx
│       │   │   ├── publishing/     # Pagina Publishing
│       │   │   │   ├── head.tsx
│       │   │   │   └── page.tsx
│       │   │   ├── why-exists/     # Pagina Why Exists
│       │   │   │   ├── head.tsx
│       │   │   │   └── page.tsx
│       │   │   ├── head.tsx        # Head globale
│       │   │   ├── icon.png        # Icona app
│       │   │   ├── icon.svg        # Icona app SVG
│       │   │   ├── layout.tsx      # Layout principale
│       │   │   └── page.tsx        # Homepage
│       │   ├── assets/             # Asset del codice
│       │   │   ├── icons/          # Icone SVG (2 file)
│       │   │   └── images/         # Immagini (1 SVG)
│       │   ├── components/         # Componenti React
│       │   │   ├── footer/         # Footer component
│       │   │   │   ├── Footer.module.scss
│       │   │   │   └── Footer.tsx
│       │   │   ├── icons/          # Componenti icone
│       │   │   │   └── DoubleSpiraleIcon.tsx
│       │   │   ├── nav/            # Navigation component
│       │   │   │   ├── Nav.module.scss
│       │   │   │   └── Nav.tsx
│       │   │   ├── page/           # Componenti pagina principale
│       │   │   │   ├── animation/  # Sistema di animazione 3D
│       │   │   │   │   ├── constants/
│       │   │   │   │   │   ├── sceneConfig.js
│       │   │   │   │   │   └── textureMap.js
│       │   │   │   │   ├── loaders/
│       │   │   │   │   │   ├── assetLoader.js
│       │   │   │   │   │   ├── globalLoaders.js
│       │   │   │   │   │   └── textureLoader.js
│       │   │   │   │   ├── orchestrator/
│       │   │   │   │   │   └── main.js
│       │   │   │   │   ├── particleObjects/
│       │   │   │   │   │   ├── house.js
│       │   │   │   │   │   ├── minecraftScene.js
│       │   │   │   │   │   ├── sparseParticleMesh.js
│       │   │   │   │   │   └── tree.js
│       │   │   │   │   ├── rendering/
│       │   │   │   │   │   └── renderLoop.js
│       │   │   │   │   ├── scene/
│       │   │   │   │   │   ├── camera.js
│       │   │   │   │   │   ├── controls.js
│       │   │   │   │   │   ├── lighting.js
│       │   │   │   │   │   ├── postProcessing.js
│       │   │   │   │   │   ├── renderer.js
│       │   │   │   │   │   └── scene.js
│       │   │   │   │   ├── shaders/          # Shader GLSL
│       │   │   │   │   │   ├── explosionVertexShader.glsl
│       │   │   │   │   │   ├── explosionVertexShaderTwo.glsl
│       │   │   │   │   │   ├── firefliesFragmentShader.glsl
│       │   │   │   │   │   ├── firefliesFragmentShaderTwo.glsl
│       │   │   │   │   │   ├── firefliesVertexShader.glsl
│       │   │   │   │   │   ├── firefliesVertexShader_ETHLogo.glsl
│       │   │   │   │   │   ├── firefliesVertexShader_ETHLogo_Slow.glsl
│       │   │   │   │   │   └── fragment_shader.glsl
│       │   │   │   │   ├── threeJsAssets/     # Three.js utilities
│       │   │   │   │   │   ├── EffectComposer.js
│       │   │   │   │   │   ├── GLTFLoader.js
│       │   │   │   │   │   ├── MaskPass.js
│       │   │   │   │   │   ├── OrbitControls.js
│       │   │   │   │   │   ├── Pass.js
│       │   │   │   │   │   ├── RenderPass.js
│       │   │   │   │   │   ├── ShaderPass.js
│       │   │   │   │   │   ├── UnrealBloomPass.js
│       │   │   │   │   │   └── shaders/
│       │   │   │   │   │       ├── CopyShader.js
│       │   │   │   │   │       ├── DigitalGlitch.js
│       │   │   │   │   │       └── LuminosityHighPassShader.js
│       │   │   │   │   ├── utils/
│       │   │   │   │   │   ├── colors.js
│       │   │   │   │   │   ├── device.js
│       │   │   │   │   │   ├── helpers.js
│       │   │   │   │   │   ├── webp.js
│       │   │   │   │   │   └── webpDetection.js
│       │   │   │   │   ├── visualEffects/
│       │   │   │   │   │   ├── background.js
│       │   │   │   │   │   └── fireflies.js
│       │   │   │   │   └── index.js
│       │   │   │   ├── assets/                # Asset duplicati per compatibilità
│       │   │   │   │   └── [stessi file di threeJsAssets]
│       │   │   │   ├── animation-context.tsx
│       │   │   │   ├── Content.module.scss
│       │   │   │   ├── Content.tsx
│       │   │   │   └── Head.tsx
│       │   │   ├── silviculture-society-members/
│       │   │   │   ├── SilvicultureSociety.module.scss
│       │   │   │   └── SilvicultureSociety.tsx
│       │   │   └── Link.tsx
│       │   ├── styles/            # Stili globali
│       │   │   ├── assets/        # Asset per stili
│       │   │   │   ├── ETH-loading.svg
│       │   │   │   ├── houseblock-loading.svg
│       │   │   │   └── twitter.png
│       │   │   ├── global.scss
│       │   │   ├── reset.scss
│       │   │   └── variables.scss
│       │   └── utils/             # Utility functions
│       │       └── useScrollDirection.ts
│       ├── COMMANDS.md            # Comandi disponibili
│       ├── DOCKER.md              # Documentazione Docker
│       ├── next-env.d.ts          # TypeScript definitions Next.js
│       ├── next.config.js         # Configurazione Next.js
│       ├── package.json           # Dipendenze app
│       ├── tsconfig.json          # Configurazione TypeScript
│       └── vercel.json            # Configurazione Vercel
│
├── packages/                      # Package condivisi
│   ├── hb-shared-ai/             # Package AI condiviso
│   │   ├── __tests__/            # Test
│   │   ├── docs/                 # Documentazione
│   │   ├── src/                  # Codice sorgente (vuoto)
│   │   └── package.json
│   ├── hb-shared-config/         # Configurazioni condivise
│   │   ├── __tests__/
│   │   ├── docs/
│   │   ├── src/                  # Codice sorgente (vuoto)
│   │   └── package.json
│   └── hb-shared-types/           # Tipi TypeScript condivisi
│       ├── __tests__/
│       ├── docs/
│       ├── src/                  # Codice sorgente (vuoto)
│       └── package.json
│
├── services/                      # Microservizi
│   ├── ai-layer/                 # Layer AI
│   │   ├── competitor-watchdog-ms/    # Monitoraggio competitor
│   │   │   ├── src/
│   │   │   │   └── index.ts
│   │   │   ├── Dockerfile
│   │   │   ├── Dockerfile.dev
│   │   │   ├── package.json
│   │   │   ├── README.md
│   │   │   ├── TODO.md
│   │   │   └── tsconfig.json
│   │   ├── opportunity-detector-ms/   # Rilevamento opportunità
│   │   │   ├── src/
│   │   │   │   └── index.ts
│   │   │   ├── Dockerfile
│   │   │   ├── Dockerfile.dev
│   │   │   ├── package.json
│   │   │   ├── README.md
│   │   │   ├── TODO.md
│   │   │   └── tsconfig.json
│   │   └── trend-analyzer-ms/         # Analisi trend
│   │       ├── src/
│   │       │   └── index.ts
│   │       ├── Dockerfile
│   │       ├── Dockerfile.dev
│   │       ├── package.json
│   │       ├── README.md
│   │       ├── TODO.md
│   │       └── tsconfig.json
│   │
│   ├── content-layer/            # Layer contenuti
│   │   ├── ai-content-engine-ms/     # Engine contenuti AI
│   │   │   ├── src/
│   │   │   │   └── index.ts
│   │   │   ├── Dockerfile
│   │   │   ├── Dockerfile.dev
│   │   │   ├── package.json
│   │   │   ├── README.md
│   │   │   ├── TODO.md
│   │   │   └── tsconfig.json
│   │   ├── video-generator-ms/        # Generatore video
│   │   │   ├── src/
│   │   │   │   └── index.ts
│   │   │   ├── Dockerfile
│   │   │   ├── Dockerfile.dev
│   │   │   ├── package.json
│   │   │   ├── README.md
│   │   │   ├── TODO.md
│   │   │   └── tsconfig.json
│   │   └── visual-generator-ms/       # Generatore visual
│   │       ├── src/
│   │       │   └── index.ts
│   │       ├── Dockerfile
│   │       ├── Dockerfile.dev
│   │       ├── package.json
│   │       ├── README.md
│   │       ├── TODO.md
│   │       └── tsconfig.json
│   │
│   ├── input-layer/              # Layer input
│   │   ├── news-scraper-ms/          # Scraper notizie
│   │   │   ├── src/
│   │   │   │   └── index.ts
│   │   │   ├── Dockerfile
│   │   │   ├── Dockerfile.dev
│   │   │   ├── package.json
│   │   │   ├── README.md
│   │   │   ├── TODO.md
│   │   │   └── tsconfig.json
│   │   ├── onchain-monitor-ms/       # Monitoraggio on-chain
│   │   │   ├── src/
│   │   │   │   └── index.ts
│   │   │   ├── Dockerfile
│   │   │   ├── Dockerfile.dev
│   │   │   ├── package.json
│   │   │   ├── README.md
│   │   │   ├── TODO.md
│   │   │   └── tsconfig.json
│   │   └── sentiment-tracker-ms/     # Tracker sentiment
│   │       ├── src/
│   │       │   └── index.ts
│   │       ├── Dockerfile
│   │       ├── Dockerfile.dev
│   │       ├── package.json
│   │       ├── README.md
│   │       ├── TODO.md
│   │       └── tsconfig.json
│   │
│   ├── publishing-layer/         # Layer pubblicazione
│   │   ├── knowledge-base-ms/        # Knowledge base
│   │   │   ├── src/
│   │   │   │   └── index.ts
│   │   │   ├── Dockerfile
│   │   │   ├── Dockerfile.dev
│   │   │   ├── package.json
│   │   │   ├── README.md
│   │   │   ├── TODO.md
│   │   │   └── tsconfig.json
│   │   └── social-publisher-ms/      # Publisher social
│   │       ├── src/
│   │       │   └── index.ts
│   │       ├── Dockerfile
│   │       ├── Dockerfile.dev
│   │       ├── package.json
│   │       ├── README.md
│   │       ├── TODO.md
│   │       └── tsconfig.json
│   │
│   └── utility-layer/           # Layer utility
│       └── telemetry-logger-ms/      # Logger telemetria
│           ├── src/
│           │   └── index.ts
│           ├── Dockerfile
│           ├── Dockerfile.dev
│           ├── package.json
│           ├── README.md
│           ├── TODO.md
│           └── tsconfig.json
│
├── infra/                        # Infrastruttura
│   ├── db/                       # Database
│   │   ├── migrations/           # Migrazioni DB
│   │   └── schemas/              # Schemi DB
│   ├── docker/                   # Configurazione Docker
│   │   ├── docker-compose.yml        # Compose principale
│   │   ├── docker-compose.dev.yml    # Compose sviluppo
│   │   ├── docker-compose.prod.yml   # Compose produzione
│   │   ├── Dockerfile.web-landing    # Dockerfile web landing
│   │   └── Dockerfile.web-landing.dev # Dockerfile dev
│   ├── grafana/                  # Configurazione Grafana
│   │   ├── dashboards/           # Dashboard Grafana
│   │   └── provisioning/         # Provisioning Grafana
│   ├── n8n/                      # Configurazione n8n
│   │   ├── credentials/          # Credenziali n8n
│   │   └── workflows/            # Workflow n8n
│   └── scripts/                  # Script infrastruttura
│
├── public/                       # Public root (vuota)
│
├── .env.example                  # Esempio variabili ambiente
├── .gitignore                    # Git ignore
├── COMMANDS.md                   # Comandi progetto
├── CONTRIBUTING.md               # Linee guida contribuzione
├── DEPLOY.md                     # Documentazione deploy
├── next-env.d.ts                 # TypeScript definitions
├── package.json                  # Package.json root
├── pnpm-lock.yaml                # Lock file pnpm
├── pnpm-workspace.yaml           # Configurazione workspace pnpm
├── QUICK_START.md                # Guida quick start
├── README.md                     # README principale
├── TODO.md                       # TODO progetto
├── tsconfig.json                 # Configurazione TypeScript root
└── vercel.json                   # Configurazione Vercel
```

## Architettura del Progetto

### Monorepo Structure
Il progetto utilizza **pnpm workspaces** per gestire un monorepo con:
- **Apps**: Applicazioni frontend/backend
- **Packages**: Package condivisi tra i servizi
- **Services**: Microservizi organizzati per layer
- **Infra**: Configurazione infrastruttura

### Layer dei Microservizi

1. **Input Layer**: Raccolta dati
   - News Scraper
   - On-chain Monitor
   - Sentiment Tracker

2. **AI Layer**: Elaborazione AI
   - Competitor Watchdog
   - Opportunity Detector
   - Trend Analyzer

3. **Content Layer**: Generazione contenuti
   - AI Content Engine
   - Video Generator
   - Visual Generator

4. **Publishing Layer**: Pubblicazione
   - Knowledge Base
   - Social Publisher

5. **Utility Layer**: Servizi di supporto
   - Telemetry Logger

### Web Landing App
Applicazione Next.js con:
- **App Router**: Routing moderno Next.js 13+
- **3D Animations**: Sistema Three.js per animazioni 3D
- **Components**: Componenti React modulari
- **Styles**: SCSS modulare

### Tecnologie Principali
- **Frontend**: Next.js, React, TypeScript, Three.js
- **Backend**: Microservizi Node.js/TypeScript
- **Package Manager**: pnpm
- **Container**: Docker
- **Deployment**: Vercel
- **Monitoring**: Grafana

