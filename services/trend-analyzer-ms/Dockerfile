# Multi-stage build for trend-analyzer-ms

# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY services/trend-analyzer-ms/package.json ./services/trend-analyzer-ms/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/services/trend-analyzer-ms/node_modules ./services/trend-analyzer-ms/node_modules

# Copy source code
COPY pnpm-workspace.yaml package.json ./
COPY services/trend-analyzer-ms ./services/trend-analyzer-ms
COPY packages ./packages

# Build
WORKDIR /app/services/trend-analyzer-ms
RUN pnpm build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

# Copy built files
COPY --from=builder /app/services/trend-analyzer-ms/dist ./dist
COPY --from=builder /app/services/trend-analyzer-ms/package.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3004
6379

CMD ["node", "dist/index.js"]
