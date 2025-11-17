# 🔧 Fix Vercel Deploy - Root Directory

## ⚠️ Problema Attuale

Vercel non trova Next.js perché il **Root Directory** non è configurato correttamente.

## ✅ Soluzione: Configurazione Dashboard

### Step 1: Vai su Settings

1. Apri: https://vercel.com/gabrielebaglionis-projects/web-landing/settings
2. Clicca su **"General"** nel menu laterale

### Step 2: Configura Root Directory

Nella sezione **"Root Directory"**:

1. **Attiva il toggle** "Root Directory" (se non è già attivo)
2. **Inserisci esattamente**: `apps/web-landing`
   - ⚠️ IMPORTANTE: Deve essere esattamente `apps/web-landing` (con la barra `/`)
   - ⚠️ NON `apps/web-landing/` (senza barra finale)
   - ⚠️ NON `./apps/web-landing`

### Step 3: Verifica Build Settings

Nella sezione **"Build & Development Settings"**:

- **Framework Preset**: Next.js (dovrebbe essere auto-rilevato)
- **Build Command**: (lascia vuoto - vercel.json lo gestisce)
- **Output Directory**: `.next` (dovrebbe essere auto-rilevato)
- **Install Command**: (lascia vuoto - vercel.json lo gestisce)

### Step 4: Salva

1. Clicca **"Save"** in fondo alla pagina
2. Vercel riavvierà automaticamente il deploy

## 🔍 Verifica

Dopo aver salvato, verifica:

1. Vai su **"Deployments"**
2. Dovresti vedere un nuovo deployment in corso
3. Se fallisce ancora, controlla i log del build

## 📝 Note Importanti

- Il Root Directory **deve** essere `apps/web-landing` (non `apps/web-landing/`)
- Dopo aver cambiato il Root Directory, Vercel fa un nuovo deploy automatico
- Se il deploy fallisce, controlla i log per vedere se trova il `package.json`

## 🆘 Se Non Funziona

Se dopo aver configurato il Root Directory il deploy fallisce ancora:

1. **Verifica che il Root Directory sia salvato**:
   - Ricarica la pagina settings
   - Verifica che `apps/web-landing` sia ancora lì

2. **Controlla i log del build**:
   - Vai su Deployments → Clicca sul deployment fallito
   - Vedi i log per capire dove cerca Next.js

3. **Prova a rimuovere e riconnettere**:
   - Settings → Danger Zone → Disconnect Project
   - Poi riconnetti il repository

## ✅ Dopo la Configurazione

Una volta configurato correttamente, ogni push su `master` farà un deploy automatico!

