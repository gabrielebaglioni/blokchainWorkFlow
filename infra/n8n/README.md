# n8n Workflows

n8n workflow definitions for event-driven orchestration in HouseBlock.

## Structure

- `workflows/`: JSON workflow definitions
- `credentials/`: Encrypted credentials (git-ignored)

## Workflows

### Core Workflows

- `input-to-ai.json`: Routes input events to AI services
- `ai-to-output.json`: Routes AI results to output services
- `output-to-publish.json`: Routes generated content to publisher
- `error-handler.json`: Centralized error handling

### Service-Specific Workflows

Each microservice may have associated workflows in this directory.

## Usage

1. Start n8n: `docker-compose up n8n`
2. Access n8n UI: `http://localhost:5678`
3. Import workflows from `workflows/` directory
4. Configure webhooks and credentials

## Event Schema

All events follow a consistent schema defined in `@houseblock/shared-types`.

