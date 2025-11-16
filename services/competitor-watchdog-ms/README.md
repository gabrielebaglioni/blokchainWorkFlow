# Competitor Watchdog Microservice

## Purpose

The Competitor Watchdog microservice monitors competitor activities, content, and strategies across various platforms. It tracks competitor publications, social media activity, and strategic moves to provide competitive intelligence for content strategy and positioning.

## API

### Endpoints

- `GET /health` - Health check
- `GET /api/v1/competitors` - List monitored competitors
- `GET /api/v1/activities` - Get competitor activities
- `POST /api/v1/monitor` - Add competitor to monitor

## Architecture

### Key Components

1. **Activity Tracker**: Tracks competitor activities
2. **Content Analyzer**: Analyzes competitor content
3. **Change Detector**: Detects changes in competitor strategies
4. **Report Generator**: Generates competitive intelligence reports

## Dependencies

- **Supabase Postgres**: Store competitor data
- **Redis**: Cache and job queue
- **n8n**: Event consumption and publishing
- **External APIs**: Social media APIs, RSS feeds

## Independence Rules

- No direct imports from other microservices
- Communication via HTTP and n8n events only
- Stateless and horizontally scalable

## Event Flow

### Input Events

- Manual monitoring requests
- Scheduled monitoring jobs

### Output Events

Publishes to n8n:
```json
{
  "event": "competitor.activity.detected",
  "data": {
    "competitorId": "uuid",
    "activityType": "post",
    "content": "...",
    "detectedAt": "2024-01-15T10:00:00Z"
  }
}
```

