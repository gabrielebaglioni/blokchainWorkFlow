# 🚀 Deploy su Vercel - Guida Completa

## ⚠️ IMPORTANTE: Vercel NON usa Docker

Vercel gestisce automaticamente:
- ✅ Build del progetto
- ✅ Serverless functions
- ✅ CDN e ottimizzazioni
- ✅ SSL/HTTPS
- ✅ Deploy automatico

**Non serve Docker per Vercel!**

## 📋 Prerequisiti

- [x] Repository su GitHub
- [x] Account Vercel (gratuito)
- [x] `vercel.json` configurato
- [x] `pnpm-lock.yaml` committato
- [x] `next.config.js` configurato

## 🎯 Deploy Automatico da GitHub (Raccomandato)

### Step 1: Push su GitHub

```bash
# Assicurati che tutto sia committato
git add .
git commit -m "feat(web-landing): ready for Vercel deploy"
git push origin master
```

### Step 2: Connetti su Vercel

1. Vai su [vercel.com](https://vercel.com)
2. Clicca **"Add New Project"**
3. Seleziona il repository GitHub
4. Vercel rileverà automaticamente Next.js

### Step 3: Configurazione Monorepo

**IMPORTANTE**: Configura questi settaggi:

```
Root Directory: apps/web-landing
```

**Build Settings:**
```
Framework Preset: Next.js (auto-rilevato)
Build Command: cd ../.. && pnpm install && pnpm --filter web-landing build
Output Directory: .next
Install Command: cd ../.. && pnpm install
```

**Oppure lascia vuoto** - `vercel.json` gestisce tutto automaticamente!

### Step 4: Environment Variables (se necessario)

Se hai variabili d'ambiente:
- Vai su **Settings → Environment Variables**
- Aggiungi le variabili necessarie
- Esempio: `NEXT_PUBLIC_APP_URL=https://your-app.vercel.app`

### Step 5: Deploy!

Clicca **"Deploy"** - Vercel farà tutto automaticamente!

## 🔧 Configurazione Attuale

### vercel.json

Il file `vercel.json` è già configurato con:

```json
{
  "version": 2,
  "buildCommand": "cd ../.. && pnpm --filter web-landing build",
  "devCommand": "cd ../.. && pnpm --filter web-landing dev",
  "installCommand": "cd ../.. && pnpm install",
  "framework": "nextjs",
  "outputDirectory": ".next"
}
```

✅ **Tutto pronto!**

### next.config.js

```js
output: 'standalone'  // Per Docker, ma Vercel lo ignora (usa il suo sistema)
```

✅ **OK** - Vercel usa il suo sistema di build, ignora `standalone`

## 📝 Checklist Pre-Deploy

- [x] `vercel.json` presente e configurato
- [x] `next.config.js` configurato
- [x] `package.json` con script corretti
- [x] `pnpm-lock.yaml` committato
- [x] Repository su GitHub
- [ ] Variabili d'ambiente configurate (se necessarie)
- [ ] Test build locale funziona

### Test Build Locale

```bash
# Dalla root
pnpm --filter web-landing build

# Se funziona, Vercel funzionerà!
```

## 🚀 Deploy Manuale da CLI (Opzionale)

Se preferisci usare la CLI:

```bash
# Installa Vercel CLI
npm i -g vercel

# Login
vercel login

# Dalla root del progetto
cd apps/web-landing

# Deploy preview
vercel

# Deploy produzione
vercel --prod
```

## 🔄 Deploy Automatico

Dopo il primo deploy:

- ✅ **Ogni push su `master`** → Deploy produzione automatico
- ✅ **Ogni Pull Request** → Preview deployment automatico
- ✅ **Ogni commit** → Nuovo deployment

## 🌐 Domini Personalizzati

1. Vai su **Project Settings → Domains**
2. Aggiungi il tuo dominio
3. Configura i DNS records come indicato da Vercel

## 📊 Monitoraggio

- **Dashboard**: Vedi tutti i deployment su vercel.com
- **Logs**: Vedi i log di build e runtime
- **Analytics**: Metriche di performance (con Vercel Analytics)

## ⚠️ Note Importanti

### Docker

- ❌ **NON serve** per Vercel
- ✅ Docker è solo per:
  - Test produzione locale
  - Deploy su server propri/VPS
  - Non per Vercel!

### Build

- Vercel usa il suo sistema di build
- Non usa Docker
- Gestisce automaticamente Next.js
- Ottimizza automaticamente

### Monorepo

- ✅ Vercel supporta monorepo
- ✅ Configura `Root Directory: apps/web-landing`
- ✅ `vercel.json` gestisce i comandi

## 🆘 Troubleshooting

### Build fallisce

```bash
# Test build locale
cd ../..
pnpm install
pnpm --filter web-landing build

# Se funziona localmente, il problema è nella configurazione Vercel
# Verifica Root Directory e Build Command
```

### Errori pnpm

```bash
# Assicurati che pnpm-lock.yaml sia committato
git status | grep pnpm-lock.yaml

# Se manca
pnpm install
git add pnpm-lock.yaml
git commit -m "chore: add pnpm-lock.yaml"
git push
```

### Variabili d'ambiente

- Aggiungi in Vercel Dashboard
- Settings → Environment Variables
- Riavvia deployment dopo averle aggiunte

## ✅ Pronto per Deploy!

1. **Push su GitHub**
2. **Connetti su Vercel**
3. **Configura Root Directory: `apps/web-landing`**
4. **Deploy!**

**Non serve Docker!** Vercel fa tutto automaticamente! 🚀

