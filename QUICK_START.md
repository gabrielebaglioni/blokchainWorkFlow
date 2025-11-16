# Quick Start - Avvio Rapido

## Cos'è pnpm?

**pnpm** (performant npm) è un package manager per Node.js, alternativo a npm e yarn.

### Perché pnpm nella monorepo?

1. **Velocità**: Più veloce di npm/yarn
2. **Efficienza disco**: Usa hard links, risparmia spazio
3. **Monorepo**: Supporto nativo per workspace
4. **Sicurezza**: Evita dipendenze fantasma (phantom dependencies)

### Differenze principali con npm/yarn

| Feature | npm/yarn | pnpm |
|---------|----------|------|
| Installazione | `npm install` | `pnpm install` |
| Esecuzione script | `npm run dev` | `pnpm dev` |
| Workspace filter | `npm run dev --workspace=web-landing` | `pnpm --filter web-landing dev` |
| Struttura node_modules | Nested/flat | Symlinked (più efficiente) |

## Installazione di pnpm

### Opzione 1: Via npm (se hai già Node.js)

```bash
npm install -g pnpm
```

### Opzione 2: Via Homebrew (macOS)

```bash
brew install pnpm
```

### Opzione 3: Via Corepack (raccomandato - Node.js 16.13+)

```bash
corepack enable
corepack prepare pnpm@8.15.0 --activate
```

### Verifica installazione

```bash
pnpm --version
# Dovrebbe mostrare: 8.x.x o superiore
```

## Avvio della Landing Page

### Step 1: Installa le dipendenze

Dalla **root del progetto**:

```bash
pnpm install
```

Questo installerà le dipendenze per:
- Tutti i workspace (apps, services, packages)
- La root del progetto

### Step 2: Avvia la landing page

**Opzione A: Dalla root (raccomandato)**

```bash
pnpm dev
```

Questo comando esegue `pnpm --filter web-landing dev` automaticamente.

**Opzione B: Dalla cartella dell'app**

```bash
cd apps/web-landing
pnpm dev
```

**Opzione C: Comando esplicito dalla root**

```bash
pnpm --filter web-landing dev
```

### Step 3: Apri il browser

La landing page sarà disponibile su:
```
http://localhost:3000
```

## Comandi Utili

### Dalla root del progetto

```bash
# Installa tutte le dipendenze
pnpm install

# Avvia la landing page in dev
pnpm dev

# Build della landing page
pnpm build

# Avvia la landing page in produzione
pnpm start

# Lint di tutti i workspace
pnpm lint

# Test di tutti i workspace
pnpm test
```

### Comandi specifici per workspace

```bash
# Avvia un servizio specifico
pnpm --filter news-scraper-ms dev

# Build di un package specifico
pnpm --filter web-landing build

# Installa dipendenze solo per un workspace
pnpm --filter web-landing install

# Esegui script in tutti i workspace
pnpm -r build  # -r = recursive, tutti i workspace
```

## Cosa Devi Rispettare

### 1. **Usa SEMPRE pnpm, mai npm o yarn**

❌ **SBAGLIATO:**
```bash
npm install
npm run dev
yarn install
```

✅ **CORRETTO:**
```bash
pnpm install
pnpm dev
```

### 2. **Installa sempre dalla root**

Quando aggiungi nuove dipendenze, installa dalla root:

```bash
# Dalla root
pnpm --filter web-landing add some-package

# NON fare:
cd apps/web-landing
npm install some-package  # ❌ SBAGLIATO
```

### 3. **Struttura workspace**

pnpm riconosce automaticamente i workspace definiti in `pnpm-workspace.yaml`:
- `apps/*` - Tutte le applicazioni
- `services/*` - Tutti i microservizi
- `packages/*` - Tutti i pacchetti condivisi

### 4. **File lock**

pnpm crea `pnpm-lock.yaml` (non `package-lock.json` o `yarn.lock`).

**IMPORTANTE**: Committa sempre `pnpm-lock.yaml` nel repository!

### 5. **node_modules**

pnpm crea una struttura `node_modules` diversa:
- Usa symlinks per risparmiare spazio
- Non modificare manualmente `node_modules`
- Se hai problemi, elimina e reinstalla: `rm -rf node_modules && pnpm install`

## Troubleshooting

### "pnpm: command not found"

Installa pnpm (vedi sezione installazione sopra).

### "ERR_PNPM_NO_IMPORTER_MANIFEST_FOUND"

Stai eseguendo il comando nella directory sbagliata. Vai alla root del progetto.

### Dipendenze non trovate

```bash
# Elimina node_modules e reinstalla
rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf services/*/node_modules
rm -rf packages/*/node_modules
pnpm install
```

### Porta 3000 già in uso

```bash
# Cambia porta nella landing page
cd apps/web-landing
# Modifica package.json script: "dev": "next dev -p 3001"
```

## Esempio Completo

```bash
# 1. Vai alla root del progetto
cd /Users/gabrielebaglioni/homeBlock

# 2. Installa pnpm (se non l'hai già)
npm install -g pnpm

# 3. Installa tutte le dipendenze
pnpm install

# 4. Avvia la landing page
pnpm dev

# 5. Apri http://localhost:3000 nel browser
```

## Riepilogo Comandi Essenziali

```bash
# Setup iniziale (una volta)
pnpm install

# Sviluppo quotidiano
pnpm dev              # Avvia landing page
pnpm build            # Build tutto
pnpm lint             # Lint tutto

# Comandi specifici
pnpm --filter web-landing dev    # Avvia solo landing
pnpm -r build                     # Build tutti i workspace
```

---

**Ricorda**: Usa sempre `pnpm`, mai `npm` o `yarn`! 🚀

