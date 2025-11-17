# Struttura ad Albero Dettagliata - Progetto HOMEBLOCK

```
homeBlock/
│
├── 📁 apps/                          # Applicazioni principali
│   ├── 📁 dashboard/                 # Dashboard (vuota)
│   ├── 📁 n8n/                       # Configurazione n8n (vuota)
│   └── 📁 web-landing/               # Applicazione Next.js - Landing Page
│       ├── 📁 public/                # File statici pubblici
│       │   ├── 📁 assets/            # Asset multimediali
│       │   │   ├── 📁 silviculture/  # Immagini membri silviculture (15 .jpg)
│       │   │   ├── *.jpg, *.webp     # Immagini landscape (varie risoluzioni)
│       │   │   ├── *.svg             # Icone e grafiche vettoriali
│       │   │   ├── *.glb, *.obj      # Modelli 3D (eth_12k.glb, ether.glb, sphare.glb)
│       │   │   ├── *.png             # Immagini raster
│       │   │   └── dotTexture.png    # Texture
│       │   ├── apple-icon.png
│       │   ├── eth-colorful-icon.svg
│       │   ├── favicon-32x32.png
│       │   ├── favicon.png
│       │   ├── houseblock-icon.svg
│       │   ├── houseblock-logo.svg
│       │   ├── houseblock-menu-bg.svg
│       │   ├── houseblock-og-image.svg
│       │   ├── report-2022-04.pdf
│       │   └── report-2024.pdf
│       │
│       ├── 📁 src/                    # Codice sorgente
│       │   ├── 📁 _pages/            # Pagine legacy
│       │   │   └── something.tsx
│       │   │
│       │   ├── 📁 app/                # App Router Next.js 13+
│       │   │   ├── 📁 ai-layer/      # Pagina AI Layer
│       │   │   │   ├── head.tsx
│       │   │   │   └── page.tsx
│       │   │   ├── 📁 architecture/  # Pagina Architecture
│       │   │   │   ├── head.tsx
│       │   │   │   └── page.tsx
│       │   │   ├── 📁 contact/       # Pagina Contact
│       │   │   │   ├── head.tsx
│       │   │   │   └── page.tsx
│       │   │   ├── 📁 future/        # Pagina Future
│       │   │   │   ├── head.tsx
│       │   │   │   └── page.tsx
│       │   │   ├── 📁 identity/      # Pagina Identity
│       │   │   │   ├── head.tsx
│       │   │   │   └── page.tsx
│       │   │   ├── 📁 input-layer/  # Pagina Input Layer
│       │   │   │   ├── head.tsx
│       │   │   │   └── page.tsx
│       │   │   ├── 📁 output-layer/ # Pagina Output Layer
│       │   │   │   ├── head.tsx
│       │   │   │   └── page.tsx
│       │   │   ├── 📁 publishing/   # Pagina Publishing
│       │   │   │   ├── head.tsx
│       │   │   │   └── page.tsx
│       │   │   ├── 📁 why-exists/    # Pagina Why Exists
│       │   │   │   ├── head.tsx
│       │   │   │   └── page.tsx
│       │   │   ├── head.tsx          # Head globale
│       │   │   ├── icon.png          # Icona app
│       │   │   ├── icon.svg          # Icona app SVG
│       │   │   ├── layout.tsx        # Layout principale
│       │   │   └── page.tsx          # Homepage
│       │   │
│       │   ├── 📁 assets/            # Asset del codice
│       │   │   ├── 📁 icons/         # Icone SVG
│       │   │   │   ├── chevron.svg
│       │   │   │   └── hamburger.svg
│       │   │   └── 📁 images/        # Immagini
│       │   │       └── houseblock-logo.svg
│       │   │
│       │   ├── 📁 components/        # Componenti React
│       │   │   ├── 📁 footer/        # Footer component
│       │   │   │   ├── Footer.module.scss
│       │   │   │   └── Footer.tsx
│       │   │   ├── 📁 icons/         # Componenti icone
│       │   │   │   └── DoubleSpiraleIcon.tsx
│       │   │   ├── 📁 nav/           # Navigation component
│       │   │   │   ├── Nav.module.scss
│       │   │   │   └── Nav.tsx
│       │   │   ├── 📁 page/          # Componenti pagina
│       │   │   │   ├── 📁 animation/ # Sistema di animazione 3D
│       │   │   │   │   ├── 📁 constants/    # Configurazioni
│       │   │   │   │   │   ├── sceneConfig.js
│       │   │   │   │   │   └── textureMap.js
│       │   │   │   │   ├── 📁 loaders/      # Caricatori asset
│       │   │   │   │   │   ├── assetLoader.js
│       │   │   │   │   │   ├── globalLoaders.js
│       │   │   │   │   │   └── textureLoader.js
│       │   │   │   │   ├── 📁 orchestrator/ # Orchestratore principale
│       │   │   │   │   │   └── main.js
│       │   │   │   │   ├── 📁 particleObjects/ # Oggetti particelle
│       │   │   │   │   │   ├── house.js
│       │   │   │   │   │   ├── minecraftScene.js
│       │   │   │   │   │   ├── sparseParticleMesh.js
│       │   │   │   │   │   └── tree.js
│       │   │   │   │   ├── 📁 rendering/     # Loop di rendering
│       │   │   │   │   │   └── renderLoop.js
│       │   │   │   │   ├── 📁 scene/        # Setup scena Three.js
│       │   │   │   │   │   ├── camera.js
│       │   │   │   │   │   ├── controls.js
│       │   │   │   │   │   ├── lighting.js
│       │   │   │   │   │   ├── postProcessing.js
│       │   │   │   │   │   ├── renderer.js
│       │   │   │   │   │   └── scene.js
│       │   │   │   │   ├── 📁 shaders/      # Shader GLSL
│       │   │   │   │   │   ├── explosionVertexShader.glsl
│       │   │   │   │   │   ├── explosionVertexShaderTwo.glsl
│       │   │   │   │   │   ├── firefliesFragmentShader.glsl
│       │   │   │   │   │   ├── firefliesFragmentShaderTwo.glsl
│       │   │   │   │   │   ├── firefliesVertexShader_ETHLogo_Slow.glsl
│       │   │   │   │   │   ├── firefliesVertexShader_ETHLogo.glsl
│       │   │   │   │   │   ├── firefliesVertexShader.glsl
│       │   │   │   │   │   └── fragment_shader.glsl
│       │   │   │   │   ├── 📁 threeJsAssets/ # Asset Three.js custom
│       │   │   │   │   │   ├── EffectComposer.js
│       │   │   │   │   │   ├── GLTFLoader.js
│       │   │   │   │   │   ├── MaskPass.js
│       │   │   │   │   │   ├── OrbitControls.js
│       │   │   │   │   │   ├── Pass.js
│       │   │   │   │   │   ├── RenderPass.js
│       │   │   │   │   │   ├── ShaderPass.js
│       │   │   │   │   │   ├── 📁 shaders/
│       │   │   │   │   │   │   ├── CopyShader.js
│       │   │   │   │   │   │   ├── DigitalGlitch.js
│       │   │   │   │   │   │   └── LuminosityHighPassShader.js
│       │   │   │   │   │   └── UnrealBloomPass.js
│       │   │   │   │   ├── 📁 utils/        # Utility
│       │   │   │   │   │   ├── colors.js
│       │   │   │   │   │   ├── device.js
│       │   │   │   │   │   ├── helpers.js
│       │   │   │   │   │   ├── webp.js
│       │   │   │   │   │   └── webpDetection.js
│       │   │   │   │   ├── 📁 visualEffects/ # Effetti visivi
│       │   │   │   │   │   ├── background.js
│       │   │   │   │   │   └── fireflies.js
│       │   │   │   │   └── index.js          # Entry point animazione
│       │   │   │   ├── 📁 assets/           # Asset duplicati (legacy?)
│       │   │   │   │   ├── EffectComposer.js
│       │   │   │   │   ├── GLTFLoader.js
│       │   │   │   │   ├── MaskPass.js
│       │   │   │   │   ├── OrbitControls.js
│       │   │   │   │   ├── Pass.js
│       │   │   │   │   ├── RenderPass.js
│       │   │   │   │   ├── ShaderPass.js
│       │   │   │   │   ├── 📁 shaders/
│       │   │   │   │   │   ├── CopyShader.js
│       │   │   │   │   │   ├── DigitalGlitch.js
│       │   │   │   │   │   └── LuminosityHighPassShader.js
│       │   │   │   │   └── UnrealBloomPass.js
│       │   │   │   ├── animation-context.tsx # Context React per animazioni
│       │   │   │   ├── Content.module.scss   # Stili componente Content
│       │   │   │   ├── Content.tsx           # Componente Content principale
│       │   │   │   └── Head.tsx              # Head component
│       │   │   ├── 📁 silviculture-society-members/ # Componente membri
│       │   │   │   ├── SilvicultureSociety.module.scss
│       │   │   │   └── SilvicultureSociety.tsx
│       │   │   └── Link.tsx                  # Componente Link custom
│       │   │
│       │   ├── 📁 styles/            # Stili globali
│       │   │   ├── 📁 assets/        # Asset per stili
│       │   │   │   ├── ETH-loading.svg
│       │   │   │   ├── houseblock-loading.svg
│       │   │   │   └── twitter.png
│       │   │   ├── global.scss       # Stili globali
│       │   │   ├── reset.scss        # CSS reset
│       │   │   └── variables.scss    # Variabili SCSS
│       │   │
│       │   └── 📁 utils/             # Utility functions
│       │       └── useScrollDirection.ts # Hook scroll direction
│       │
│       ├── COMMANDS.md                # Comandi disponibili
│       ├── DOCKER.md                  # Documentazione Docker
│       ├── Dockerfile                 # Dockerfile produzione
│       ├── Dockerfile.dev             # Dockerfile sviluppo
│       ├── docker-compose.yml         # Docker Compose sviluppo
│       ├── docker-compose.prod.yml    # Docker Compose produzione
│       ├── next-env.d.ts              # Tipi Next.js
│       ├── next.config.js             # Configurazione Next.js
│       ├── package.json               # Dipendenze progetto
│       ├── tsconfig.json              # Configurazione TypeScript
│       └── vercel.json                # Configurazione Vercel
│
├── 📁 infra/                         # Infrastruttura e configurazioni
│   ├── 📁 db/                        # Database
│   │   ├── 📁 migrations/            # Migrazioni database
│   │   └── 📁 schemas/                # Schemi database
│   ├── 📁 docker/                    # Configurazioni Docker
│   │   └── docker-compose.yml
│   ├── 📁 grafana/                   # Configurazioni Grafana
│   │   ├── 📁 dashboards/            # Dashboard Grafana
│   │   └── 📁 provisioning/          # Provisioning Grafana
│   ├── 📁 n8n/                       # Configurazioni n8n
│   │   ├── 📁 credentials/           # Credenziali n8n
│   │   └── 📁 workflows/             # Workflow n8n
│   └── 📁 scripts/                    # Script infrastruttura
│
├── 📁 packages/                      # Package condivisi (monorepo)
│   ├── 📁 hb-shared-ai/              # Package AI condiviso
│   │   ├── 📁 __tests__/             # Test
│   │   ├── 📁 docs/                  # Documentazione
│   │   ├── 📁 src/                   # Codice sorgente
│   │   └── package.json
│   ├── 📁 hb-shared-config/          # Package configurazione condivisa
│   │   ├── 📁 __tests__/             # Test
│   │   ├── 📁 docs/                  # Documentazione
│   │   ├── 📁 src/                   # Codice sorgente
│   │   └── package.json
│   └── 📁 hb-shared-types/           # Package tipi TypeScript condivisi
│       ├── 📁 __tests__/             # Test
│       ├── 📁 docs/                  # Documentazione
│       ├── 📁 src/                   # Codice sorgente
│       └── package.json
│
├── 📁 public/                        # File pubblici root (vuoto)
│
├── 📁 services/                      # Microservizi
│   ├── 📁 ai-content-engine-ms/     # Microservizio AI Content Engine
│   │   ├── README.md
│   │   └── TODO.md
│   ├── 📁 competitor-watchdog-ms/   # Microservizio Competitor Watchdog
│   │   ├── README.md
│   │   └── TODO.md
│   ├── 📁 knowledge-base-ms/        # Microservizio Knowledge Base
│   │   ├── README.md
│   │   └── TODO.md
│   ├── 📁 news-scraper-ms/          # Microservizio News Scraper
│   │   ├── README.md
│   │   └── TODO.md
│   ├── 📁 onchain-monitor-ms/       # Microservizio Onchain Monitor
│   │   ├── README.md
│   │   └── TODO.md
│   ├── 📁 opportunity-detector-ms/  # Microservizio Opportunity Detector
│   │   ├── README.md
│   │   └── TODO.md
│   ├── 📁 sentiment-tracker-ms/     # Microservizio Sentiment Tracker
│   │   ├── README.md
│   │   └── TODO.md
│   ├── 📁 social-publisher-ms/      # Microservizio Social Publisher
│   │   ├── README.md
│   │   └── TODO.md
│   ├── 📁 telemetry-logger-ms/      # Microservizio Telemetry Logger
│   │   ├── README.md
│   │   └── TODO.md
│   ├── 📁 trend-analyzer-ms/        # Microservizio Trend Analyzer
│   │   ├── README.md
│   │   └── TODO.md
│   ├── 📁 video-generator-ms/       # Microservizio Video Generator
│   │   ├── README.md
│   │   └── TODO.md
│   └── 📁 visual-generator-ms/      # Microservizio Visual Generator
│       ├── README.md
│       └── TODO.md
│
├── 📁 src/                           # Sorgenti root (vuoto)
│
├── 📄 CONTRIBUTING.md                # Linee guida contribuzione
├── 📄 QUICK_START.md                 # Guida quick start
├── 📄 README.md                      # Documentazione principale
├── 📄 TODO.md                        # Lista TODO progetto
├── 📄 .env.example                    # Esempio variabili ambiente
├── 📄 .gitignore                     # File ignorati da Git
├── 📄 next-env.d.ts                  # Tipi Next.js root
├── 📄 next.config.js                 # Configurazione Next.js root
├── 📄 package-lock.json              # Lock file npm
├── 📄 package.json                    # Package.json root
├── 📄 pnpm-lock.yaml                 # Lock file pnpm
├── 📄 pnpm-workspace.yaml            # Configurazione workspace pnpm
├── 📄 tsconfig.json                   # Configurazione TypeScript root
└── 📄 vercel.json                     # Configurazione Vercel root
```

