# Video Generator Microservice

## Purpose

The Video Generator microservice creates video content from images, text, and audio. It generates short-form videos for social media, video summaries, and animated content using templates and AI-generated assets.

## API

### Endpoints

- `GET /health` - Health check
- `POST /api/v1/generate` - Generate video
  - Body: `{ "template": "...", "assets": [...], "duration": 60 }`
- `GET /api/v1/videos/:id` - Get generated video
- `GET /api/v1/templates` - List available templates

## Architecture

### Key Components

1. **Video Composer**: Composes videos from assets
2. **Template Engine**: Manages video templates
3. **FFmpeg Wrapper**: Handles video processing
4. **Asset Manager**: Manages video assets

## Dependencies

- **Supabase Postgres**: Store video metadata
- **Supabase Storage**: Store generated videos
- **Redis**: Cache and job queue
- **FFmpeg**: Video processing
- **n8n**: Event consumption and publishing

## Independence Rules

- No direct imports from other microservices
- Communication via HTTP and n8n events only
- Stateless and horizontally scalable

## Event Flow

### Input Events

Consumes from n8n:
- `content.generated` + `visual.generated` - Generate video from content
- `video.request` - Direct video generation request

### Output Events

Publishes to n8n:
```json
{
  "event": "video.generated",
  "data": {
    "videoId": "uuid",
    "url": "https://...",
    "duration": 60,
    "metadata": {}
  }
}
```

