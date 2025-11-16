# Knowledge Base Microservice

## Purpose

The Knowledge Base microservice stores, indexes, and retrieves information using vector embeddings and semantic search. It acts as the long-term memory of the HouseBlock system, enabling semantic search across all collected and generated content.

## API

### Endpoints

- `GET /health` - Health check
- `POST /api/v1/store` - Store content in knowledge base
  - Body: `{ "content": "...", "metadata": {}, "type": "article" }`
- `POST /api/v1/search` - Semantic search
  - Body: `{ "query": "...", "limit": 10, "threshold": 0.7 }`
- `GET /api/v1/entries/:id` - Get knowledge base entry

## Architecture

### Key Components

1. **Embedding Generator**: Generates vector embeddings using OpenAI/other models
2. **Vector Store**: Stores embeddings in Supabase vector extension
3. **Search Engine**: Performs semantic similarity search
4. **Content Indexer**: Indexes content with metadata

## Dependencies

- **Supabase Postgres**: Vector database with pgvector extension
- **Redis**: Cache search results
- **OpenAI**: Embedding generation API
- **n8n**: Event consumption

## Independence Rules

- No direct imports from other microservices
- Communication via HTTP and n8n events only
- Stateless and horizontally scalable

## Event Flow

### Input Events

Consumes from n8n:
- `article.scraped` - Store articles
- `content.generated` - Store generated content
- `onchain.event.detected` - Store onchain events

### Output Events

Publishes to n8n:
```json
{
  "event": "knowledge.stored",
  "data": {
    "entryId": "uuid",
    "type": "article",
    "storedAt": "2024-01-15T10:00:00Z"
  }
}
```

