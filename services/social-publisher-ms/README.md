# Social Publisher Microservice

## Purpose

The Social Publisher microservice publishes content to multiple social media platforms (Twitter/X, LinkedIn, Mastodon). It handles platform-specific formatting, scheduling, and manages publishing workflows across different social networks.

## API

### Endpoints

- `GET /health` - Health check
- `POST /api/v1/publish` - Publish content
  - Body: `{ "platform": "twitter|linkedin|mastodon", "content": "...", "media": [...] }`
- `GET /api/v1/posts` - Get published posts
- `POST /api/v1/schedule` - Schedule post for later

## Architecture

### Key Components

1. **Platform Adapters**: Platform-specific API integrations
2. **Content Formatter**: Formats content for each platform
3. **Scheduler**: Manages scheduled posts
4. **Analytics Tracker**: Tracks post performance

## Dependencies

- **Supabase Postgres**: Store published posts and schedules
- **Redis**: Job queue for scheduling
- **Twitter API, LinkedIn API, Mastodon API**: Social platform APIs
- **n8n**: Event consumption and publishing

## Independence Rules

- No direct imports from other microservices
- Communication via HTTP and n8n events only
- Stateless and horizontally scalable

## Event Flow

### Input Events

Consumes from n8n:
- `content.generated` - Publish generated content
- `visual.generated` - Include visual in post
- `video.generated` - Include video in post
- `publish.request` - Direct publishing request

### Output Events

Publishes to n8n:
```json
{
  "event": "content.published",
  "data": {
    "postId": "uuid",
    "platform": "twitter",
    "url": "https://twitter.com/...",
    "publishedAt": "2024-01-15T10:00:00Z"
  }
}
```

