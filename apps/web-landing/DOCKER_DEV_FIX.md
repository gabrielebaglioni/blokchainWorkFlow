# 🔧 Fix Docker per Sviluppo

## Problema Attuale

Il Dockerfile ha problemi con il build completo. Per lo sviluppo, è meglio usare un approccio semplificato.

## Soluzione Temporanea

### Opzione 1: Sviluppo con pnpm (Raccomandato)

```bash
# Dalla root
pnpm dev
```

**Vantaggi:**
- ✅ Più veloce
- ✅ Hot-reload immediato
- ✅ Meno overhead
- ✅ Funziona subito

### Opzione 2: Docker Semplificato per Dev

Modifica `docker-compose.yml` per usare un approccio più semplice:

```yaml
services:
  web-landing:
    image: node:20-alpine
    container_name: houseblock-web-landing
    working_dir: /app
    volumes:
      - ../../:/app
    ports:
      - "3000:3000"
    command: sh -c "corepack enable && corepack prepare pnpm@8.15.0 --activate && pnpm install && pnpm --filter web-landing dev"
```

## Prossimi Passi

1. **Ora**: Usa `pnpm dev` per sviluppo
2. **Dopo**: Sistemeremo il Dockerfile per produzione
3. **Docker**: Lo useremo principalmente per produzione, non per sviluppo

## Note

Il Dockerfile attuale è ottimizzato per produzione (multi-stage build). Per sviluppo, pnpm diretto è più pratico.

