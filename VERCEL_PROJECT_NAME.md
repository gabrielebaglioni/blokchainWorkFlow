# 🏷️ Cambiare Nome Progetto Vercel

## 📝 Passi per Cambiare il Nome

### 1. Nella Dashboard Vercel (dove sei ora)

Nella sezione **"Project Name"**:

1. **Modifica il campo** che contiene `web-landing`
2. **Scrivi**: `HomeBlock-web-landing` (o `homeblock-web-landing`)
   - ⚠️ Vercel non permette `/` nel nome del progetto
   - ⚠️ Usa `-` o `_` invece
   - ⚠️ Il nome deve essere lowercase

3. **Clicca "Save"**

### 2. Configura Root Directory

**IMPORTANTE**: Prima di salvare, vai su **"Build and Deployment Settings"**:

1. Clicca su **"Build and Deployment"** nel menu laterale sinistro
2. Trova **"Root Directory"**
3. **Attiva il toggle** (se non è attivo)
4. **Inserisci**: `apps/web-landing`
5. **Salva**

### 3. Verifica Build Settings

Nella stessa sezione "Build and Deployment":

- **Framework Preset**: Next.js
- **Build Command**: (lascia vuoto - vercel.json lo gestisce)
- **Output Directory**: `.next`
- **Install Command**: (lascia vuoto - vercel.json lo gestisce)

## ✅ Nome Suggerito

Vercel non permette `/` nel nome, quindi usa:

- ✅ `homeblock-web-landing` (raccomandato)
- ✅ `HomeBlock-web-landing` (se Vercel accetta maiuscole)
- ❌ `HomeBlock/web-landing` (NON funziona - `/` non permesso)

## 🔄 Dopo il Cambio

1. Vercel riavvierà automaticamente il deploy
2. Il nuovo URL sarà: `https://homeblock-web-landing-xxx.vercel.app`
3. Puoi anche configurare un dominio personalizzato

## 📍 URL Finale

Dopo la configurazione, il progetto sarà accessibile su:
- `https://homeblock-web-landing-[hash].vercel.app`
- Oppure il dominio personalizzato che configuri

