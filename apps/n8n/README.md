# n8n App

n8n workflow automation platform integration.

## Purpose

This directory contains n8n-specific configuration and customizations. The actual n8n instance runs via Docker (see `infra/docker/docker-compose.yml`).

## Configuration

n8n workflows are stored in `infra/n8n/workflows/` and can be imported into the n8n instance.

## Access

- Local: `http://localhost:5678`
- Credentials: admin/admin (change in production)

## Workflows

See `infra/n8n/README.md` for workflow documentation.

## Status

✅ **Configured** - n8n runs via Docker Compose. Workflows are defined in `infra/n8n/workflows/`.

