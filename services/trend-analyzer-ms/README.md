# Trend Analyzer Microservice

## Purpose

The Trend Analyzer microservice identifies patterns, trends, and correlations across multiple data sources (news articles, sentiment data, onchain events, social media). It provides trend detection, anomaly identification, and predictive insights to help understand emerging patterns in the Web3 ecosystem.

## API

### Endpoints

- `GET /health` - Health check
- `GET /api/v1/trends` - Get detected trends
- `GET /api/v1/trends/:id` - Get specific trend details
- `GET /api/v1/anomalies` - Get detected anomalies
- `POST /api/v1/analyze` - Trigger trend analysis

## Architecture

### Key Components

1. **Pattern Detector**: Identifies patterns in time series data
2. **Correlation Engine**: Finds correlations between different data sources
3. **Anomaly Detector**: Detects unusual patterns or outliers
4. **Trend Calculator**: Calculates trend direction and strength

## Dependencies

- **Supabase Postgres**: Store trends and analysis results
- **Redis**: Cache and time series data
- **n8n**: Event consumption and publishing

## Independence Rules

- No direct imports from other microservices
- Communication via HTTP and n8n events only
- Stateless and horizontally scalable

## Event Flow

### Input Events

Consumes from n8n:
- `article.scraped` - Include in trend analysis
- `sentiment.analyzed` - Use sentiment data
- `onchain.event.detected` - Include onchain events

### Output Events

Publishes to n8n:
```json
{
  "event": "trend.detected",
  "data": {
    "trendId": "uuid",
    "type": "rising",
    "category": "defi",
    "strength": 0.85,
    "dataPoints": []
  }
}
```

