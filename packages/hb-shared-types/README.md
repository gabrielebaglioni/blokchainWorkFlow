# @houseblock/shared-types

Shared TypeScript type definitions for the HouseBlock monorepo.

## Purpose

This package provides TypeScript interfaces, types, and enums that are shared across microservices. It ensures type safety and consistency when services communicate via HTTP APIs or n8n events.

## Usage

```typescript
import { Article, SentimentAnalysis, OnchainEvent } from '@houseblock/shared-types';

// Use types in your service
const article: Article = {
  id: 'uuid',
  title: '...',
  content: '...',
  // ...
};
```

## Features

- Event type definitions for n8n workflows
- API request/response types
- Database entity types
- Shared enums and constants

## Installation

This package is part of the monorepo and is automatically available to all workspaces. No separate installation needed.

## Development

```bash
# Build
pnpm --filter @houseblock/shared-types build

# Type checking
pnpm --filter @houseblock/shared-types type-check
```

## Structure

```
hb-shared-types/
├── src/
│   ├── index.ts           # Main exports
│   ├── events.ts          # n8n event types
│   ├── api.ts             # API types
│   ├── entities.ts        # Database entity types
│   └── enums.ts           # Shared enums
└── __tests__/
```

## Type Categories

### Events

Types for n8n event payloads:
- `ArticleScrapedEvent`
- `SentimentAnalyzedEvent`
- `ContentGeneratedEvent`
- `OnchainEventDetectedEvent`
- etc.

### API Types

Request/response types for microservice APIs:
- `ApiResponse<T>`
- `PaginationParams`
- `ErrorResponse`

### Entities

Database entity types:
- `Article`
- `SentimentAnalysis`
- `GeneratedContent`
- `OnchainEvent`
- etc.

