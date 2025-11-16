# Database Infrastructure

Database migrations, schemas, and setup scripts.

## Structure

- `migrations/`: Database migration scripts
- `schemas/`: Database schema definitions

## Migrations

Migrations are run automatically when services start, or manually:

```bash
# Run migrations
pnpm --filter <service> migrate
```

## Schema Documentation

Each microservice should document its database schema in its README.md.

## Supabase

Production uses Supabase Postgres. Local development can use the Docker PostgreSQL instance.

