# AI Content Engine Microservice

## Purpose

The AI Content Engine microservice generates high-quality written content (articles, posts, threads, summaries) using LLM models. It orchestrates multiple AI providers, manages prompts from shared packages, and produces content tailored to different platforms and audiences in the Web3 space.

## API

### Endpoints

- `GET /health` - Health check
- `POST /api/v1/generate` - Generate content
  - Body: `{ "type": "article|post|thread", "topic": "...", "style": "...", "length": 1000 }`
- `GET /api/v1/content/:id` - Get generated content
- `POST /api/v1/improve` - Improve existing content
- `GET /api/v1/templates` - List available content templates

## Architecture

### Key Components

1. **Prompt Manager**: Loads and manages prompts from hb-shared-ai
2. **LLM Orchestrator**: Manages multiple LLM providers (OpenAI, Anthropic, Gemini)
3. **Content Formatter**: Formats content for different platforms
4. **Quality Validator**: Validates content quality and relevance

## Dependencies

- **Supabase Postgres**: Store generated content
- **Redis**: Cache prompts and generated content
- **OpenAI/Anthropic/Gemini**: LLM APIs
- **hb-shared-ai**: Shared prompt templates
- **n8n**: Event consumption and publishing

## Independence Rules

- No direct imports from other microservices
- Uses hb-shared-ai package for prompts only
- Communication via HTTP and n8n events only
- Stateless and horizontally scalable

## Event Flow

### Input Events

Consumes from n8n:
- `opportunity.detected` - Generate content for opportunity
- `trend.detected` - Generate content about trend
- `content.request` - Direct content generation request

### Output Events

Publishes to n8n:
```json
{
  "event": "content.generated",
  "data": {
    "contentId": "uuid",
    "type": "article",
    "title": "...",
    "content": "...",
    "metadata": {}
  }
}
```

### Downstream Services

- **visual-generator-ms**: Generates visuals for content
- **social-publisher-ms**: Publishes content to social platforms
- **knowledge-base-ms**: Stores content for search

