# Visual Generator Microservice

## Purpose

The Visual Generator microservice creates images, graphics, and visual content using AI image generation models (DALL-E, Stable Diffusion, Midjourney) and design templates. It generates visuals to accompany articles, social media posts, and other content.

## API

### Endpoints

- `GET /health` - Health check
- `POST /api/v1/generate` - Generate visual
  - Body: `{ "prompt": "...", "style": "...", "dimensions": "1024x1024" }`
- `GET /api/v1/visuals/:id` - Get generated visual
- `POST /api/v1/improve` - Improve existing visual
- `GET /api/v1/styles` - List available styles

## Architecture

### Key Components

1. **Image Generator**: Interfaces with DALL-E, Stable Diffusion APIs
2. **Style Manager**: Manages visual styles and templates
3. **Image Processor**: Post-processes and optimizes images
4. **Storage Manager**: Manages image storage and CDN

## Dependencies

- **Supabase Postgres**: Store visual metadata
- **Supabase Storage**: Store generated images
- **Redis**: Cache and job queue
- **OpenAI/Stability AI**: Image generation APIs
- **n8n**: Event consumption and publishing

## Independence Rules

- No direct imports from other microservices
- Communication via HTTP and n8n events only
- Stateless and horizontally scalable

## Event Flow

### Input Events

Consumes from n8n:
- `content.generated` - Generate visual for content
- `visual.request` - Direct visual generation request

### Output Events

Publishes to n8n:
```json
{
  "event": "visual.generated",
  "data": {
    "visualId": "uuid",
    "url": "https://...",
    "style": "...",
    "metadata": {}
  }
}
```

