# 🚀 Quick Start - Docker e Vercel per web-landing

Guida rapida per avviare web-landing con Docker e deployare su Vercel.

## 📦 Setup Docker (Sviluppo Locale)

### 1. Avvia il Container

```bash
# Dalla root del progetto
cd apps/web-landing

# Avvia in background
docker-compose up -d

# Oppure in foreground (vedi i log)
docker-compose up
```

### 2. Accedi all'App

Apri il browser su: **http://localhost:3000**

### 3. Vedi i Log

```bash
docker-compose logs -f web-landing
```

### 4. Ferma il Container

```bash
docker-compose down
```

## 🏭 Test Produzione Locale

```bash
# Build e avvio produzione
docker-compose -f docker-compose.prod.yml up --build

# Accedi su http://localhost:3000
```

## ☁️ Deploy su Vercel

### Opzione 1: Deploy Automatico da GitHub (Raccomandato)

1. **Push su GitHub**:
   ```bash
   git add .
   git commit -m "feat(web-landing): add Docker and Vercel config"
   git push
   ```

2. **Connetti su Vercel**:
   - Vai su [vercel.com](https://vercel.com)
   - Clicca "Add New Project"
   - Seleziona il repository GitHub
   - Configura:
     - **Root Directory**: `apps/web-landing`
     - **Framework Preset**: Next.js
     - **Build Command**: `cd ../.. && pnpm install && pnpm --filter web-landing build`
     - **Output Directory**: `.next`
     - **Install Command**: `cd ../.. && pnpm install`

3. **Deploy!**
   - Vercel deploya automaticamente
   - Ogni push su `master` = deploy produzione
   - Ogni PR = preview deployment

### Opzione 2: Deploy da CLI

```bash
# Installa Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (dalla root)
cd apps/web-landing
vercel

# Deploy produzione
vercel --prod
```

## ✅ Checklist Pre-Deploy

- [ ] `vercel.json` presente in `apps/web-landing/`
- [ ] `next.config.js` ha `output: 'standalone'`
- [ ] `pnpm-lock.yaml` committato
- [ ] Variabili d'ambiente configurate su Vercel (se necessarie)
- [ ] Test locale funziona: `pnpm dev`

## 🔧 Comandi Utili

```bash
# Rebuild Docker (se cambi dipendenze)
docker-compose build --no-cache
docker-compose up -d

# Entra nel container
docker-compose exec web-landing sh

# Vedi lo stato
docker-compose ps

# Pulisci tutto
docker-compose down -v
```

## 📝 Note

- **Sviluppo**: Usa `docker-compose up` per hot-reload
- **Produzione**: Usa `docker-compose.prod.yml` per test locale
- **Vercel**: Gestisce automaticamente build e deploy (no Docker su Vercel)

---

**Pronto!** 🎉

