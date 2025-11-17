# HouseBlock - Guida al Deploy

Questa guida copre il deploy di tutte le componenti di HouseBlock su Vercel (per la landing) e su VPS/Hostinger (per n8n e microservizi).

## Indice

- [Deploy Web Landing su Vercel](#deploy-web-landing-su-vercel)
- [Deploy n8n su VPS/Hostinger](#deploy-n8n-su-vpshostinger)
- [Deploy Microservizi su VPS/Hostinger](#deploy-microservizi-su-vpshostinger)
- [Deploy Dashboard (futuro)](#deploy-dashboard-futuro)

## Deploy Web Landing su Vercel

### Prerequisiti

1. Account Vercel
2. Repository GitHub/GitLab/Bitbucket collegato
3. Accesso alla monorepo

### Configurazione Vercel

#### Opzione 1: Configurazione tramite Dashboard Vercel

1. **Crea un nuovo progetto** su Vercel
2. **Collega il repository** GitHub/GitLab/Bitbucket
3. **Configura il progetto:**
   - **Framework Preset:** Next.js
   - **Root Directory:** `apps/web-landing`
   - **Build Command:** `pnpm install && pnpm --filter web-landing build`
   - **Output Directory:** `.next`
   - **Install Command:** `pnpm install`
   - **Node.js Version:** 18.x o superiore

#### Opzione 2: Configurazione tramite `vercel.json`

Il file `apps/web-landing/vercel.json` è già configurato:

```json
{
  "version": 2,
  "buildCommand": "pnpm install && pnpm --filter web-landing build",
  "devCommand": "pnpm --filter web-landing dev",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "outputDirectory": ".next"
}
```

### Variabili d'Ambiente

Se l'app necessita di variabili d'ambiente, aggiungile in Vercel:

1. Vai su **Settings** → **Environment Variables**
2. Aggiungi le variabili necessarie (es: `NEXT_PUBLIC_API_URL`)

### Deploy

1. **Push su branch principale** (es: `master` o `main`)
2. Vercel eseguirà automaticamente il deploy
3. Il deploy sarà disponibile su `https://your-project.vercel.app`

### Deploy Manuale

```bash
# Installa Vercel CLI
npm i -g vercel

# Dalla root della monorepo
vercel --cwd apps/web-landing
```

### Domini Personalizzati

1. Vai su **Settings** → **Domains**
2. Aggiungi il tuo dominio
3. Segui le istruzioni per configurare i DNS

## Deploy n8n su VPS/Hostinger

### Prerequisiti

1. VPS con Docker e Docker Compose installati
2. Accesso SSH al server
3. Porta 5678 aperta (o porta personalizzata)

### Setup Iniziale

1. **Clona la repository sul server:**
   ```bash
   git clone <repository-url> /opt/houseblock
   cd /opt/houseblock
   ```

2. **Configura le variabili d'ambiente:**
   ```bash
   cp .env.example .env
   # Modifica .env con i tuoi valori
   nano .env
   ```

3. **Crea directory per i volumi:**
   ```bash
   mkdir -p /opt/houseblock/data/n8n
   chmod -R 777 /opt/houseblock/data/n8n
   ```

### Deploy con Docker Compose

```bash
cd /opt/houseblock/infra/docker

# Avvia solo n8n
docker compose -f docker-compose.prod.yml up -d n8n

# Verifica che sia attivo
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs -f n8n
```

### Configurazione n8n

1. **Accedi a n8n:**
   - URL: `http://your-server-ip:5678`
   - Username: valore di `N8N_BASIC_AUTH_USER` (default: `admin`)
   - Password: valore di `N8N_BASIC_AUTH_PASSWORD` (default: `admin`)

2. **Importa workflows:**
   - I workflow sono in `infra/n8n/workflows/`
   - Importali manualmente dall'interfaccia n8n

3. **Configura credentials:**
   - Le credentials sono in `infra/n8n/credentials/`
   - Configurale dall'interfaccia n8n

### Persistenza Dati

I dati di n8n sono salvati nel volume Docker `n8n-data-prod`. Per backup:

```bash
# Backup
docker run --rm -v houseblock_n8n-data-prod:/data -v $(pwd):/backup alpine tar czf /backup/n8n-backup.tar.gz /data

# Restore
docker run --rm -v houseblock_n8n-data-prod:/data -v $(pwd):/backup alpine tar xzf /backup/n8n-backup.tar.gz -C /
```

### Reverse Proxy (Nginx)

Per esporre n8n su un dominio con HTTPS:

```nginx
server {
    listen 80;
    server_name n8n.yourdomain.com;

    location / {
        proxy_pass http://localhost:5678;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Poi configura SSL con Let's Encrypt:
```bash
sudo certbot --nginx -d n8n.yourdomain.com
```

## Deploy Microservizi su VPS/Hostinger

### Prerequisiti

1. VPS con Docker e Docker Compose installati
2. Database Supabase configurato (o PostgreSQL locale)
3. Redis configurato
4. n8n già deployato

### Setup Iniziale

1. **Clona la repository:**
   ```bash
   git clone <repository-url> /opt/houseblock
   cd /opt/houseblock
   ```

2. **Configura le variabili d'ambiente:**
   ```bash
   cp .env.example .env
   # Modifica .env con i tuoi valori
   nano .env
   ```

3. **Crea directory per i volumi:**
   ```bash
   mkdir -p /opt/houseblock/data/{redis,postgres}
   ```

### Deploy Stack Completo

Il file `infra/docker/docker-compose.prod.yml` include già tutti i servizi. Per deployare tutto:

```bash
cd /opt/houseblock/infra/docker

# Avvia tutto lo stack
docker compose -f docker-compose.prod.yml up -d

# Verifica stato
docker compose -f docker-compose.prod.yml ps

# Visualizza log
docker compose -f docker-compose.prod.yml logs -f
```

### Deploy Microservizio Singolo

Per deployare un singolo microservizio:

```bash
cd /opt/houseblock/services/<ms-name>

# Build dell'immagine
docker build -t houseblock/<ms-name> .

# Avvio container
docker run -d \
  --name houseblock-<ms-name> \
  --env-file .env.production \
  -p <PORT>:<PORT> \
  --restart unless-stopped \
  houseblock/<ms-name>
```

**Esempio per news-scraper-ms:**
```bash
cd /opt/houseblock/services/news-scraper-ms
docker build -t houseblock/news-scraper-ms .
docker run -d \
  --name houseblock-news-scraper-ms \
  --env-file .env.production \
  -p 3001:3001 \
  --restart unless-stopped \
  houseblock/news-scraper-ms
```

### Docker Compose per Microservizi

Puoi aggiungere i microservizi al `docker-compose.prod.yml`. Esempio per `news-scraper-ms`:

```yaml
services:
  news-scraper-ms:
    build:
      context: ../..
      dockerfile: services/news-scraper-ms/Dockerfile
    container_name: houseblock-news-scraper-ms-prod
    ports:
      - "3001:3001"
    env_file:
      - ../../services/news-scraper-ms/.env.production
    restart: unless-stopped
    depends_on:
      - redis
      - postgres
    networks:
      - houseblock-network-prod
```

Poi avvia:
```bash
docker compose -f docker-compose.prod.yml up -d news-scraper-ms
```

### Health Checks

Tutti i microservizi espongono `/health`. Configura un monitoraggio:

```bash
# Script di health check
#!/bin/bash
curl -f http://localhost:3001/health || exit 1
```

### Reverse Proxy (Nginx)

Per esporre i microservizi su domini/porte specifiche:

```nginx
# news-scraper-ms
server {
    listen 80;
    server_name news-api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Aggiornamento Microservizi

```bash
cd /opt/houseblock

# Pull ultime modifiche
git pull

# Ricostruisci e riavvia
cd services/<ms-name>
docker build -t houseblock/<ms-name> .
docker stop houseblock-<ms-name>
docker rm houseblock-<ms-name>
docker run -d \
  --name houseblock-<ms-name> \
  --env-file .env.production \
  -p <PORT>:<PORT> \
  --restart unless-stopped \
  houseblock/<ms-name>
```

### Log e Monitoring

```bash
# Log di un microservizio
docker logs -f houseblock-<ms-name>

# Log di tutti i servizi
docker compose -f infra/docker/docker-compose.prod.yml logs -f
```

## Deploy Dashboard (futuro)

Quando il dashboard sarà implementato, seguirà lo stesso pattern della web landing:

- **Vercel:** Se è una Next.js app statica/SSR
- **VPS:** Se ha bisogno di API server-side

## Checklist Deploy

### Pre-Deploy

- [ ] Variabili d'ambiente configurate
- [ ] Database migrato
- [ ] Credenziali API configurate
- [ ] Porte firewall aperte
- [ ] Domini DNS configurati

### Post-Deploy

- [ ] Health checks funzionanti
- [ ] Log accessibili
- [ ] Backup configurati
- [ ] Monitoring attivo
- [ ] SSL/TLS configurato

## Troubleshooting

### Container non si avvia

1. Verifica i log:
   ```bash
   docker logs houseblock-<service-name>
   ```

2. Verifica le variabili d'ambiente:
   ```bash
   docker exec houseblock-<service-name> env
   ```

3. Verifica la connettività di rete:
   ```bash
   docker network inspect houseblock-network-prod
   ```

### Problemi di connessione al database

1. Verifica che PostgreSQL/Redis siano attivi:
   ```bash
   docker compose -f infra/docker/docker-compose.prod.yml ps
   ```

2. Verifica le credenziali nel file `.env`

3. Testa la connessione:
   ```bash
   docker exec -it houseblock-postgres-prod psql -U postgres -d houseblock
   ```

### Porte già in uso

1. Trova il processo:
   ```bash
   sudo lsof -i :<PORT>
   ```

2. Cambia la porta nel `.env` o ferma il processo

## Backup e Restore

### Backup Database

```bash
# PostgreSQL
docker exec houseblock-postgres-prod pg_dump -U postgres houseblock > backup.sql

# Restore
docker exec -i houseblock-postgres-prod psql -U postgres houseblock < backup.sql
```

### Backup Volumi Docker

```bash
# Backup tutti i volumi
docker run --rm -v houseblock_redis-data-prod:/data -v $(pwd):/backup alpine tar czf /backup/redis-backup.tar.gz /data
docker run --rm -v houseblock_n8n-data-prod:/data -v $(pwd):/backup alpine tar czf /backup/n8n-backup.tar.gz /data
```

