# Onchain Monitor Microservice

## Purpose

The Onchain Monitor microservice tracks and monitors blockchain events, transactions, and onchain metrics across multiple networks (Ethereum, Polygon, Arbitrum, Optimism, Base). It provides real-time monitoring of smart contract interactions, token transfers, and protocol activities relevant to the Web3 ecosystem.

## API

### Endpoints

- `GET /health` - Health check
- `GET /api/v1/events` - Get monitored events
- `POST /api/v1/monitor` - Add new address/contract to monitor
- `GET /api/v1/transactions/:address` - Get transactions for address
- `GET /api/v1/metrics` - Get onchain metrics

## Architecture

### Internal Structure

```
onchain-monitor-ms/
├── src/
│   ├── index.ts
│   ├── server.ts
│   ├── routes/
│   ├── monitors/
│   │   ├── ethereum-monitor.ts
│   │   ├── polygon-monitor.ts
│   │   └── multi-chain.ts
│   ├── processors/
│   │   └── event-processor.ts
│   └── storage/
```

### Key Components

1. **Multi-Chain Monitor**: Monitors multiple blockchain networks
2. **Event Listener**: Listens to smart contract events
3. **Transaction Tracker**: Tracks transactions for specific addresses
4. **Metrics Calculator**: Calculates onchain metrics

## Dependencies

- **Web3 RPC Providers**: Alchemy, Infura for blockchain access
- **Supabase Postgres**: Store events and transactions
- **Redis**: Cache and job queue
- **n8n**: Event publishing

## Independence Rules

- No direct imports from other microservices
- Communication via HTTP and n8n events only
- Stateless and horizontally scalable

## Event Flow

### Input Events

- Manual monitoring requests via API
- Scheduled monitoring jobs

### Output Events

Publishes to n8n:
```json
{
  "event": "onchain.event.detected",
  "data": {
    "chain": "ethereum",
    "eventType": "Transfer",
    "contractAddress": "0x...",
    "blockNumber": 12345678,
    "transactionHash": "0x...",
    "data": {}
  }
}
```

### Downstream Services

- **trend-analyzer-ms**: Analyzes onchain trends
- **opportunity-detector-ms**: Detects opportunities from events
- **knowledge-base-ms**: Stores onchain data


## Requirements

- Node.js 18+
- pnpm 8+
- Docker (opzionale, per containerizzazione)
- Supabase account (o PostgreSQL locale)
- Redis (opzionale, per caching)

## Run Locally (pnpm dev)

### Prerequisiti

1. Installa le dipendenze dalla root della monorepo:
   ```bash
   pnpm install
   ```

2. Configura le variabili d'ambiente:
   ```bash
   cd services/onchain-monitor-ms
   cp .env.example .env
   # Modifica .env con i tuoi valori
   ```

### Avvio

```bash
# Dalla cartella del microservizio
cd services/onchain-monitor-ms
pnpm dev

# Oppure dalla root usando pnpm filter
pnpm --filter onchain-monitor-ms dev
```

Il servizio sarà disponibile su `http://localhost:3003
6379`

### Health Check

```bash
curl http://localhost:3003
6379/health
```

## Run with Docker (dev/prod)

### Sviluppo

```bash
cd services/onchain-monitor-ms

# Build dell'immagine dev
docker build -f Dockerfile.dev -t houseblock/onchain-monitor-ms-dev .

# Avvio container
docker run --env-file .env.local -p 3003
6379:3003
6379 houseblock/onchain-monitor-ms-dev
```

### Produzione

```bash
cd services/onchain-monitor-ms

# Build dell'immagine produzione
docker build -t houseblock/onchain-monitor-ms .

# Avvio container
docker run --env-file .env.production -p 3003
6379:3003
6379 houseblock/onchain-monitor-ms
```

## Environment Variables (.env.example)

Copia `.env.example` in `.env` e configura le variabili necessarie. Vedi `.env.example` per la lista completa.

## API Endpoints

- `GET /health` - Health check endpoint
- Altri endpoint da implementare (vedi TODO.md)

Vedi [COMMANDS.md](../../COMMANDS.md) per comandi completi e [DEPLOY.md](../../DEPLOY.md) per dettagli sul deploy.
