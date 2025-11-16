# @houseblock/shared-config

Shared configuration utilities and constants for the HouseBlock monorepo.

## Purpose

This package provides centralized configuration management, environment variable validation, and shared constants used across all microservices and applications in the HouseBlock monorepo.

## Usage

```typescript
import { getConfig, validateEnv } from '@houseblock/shared-config';

// Validate required environment variables
validateEnv(['SUPABASE_URL', 'REDIS_HOST']);

// Get configuration
const config = getConfig();
const supabaseUrl = config.supabase.url;
```

## Features

- Environment variable validation
- Type-safe configuration access
- Shared constants (ports, timeouts, etc.)
- Configuration helpers for common patterns

## Installation

This package is part of the monorepo and is automatically available to all workspaces. No separate installation needed.

## Development

```bash
# Build
pnpm --filter @houseblock/shared-config build

# Test
pnpm --filter @houseblock/shared-config test
```

## Structure

```
hb-shared-config/
├── src/
│   ├── index.ts           # Main exports
│   ├── env.ts             # Environment variable helpers
│   ├── constants.ts       # Shared constants
│   └── validators.ts      # Validation utilities
└── __tests__/
```

