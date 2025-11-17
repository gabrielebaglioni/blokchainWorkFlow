# Docker Setup per web-landing

Guida completa per configurare e deployare web-landing con Docker.

## 📋 Indice

1. [Sviluppo Locale con Docker](#sviluppo-locale-con-docker)
2. [Build e Run Manuale](#build-e-run-manuale)
3. [Produzione con Docker](#produzione-con-docker)
4. [Deploy su Vercel](#deploy-su-vercel)
5. [Troubleshooting](#troubleshooting)

## 🚀 Sviluppo Locale con Docker

### Prerequisiti

- Docker e Docker Compose installati
- pnpm installato (per sviluppo locale opzionale)

### Avvio Rapido

```bash
# Dalla root del progetto
cd apps/web-landing

# Avvia il container in modalità sviluppo
docker-compose up -d

# Vedi i log
docker-compose logs -f

# Ferma il container
docker-compose down
```

### Cosa Succede

1. **Build dell'immagine**: Docker costruisce l'immagine usando il Dockerfile
2. **Mount del codice**: Il codice è montato come volume per hot-reload
3. **Porta 3000**: L'app è disponibile su `http://localhost:3000`
4. **Hot Reload**: Le modifiche al codice si riflettono automaticamente

### Comandi Utili

```bash
# Rebuild forzato (se cambi dipendenze)
docker-compose build --no-cache

# Entra nel container
docker-compose exec web-landing sh

# Vedi i log in tempo reale
docker-compose logs -f web-landing

# Riavvia il servizio
docker-compose restart web-landing
```

## 🔨 Build e Run Manuale

### Build dell'Immagine

```bash
# Dalla root del progetto
docker build -f apps/web-landing/Dockerfile -t houseblock-web-landing:latest .
```

### Run del Container

```bash
# Sviluppo
docker run -p 3000:3000 \
  -v $(pwd)/apps/web-landing:/app/apps/web-landing \
  -v $(pwd)/packages:/app/packages \
  houseblock-web-landing:latest \
  pnpm --filter web-landing dev

# Produzione
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  houseblock-web-landing:latest
```

## 🏭 Produzione con Docker

### Build per Produzione

```bash
# Dalla root del progetto
docker build -f apps/web-landing/Dockerfile --target runner -t houseblock-web-landing:prod .
```

### Run con Docker Compose (Produzione)

```bash
cd apps/web-landing
docker-compose -f docker-compose.prod.yml up -d
```

### Health Check

Il container include un health check automatico:

```bash
# Verifica lo stato
docker ps

# Dovresti vedere "healthy" nella colonna STATUS
```

### Variabili d'Ambiente

Crea un file `.env` nella root del progetto o passa variabili:

```bash
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e NEXT_PUBLIC_API_URL=https://api.example.com \
  houseblock-web-landing:prod
```

## ☁️ Deploy su Vercel

### Setup Iniziale

1. **Installa Vercel CLI** (opzionale, per deploy da CLI):

```bash
npm i -g vercel
```

2. **Login su Vercel**:

```bash
vercel login
```

### Deploy da CLI

```bash
# Dalla root del progetto
cd apps/web-landing

# Deploy in preview
vercel

# Deploy in produzione
vercel --prod
```

### Deploy da GitHub (Raccomandato)

1. **Connetti il Repository**:
   - Vai su [vercel.com](https://vercel.com)
   - Clicca "Add New Project"
   - Seleziona il repository GitHub
   - Vercel rileverà automaticamente Next.js

2. **Configurazione**:
   - **Root Directory**: `apps/web-landing`
   - **Build Command**: `cd ../.. && pnpm install && pnpm --filter web-landing build`
   - **Output Directory**: `.next`
   - **Install Command**: `cd ../.. && pnpm install`

3. **Environment Variables**:
   - Aggiungi variabili d'ambiente in Vercel Dashboard
   - Settings → Environment Variables

4. **Deploy Automatico**:
   - Ogni push su `master` deploya automaticamente in produzione
   - Ogni pull request crea un preview deployment

### Configurazione Vercel

Il file `vercel.json` è già configurato con:

- ✅ Build command per monorepo
- ✅ Install command con pnpm
- ✅ Security headers
- ✅ Rewrite rules

### Variabili d'Ambiente Vercel

Aggiungi queste variabili in Vercel Dashboard:

```
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### Domini Personalizzati

1. Vai su Vercel Dashboard → Project Settings → Domains
2. Aggiungi il tuo dominio
3. Configura i DNS records come indicato

## 🔍 Troubleshooting

### Problema: Container non si avvia

```bash
# Controlla i log
docker-compose logs web-landing

# Verifica che la porta 3000 non sia già in uso
lsof -i :3000

# Cambia porta in docker-compose.yml se necessario
ports:
  - "3001:3000"  # Usa 3001 invece di 3000
```

### Problema: Hot Reload non funziona

```bash
# Verifica che i volumi siano montati correttamente
docker-compose exec web-landing ls -la /app/apps/web-landing

# Rebuild senza cache
docker-compose build --no-cache
docker-compose up -d
```

### Problema: Build fallisce

```bash
# Verifica che pnpm-lock.yaml sia aggiornato
cd ../..
pnpm install

# Rebuild
docker-compose build --no-cache
```

### Problema: Vercel build fallisce

1. Verifica che `vercel.json` sia nella root di `apps/web-landing`
2. Controlla i log di build su Vercel Dashboard
3. Assicurati che `pnpm-lock.yaml` sia committato
4. Verifica che tutte le dipendenze siano in `package.json`

### Problema: Immagine troppo grande

Il Dockerfile usa multi-stage build per ottimizzare la dimensione. Se è ancora grande:

```bash
# Analizza l'immagine
docker images houseblock-web-landing:latest

# Usa dive per analizzare i layer
docker run --rm -it \
  -v /var/run/docker.sock:/var/run/docker.sock \
  wagoodman/dive:latest houseblock-web-landing:latest
```

## 📝 Note Importanti

### Per Sviluppo

- Usa `docker-compose.yml` per sviluppo locale
- Il codice è montato come volume per hot-reload
- Le modifiche si riflettono immediatamente

### Per Produzione

- Usa `docker-compose.prod.yml` per produzione
- L'immagine è ottimizzata con multi-stage build
- Non monta volumi (tutto è nell'immagine)

### Per Vercel

- Vercel gestisce automaticamente il build
- Non serve Docker su Vercel (usa serverless)
- `vercel.json` configura il build per monorepo

## 🎯 Workflow Consigliato

### Sviluppo Locale

```bash
# Opzione 1: Docker (isolato)
cd apps/web-landing
docker-compose up

# Opzione 2: pnpm diretto (più veloce)
cd ../..
pnpm dev
```

### Test Produzione Locale

```bash
cd apps/web-landing
docker-compose -f docker-compose.prod.yml up
```

### Deploy

```bash
# Push su GitHub → Deploy automatico su Vercel
git push origin master
```

---

**Pronto per il deploy!** 🚀

