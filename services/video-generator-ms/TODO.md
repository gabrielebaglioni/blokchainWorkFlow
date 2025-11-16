# Video Generator Microservice - Development TODO

## Development Phases

### Phase 1: Foundation
- [ ] Express.js server setup
- [ ] Supabase integration
- [ ] FFmpeg installation and configuration
- [ ] Health check endpoint

### Phase 2: Video Processing
- [ ] FFmpeg wrapper implementation
- [ ] Video composition engine
- [ ] Template system
- [ ] Asset management

### Phase 3: Storage & Delivery
- [ ] Supabase Storage integration
- [ ] Video optimization
- [ ] Format conversion

### Phase 4: Integration & Testing
- [ ] n8n integration
- [ ] Unit tests
- [ ] Integration tests

## Required Environment Variables

```bash
VIDEO_GENERATOR_PORT=3009
VIDEO_GENERATOR_REDIS_URL=redis://localhost:6379
VIDEO_GENERATOR_STORAGE_PATH=/tmp/videos
VIDEO_GENERATOR_FFMPEG_PATH=/usr/bin/ffmpeg
SUPABASE_URL=...
SUPABASE_STORAGE_BUCKET=videos
N8N_URL=...
```

## Scheduled Jobs

- **Storage Cleanup** (daily): Clean temporary files
- **Video Optimization** (daily): Re-optimize old videos

## Postgres Tables

```sql
CREATE TABLE generated_videos (
  id UUID PRIMARY KEY,
  template TEXT,
  storage_url TEXT NOT NULL,
  duration INTEGER,
  metadata JSONB,
  generated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Technologies

- Node.js, Express, TypeScript
- FFmpeg (fluent-ffmpeg)
- Supabase Storage
- Redis

## Tests

- Video processing tests
- Template system tests
- Storage integration tests

