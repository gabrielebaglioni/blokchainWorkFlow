# Opportunity Detector Microservice

## Purpose

The Opportunity Detector microservice identifies potential opportunities, investment signals, and actionable insights from the aggregated data across news, sentiment, trends, and onchain activity. It uses AI to detect patterns that indicate opportunities for content creation, research, or strategic insights.

## API

### Endpoints

- `GET /health` - Health check
- `GET /api/v1/opportunities` - Get detected opportunities
- `GET /api/v1/opportunities/:id` - Get opportunity details
- `POST /api/v1/detect` - Trigger opportunity detection

## Architecture

### Key Components

1. **Pattern Matcher**: Matches patterns against opportunity templates
2. **AI Analyzer**: Uses LLM to identify opportunities
3. **Scoring Engine**: Scores opportunities by relevance and potential
4. **Alert System**: Generates alerts for high-value opportunities

## Dependencies

- **Supabase Postgres**: Store opportunities
- **Redis**: Cache and job queue
- **OpenAI/Anthropic**: LLM for opportunity detection
- **n8n**: Event consumption and publishing

## Independence Rules

- No direct imports from other microservices
- Communication via HTTP and n8n events only
- Stateless and horizontally scalable

## Event Flow

### Input Events

Consumes from n8n:
- `trend.detected` - Analyze for opportunities
- `onchain.event.detected` - Check for opportunity signals
- `sentiment.analyzed` - Use sentiment context

### Output Events

Publishes to n8n:
```json
{
  "event": "opportunity.detected",
  "data": {
    "opportunityId": "uuid",
    "type": "content_idea",
    "score": 0.92,
    "description": "...",
    "relatedData": {}
  }
}
```

