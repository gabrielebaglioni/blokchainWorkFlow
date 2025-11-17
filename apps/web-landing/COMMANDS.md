# 🚀 Comandi - web-landing

Guida completa con tutti i comandi per sviluppo, build, test e deploy di web-landing.

## 📋 Indice

- [Sviluppo Locale](#sviluppo-locale)
- [Docker](#docker)
- [Build](#build)
- [Test](#test)
- [Deploy Vercel](#deploy-vercel)
- [Deploy Docker](#deploy-docker)
- [Troubleshooting](#troubleshooting)

---

## 🛠️ Sviluppo Locale

### Avvio Server di Sviluppo

```bash
# Dalla root del progetto
pnpm dev

# Oppure esplicitamente
pnpm --filter web-landing dev

# Dalla cartella web-landing
cd apps/web-landing
pnpm dev
```

**Risultato**: Server su `http://localhost:3000` con hot-reload

### Avvio con Porta Personalizzata

```bash
# Cambia porta in package.json o usa variabile d'ambiente
PORT=3001 pnpm dev
```

### Vedi Log in Tempo Reale

```bash
# Se usi pnpm direttamente, i log appaiono nel terminale
# Per Docker, vedi sezione Docker
```

### Ferma il Server

```bash
# Premi Ctrl+C nel terminale dove è in esecuzione
```

---

## 🐳 Docker

### Sviluppo con Docker

```bash
# Dalla cartella web-landing
cd apps/web-landing

# Avvia container in background
docker-compose up -d

# Avvia container in foreground (vedi log)
docker-compose up

# Avvia e rebuild
docker-compose up --build
```

**Risultato**: Server su `http://localhost:3000` con hot-reload

### Produzione Locale con Docker

```bash
# Dalla cartella web-landing
cd apps/web-landing

# Build e avvio produzione
docker-compose -f docker-compose.prod.yml up --build

# Solo build
docker-compose -f docker-compose.prod.yml build

# Avvio senza rebuild
docker-compose -f docker-compose.prod.yml up
```

### Comandi Docker Utili

```bash
# Vedi log del container
docker-compose logs -f web-landing

# Vedi log ultime 100 righe
docker-compose logs --tail=100 web-landing

# Entra nel container
docker-compose exec web-landing sh

# Riavvia container
docker-compose restart web-landing

# Ferma container
docker-compose down

# Ferma e rimuovi volumi
docker-compose down -v

# Rebuild senza cache
docker-compose build --no-cache

# Vedi container attivi
docker-compose ps

# Vedi stato container
docker ps | grep web-landing
```

### Build Immagine Docker Manuale

```bash
# Dalla root del progetto
docker build -f apps/web-landing/Dockerfile -t houseblock-web-landing:latest .

# Build per produzione
docker build -f apps/web-landing/Dockerfile --target runner -t houseblock-web-landing:prod .

# Run immagine buildata
docker run -p 3000:3000 houseblock-web-landing:latest

# Run con variabili d'ambiente
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  houseblock-web-landing:prod
```

---

## 🔨 Build

### Build Locale

```bash
# Dalla root
pnpm --filter web-landing build

# Dalla cartella web-landing
cd apps/web-landing
pnpm build
```

**Output**: Cartella `.next` con build ottimizzato

### Build per Produzione

```bash
# Build con ottimizzazioni
NODE_ENV=production pnpm --filter web-landing build

# Build e analizza bundle size
ANALYZE=true pnpm --filter web-landing build
```

### Verifica Build

```bash
# Dopo il build, avvia server produzione locale
cd apps/web-landing
pnpm start

# Oppure
pnpm --filter web-landing start
```

**Risultato**: Server produzione su `http://localhost:3000`

---

## 🧪 Test

### Lint

```bash
# Dalla root
pnpm --filter web-landing lint

# Dalla cartella web-landing
cd apps/web-landing
pnpm lint

# Fix automatico
pnpm lint --fix
```

### Type Check

```bash
# Dalla root
pnpm --filter web-landing type-check

# Oppure direttamente
cd apps/web-landing
npx tsc --noEmit
```

### Test (se configurati)

```bash
# Dalla root
pnpm --filter web-landing test

# Watch mode
pnpm --filter web-landing test:watch

# Coverage
pnpm --filter web-landing test:coverage
```

---

## ☁️ Deploy Vercel

### Primo Deploy

#### Metodo 1: GitHub Integration (Raccomandato)

```bash
# 1. Push su GitHub
git add .
git commit -m "feat(web-landing): ready for Vercel deploy"
git push origin master

# 2. Vai su vercel.com
# 3. Clicca "Add New Project"
# 4. Seleziona repository
# 5. Configura:
#    - Root Directory: apps/web-landing
#    - Build Command: cd ../.. && pnpm install && pnpm --filter web-landing build
#    - Output Directory: .next
#    - Install Command: cd ../.. && pnpm install
# 6. Deploy!
```

#### Metodo 2: Vercel CLI

```bash
# Installa Vercel CLI
npm i -g vercel

# Login
vercel login

# Dalla cartella web-landing
cd apps/web-landing

# Deploy preview
vercel

# Deploy produzione
vercel --prod

# Deploy con specifica environment
vercel --prod --env NODE_ENV=production
```

### Deploy Successivi

```bash
# Automatico: ogni push su master = deploy produzione
git push origin master

# Manuale da CLI
cd apps/web-landing
vercel --prod
```

### Comandi Vercel Utili

```bash
# Vedi deployment attivi
vercel ls

# Vedi log di un deployment
vercel logs [deployment-url]

# Rimuovi deployment
vercel rm [deployment-url]

# Vedi info progetto
vercel inspect

# Apri dashboard
vercel dashboard
```

### Variabili d'Ambiente Vercel

```bash
# Aggiungi variabile da CLI
vercel env add VARIABLE_NAME

# Oppure da Dashboard:
# Settings → Environment Variables → Add
```

### Domini Personalizzati

```bash
# Aggiungi dominio da CLI
vercel domains add yourdomain.com

# Oppure da Dashboard:
# Settings → Domains → Add Domain
```

---

## 🐳 Deploy Docker

### Build Immagine Produzione

```bash
# Dalla root
docker build -f apps/web-landing/Dockerfile \
  --target runner \
  -t houseblock-web-landing:prod \
  -t houseblock-web-landing:latest \
  .
```

### Tag per Registry

```bash
# Tag per Docker Hub
docker tag houseblock-web-landing:prod username/houseblock-web-landing:latest

# Tag per registry privato
docker tag houseblock-web-landing:prod registry.example.com/houseblock-web-landing:latest
```

### Push su Registry

```bash
# Login
docker login

# Push
docker push username/houseblock-web-landing:latest
```

### Deploy su Server

```bash
# SSH sul server
ssh user@server

# Pull immagine
docker pull username/houseblock-web-landing:latest

# Run container
docker run -d \
  -p 3000:3000 \
  --name web-landing \
  --restart unless-stopped \
  -e NODE_ENV=production \
  username/houseblock-web-landing:latest

# Oppure con docker-compose
# Copia docker-compose.prod.yml sul server
docker-compose -f docker-compose.prod.yml up -d
```

### Update Deploy

```bash
# Sul server
docker pull username/houseblock-web-landing:latest
docker stop web-landing
docker rm web-landing
docker run -d \
  -p 3000:3000 \
  --name web-landing \
  --restart unless-stopped \
  -e NODE_ENV=production \
  username/houseblock-web-landing:latest
```

---

## 🔍 Troubleshooting

### Porta 3000 già in uso

```bash
# Trova processo che usa porta 3000
lsof -i :3000

# Kill processo
kill -9 [PID]

# Oppure cambia porta
PORT=3001 pnpm dev
```

### Docker build fallisce

```bash
# Pulisci cache Docker
docker system prune -a

# Rebuild senza cache
docker-compose build --no-cache

# Verifica Dockerfile
docker build -f apps/web-landing/Dockerfile --no-cache .
```

### Hot Reload non funziona (Docker)

```bash
# Verifica volumi montati
docker-compose exec web-landing ls -la /app/apps/web-landing

# Riavvia container
docker-compose restart web-landing

# Rebuild
docker-compose up --build
```

### Vercel build fallisce

```bash
# Verifica configurazione
cat apps/web-landing/vercel.json

# Test build locale
cd ../..
pnpm install
pnpm --filter web-landing build

# Verifica pnpm-lock.yaml committato
git status | grep pnpm-lock.yaml
```

### Errori di dipendenze

```bash
# Pulisci e reinstalla
rm -rf node_modules
rm -rf apps/web-landing/node_modules
pnpm install

# Verifica lock file
pnpm install --frozen-lockfile
```

### Next.js cache issues

```bash
# Pulisci cache Next.js
rm -rf apps/web-landing/.next

# Rebuild
pnpm --filter web-landing build
```

---

## 📊 Comandi di Monitoraggio

### Vedi Dimensione Bundle

```bash
# Build con analisi
ANALYZE=true pnpm --filter web-landing build

# Oppure
cd apps/web-landing
ANALYZE=true pnpm build
```

### Vedi Utilizzo Risorse (Docker)

```bash
# Stats container
docker stats houseblock-web-landing

# Vedi processi nel container
docker-compose exec web-landing ps aux
```

### Log Production

```bash
# Vercel
vercel logs [deployment-url]

# Docker
docker-compose logs -f web-landing

# Docker produzione
docker logs -f houseblock-web-landing-prod
```

---

## 🎯 Workflow Consigliato

### Sviluppo Quotidiano

```bash
# 1. Avvia server sviluppo
pnpm dev

# 2. Sviluppa e testa su http://localhost:3000

# 3. Prima di commit
pnpm --filter web-landing lint
pnpm --filter web-landing build  # Verifica che buildi

# 4. Commit e push
git add .
git commit -m "feat(web-landing): ..."
git push
```

### Deploy Produzione

```bash
# 1. Test build locale
pnpm --filter web-landing build
pnpm --filter web-landing start  # Verifica funziona

# 2. Test Docker produzione locale
cd apps/web-landing
docker-compose -f docker-compose.prod.yml up --build

# 3. Push su GitHub (deploy automatico Vercel)
git push origin master

# 4. Verifica deploy su Vercel Dashboard
```

### Hotfix Urgente

```bash
# 1. Fix rapido
# ... modifica codice ...

# 2. Build e test locale veloce
pnpm --filter web-landing build

# 3. Deploy immediato
cd apps/web-landing
vercel --prod

# 4. Commit dopo
git add .
git commit -m "fix(web-landing): ..."
git push
```

---

## 📝 Note Importanti

### Sviluppo

- ✅ Usa `pnpm dev` per sviluppo locale (più veloce)
- ✅ Usa Docker solo se vuoi ambiente isolato
- ✅ Hot-reload funziona con entrambi i metodi

### Produzione

- ✅ Vercel: Deploy automatico da GitHub (raccomandato)
- ✅ Docker: Per server propri o VPS
- ✅ Test sempre build locale prima di deploy

### Performance

- ✅ Build produzione ottimizza automaticamente
- ✅ Next.js genera static assets
- ✅ Immagini ottimizzate automaticamente

---

## 🆘 Comandi di Emergenza

```bash
# Reset completo
rm -rf node_modules apps/*/node_modules packages/*/node_modules
rm -rf apps/web-landing/.next
pnpm install

# Docker reset completo
docker-compose down -v
docker system prune -a
docker-compose up --build

# Vercel reset (se necessario)
vercel rm --yes
# Poi riconnetti progetto
```

---

**Tutti i comandi pronti!** 🚀

Per domande, consulta:
- `DOCKER.md` - Documentazione Docker completa
- `QUICK_START_DOCKER.md` - Quick start
- `README.md` - Documentazione generale

