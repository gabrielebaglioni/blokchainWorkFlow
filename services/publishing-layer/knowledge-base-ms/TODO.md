# Knowledge Base Microservice - Development TODO

## Development Phases

### Phase 1: Foundation
- [ ] Express.js server setup
- [ ] Supabase integration with pgvector
- [ ] Health check endpoint

### Phase 2: Embedding System
- [ ] OpenAI embedding API integration
- [ ] Embedding generation
- [ ] Batch embedding processing

### Phase 3: Vector Storage
- [ ] pgvector setup and configuration
- [ ] Vector indexing
- [ ] Storage schema

### Phase 4: Search Engine
- [ ] Semantic search implementation
- [ ] Similarity calculation
- [ ] Search result ranking

### Phase 5: Integration & Testing
- [ ] n8n integration
- [ ] Unit tests
- [ ] Integration tests

## Required Environment Variables

```bash
KNOWLEDGE_BASE_PORT=3011
KNOWLEDGE_BASE_REDIS_URL=redis://localhost:6379
KNOWLEDGE_BASE_EMBEDDING_MODEL=text-embedding-3-large
KNOWLEDGE_BASE_VECTOR_DB=supabase
OPENAI_API_KEY=...
SUPABASE_URL=...
N8N_URL=...
```

## Scheduled Jobs

- **Embedding Generation** (hourly): Generate embeddings for new content
- **Index Optimization** (daily): Optimize vector indexes

## Postgres Tables

```sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE knowledge_entries (
  id UUID PRIMARY KEY,
  content TEXT NOT NULL,
  content_type TEXT NOT NULL,
  embedding vector(1536), -- OpenAI embedding dimension
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX ON knowledge_entries USING ivfflat (embedding vector_cosine_ops);
```

## Technologies

- Node.js, Express, TypeScript
- Supabase with pgvector
- OpenAI Embeddings API
- Redis

## Tests

- Embedding generation tests
- Vector search tests
- Storage tests

