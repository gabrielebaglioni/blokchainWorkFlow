# Dashboard App

Web dashboard for monitoring and managing HouseBlock services.

## Purpose

The Dashboard app provides a web interface for:
- Monitoring service health and status
- Viewing generated content and analytics
- Managing microservice configuration
- Visualizing event flows and pipelines
- Content preview and editing

## Technology Stack

- **Framework**: Next.js 14+ (or React + Vite)
- **UI Library**: Tailwind CSS + shadcn/ui (or similar)
- **State Management**: Zustand or React Query
- **Charts**: Recharts or Chart.js
- **Real-time**: WebSockets or Server-Sent Events

## Features (Planned)

- Service status dashboard
- Content management interface
- Analytics and metrics visualization
- Event flow visualization
- Configuration management
- Content preview and editing

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## Structure

```
dashboard/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── lib/              # Utilities
│   └── hooks/            # Custom hooks
├── public/
└── package.json
```

## Status

🚧 **In Development** - This app will be built in Phase 4 of the development roadmap.

