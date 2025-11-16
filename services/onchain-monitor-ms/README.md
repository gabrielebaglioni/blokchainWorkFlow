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

