# 🔍 Audit Struttura - web-landing

Verifica completa della struttura di `apps/web-landing/` e coerenza con l'architettura monorepo.

## ✅ Struttura Corretta

### File Essenziali

```
apps/web-landing/
├── package.json          ✅ Configurazione package
├── next.config.js        ✅ Config Next.js (con output: standalone)
├── tsconfig.json         ✅ Config TypeScript
├── vercel.json           ✅ Config Vercel deploy
├── Dockerfile            ✅ Build Docker
├── .dockerignore         ✅ File esclusi da Docker
├── .gitignore            ✅ File esclusi da Git
├── docker-compose.yml    ✅ Docker dev
├── docker-compose.prod.yml ✅ Docker produzione
│
├── src/                  ✅ Codice sorgente
│   ├── app/              ✅ Next.js App Router
│   ├── components/       ✅ Componenti React
│   ├── assets/           ✅ Assets (icons, images)
│   ├── styles/           ✅ Stili SCSS
│   └── utils/            ✅ Utilities
│
├── public/               ✅ File statici pubblici
│   └── assets/           ✅ Immagini, SVG, modelli 3D
│
└── Documentazione        ✅
    ├── COMMANDS.md       ✅ Tutti i comandi
    ├── DOCKER.md         ✅ Guida Docker completa
    └── QUICK_START_DOCKER.md ✅ Quick start
```

## 📦 node_modules - Analisi

### Situazione Attuale

**`node_modules/` dentro web-landing è presente** - Questo è **NORMALE** se:

1. ✅ Hai fatto `pnpm install` dalla root (pnpm crea node_modules locali)
2. ✅ Hai fatto `cd apps/web-landing && pnpm install` (installazione locale)
3. ✅ È nel `.gitignore` (corretto ✅)

### Comportamento pnpm in Monorepo

pnpm può creare `node_modules` in due modi:

1. **Symlink dalla root** (preferito):
   ```
   apps/web-landing/node_modules -> symlink a root/node_modules
   ```

2. **Directory locale** (quando installi localmente):
   ```
   apps/web-landing/node_modules/ (directory reale)
   ```

**Entrambi sono corretti!** pnpm gestisce automaticamente.

### Verifica

```bash
# Verifica se è symlink
ls -la apps/web-landing/node_modules

# Se vedi "->" è un symlink (OK)
# Se è una directory normale, è OK comunque
```

### Raccomandazione

✅ **Lascia così com'è** - pnpm gestisce automaticamente. È già nel `.gitignore`.

## 🐳 Docker - Verifica

### Container Status

```bash
# Verifica container
docker ps | grep web-landing

# Se non è in esecuzione
docker start houseblock-web-landing

# Vedi log
docker logs -f houseblock-web-landing
```

### Accesso Localhost

**Se il container è in esecuzione:**
- URL: `http://localhost:3000`
- Porta: `3000` (configurata in docker-compose.yml)

**Se non funziona:**
```bash
# Verifica porta
lsof -i :3000

# Riavvia container
docker restart houseblock-web-landing
```

## 📁 File da Verificare

### ✅ Presenti e Corretti

- [x] `package.json` - Configurazione corretta
- [x] `next.config.js` - Ha `output: 'standalone'` per Docker
- [x] `tsconfig.json` - Config TypeScript
- [x] `vercel.json` - Config Vercel
- [x] `Dockerfile` - Multi-stage build
- [x] `.gitignore` - Include node_modules, .next, etc.
- [x] `.dockerignore` - Esclude file non necessari

### ⚠️ File da Controllare

- [ ] `.env.local` - Non dovrebbe essere committato (è nel .gitignore ✅)
- [ ] `.next/` - Build output (non committato ✅)
- [ ] `node_modules/` - Dipendenze (non committato ✅)

## 🏗️ Architettura Monorepo

### Coerenza con Struttura

✅ **web-landing è correttamente posizionato in `apps/`**

```
houseblock/
├── apps/
│   └── web-landing/     ✅ App Next.js
├── services/            ✅ Microservizi
├── packages/            ✅ Pacchetti condivisi
└── infra/               ✅ Infrastruttura
```

### Dipendenze

✅ **web-landing usa solo:**
- Dipendenze proprie (Next.js, React, Three.js)
- **NON** importa direttamente da altri workspace (corretto ✅)
- **NON** condivide codice con services (corretto ✅)

### Build e Deploy

✅ **Configurazione corretta per:**
- Docker (standalone output)
- Vercel (monorepo config)
- Sviluppo locale (pnpm workspace)

## 🔧 Problemi Comuni e Soluzioni

### Container non parte

```bash
# 1. Vedi errori
docker logs houseblock-web-landing

# 2. Rebuild
docker-compose -f infra/docker/docker-compose.yml build web-landing

# 3. Riavvia
docker-compose -f infra/docker/docker-compose.yml up -d web-landing
```

### Porta 3000 occupata

```bash
# Trova processo
lsof -i :3000

# Kill processo
kill -9 [PID]

# Oppure cambia porta in docker-compose.yml
```

### node_modules confuso

```bash
# Pulisci tutto
rm -rf node_modules apps/web-landing/node_modules

# Reinstalla dalla root
pnpm install
```

## ✅ Checklist Finale

- [x] Struttura file corretta
- [x] Configurazioni presenti
- [x] node_modules gestito correttamente (gitignored)
- [x] Docker configurato
- [x] Vercel configurato
- [x] Documentazione completa
- [ ] Container Docker funzionante
- [ ] Localhost accessibile

## 🎯 Conclusione

**Struttura: ✅ CORRETTA**

- Tutti i file necessari sono presenti
- Configurazioni corrette
- node_modules è gestito correttamente (gitignored)
- Architettura monorepo rispettata
- Pronto per sviluppo e deploy

**Prossimi passi:**
1. Verifica che il container Docker parta
2. Accedi a http://localhost:3000
3. Testa funzionalità
4. Deploy su Vercel quando pronto

---

**Tutto OK!** 🚀

