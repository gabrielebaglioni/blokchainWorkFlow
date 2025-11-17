# 🚀 Setup Vercel - Configurazione Necessaria

## ⚠️ IMPORTANTE: Configurazione Dashboard

Il `rootDirectory` non può essere impostato in `vercel.json`. Deve essere configurato dalla **Dashboard Vercel**.

## 📋 Passi da Fare

### 1. Vai su Vercel Dashboard

Apri: https://vercel.com/gabrielebaglionis-projects

### 2. Seleziona il Progetto

Clicca sul progetto `web-landing` o creane uno nuovo.

### 3. Vai su Settings

Clicca su **Settings** → **General**

### 4. Configura Root Directory

Nella sezione **Root Directory**, imposta:

```
apps/web-landing
```

### 5. Verifica Build Settings

Assicurati che siano:
- **Framework Preset**: Next.js
- **Build Command**: (lascia vuoto, vercel.json lo gestisce)
- **Output Directory**: `.next`
- **Install Command**: (lascia vuoto, vercel.json lo gestisce)

### 6. Salva e Riavvia Deploy

Dopo aver salvato, Vercel riavvierà automaticamente il deploy.

## ✅ Alternativa: Deploy da CLI con Config

Dopo aver configurato il Root Directory dalla dashboard:

```bash
cd /Users/gabrielebaglioni/homeBlock
vercel --prod
```

## 🔍 Verifica

Dopo la configurazione, il deploy dovrebbe funzionare correttamente!