## Descrizione Struttura

### 🎯 **apps/**
Contiene le applicazioni principali del progetto:
- **web-landing**: Applicazione Next.js con sistema di animazioni 3D basato su Three.js
- **dashboard**: Dashboard (da implementare)
- **n8n**: Configurazione workflow automation (da implementare)

### 🏗️ **packages/**
Package condivisi in stile monorepo:
- **hb-shared-ai**: Logica AI condivisa
- **hb-shared-config**: Configurazioni condivise
- **hb-shared-types**: Tipi TypeScript condivisi

### 🔧 **services/**
Microservizi del sistema (tutti in fase di sviluppo):
- **ai-content-engine-ms**: Generazione contenuti AI
- **competitor-watchdog-ms**: Monitoraggio competitor
- **knowledge-base-ms**: Base di conoscenza
- **news-scraper-ms**: Scraping notizie
- **onchain-monitor-ms**: Monitoraggio blockchain
- **opportunity-detector-ms**: Rilevamento opportunità
- **sentiment-tracker-ms**: Analisi sentiment
- **social-publisher-ms**: Pubblicazione social
- **telemetry-logger-ms**: Logging telemetria
- **trend-analyzer-ms**: Analisi trend
- **video-generator-ms**: Generazione video
- **visual-generator-ms**: Generazione visual

### 🛠️ **infra/**
Configurazioni infrastruttura:
- **db/**: Database e migrazioni
- **docker/**: Configurazioni Docker
- **grafana/**: Dashboard e provisioning Grafana
- **n8n/**: Credenziali e workflow n8n
- **scripts/**: Script di automazione

### 🎨 **apps/web-landing/src/components/page/animation/**
Sistema di animazione 3D complesso con:
- **Three.js** per rendering 3D
- **Shader GLSL** per effetti grafici avanzati
- **Particle systems** per effetti particellari
- **Post-processing** per effetti visivi
- **Asset loaders** per caricamento modelli 3D

### 📦 **Gestione Dipendenze**
Il progetto utilizza:
- **pnpm** come package manager principale (pnpm-workspace.yaml)
- **npm** come fallback (package-lock.json presente)
- **Monorepo** structure con workspace

### 🚀 **Deploy**
- Configurazione **Vercel** (vercel.json)
- Supporto **Docker** (Dockerfile, docker-compose)
- Configurazione **Netlify** (netlify.toml)

