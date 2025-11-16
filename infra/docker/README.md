# Docker Infrastructure

Docker Compose configuration for local development infrastructure.

## Services

- **Redis**: Cache and job queue
- **PostgreSQL**: Local database (production uses Supabase)
- **n8n**: Workflow automation and event orchestration

## Usage

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Restart a service
docker-compose restart redis
```

## Environment Variables

Copy `.env.example` to `.env` in the root directory and configure:
- `N8N_ENCRYPTION_KEY`
- `N8N_USER_MANAGEMENT_JWT_SECRET`

## Access

- Redis: `localhost:6379`
- PostgreSQL: `localhost:5432`
- n8n: `http://localhost:5678` (admin/admin)

