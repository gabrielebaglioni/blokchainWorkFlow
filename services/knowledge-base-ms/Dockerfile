# Multi-stage build for knowledge-base-ms

# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY services/knowledge-base-ms/package.json ./services/knowledge-base-ms/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/services/knowledge-base-ms/node_modules ./services/knowledge-base-ms/node_modules

# Copy source code
COPY pnpm-workspace.yaml package.json ./
COPY services/knowledge-base-ms ./services/knowledge-base-ms
COPY packages ./packages

# Build
WORKDIR /app/services/knowledge-base-ms
RUN pnpm build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

# Copy built files
COPY --from=builder /app/services/knowledge-base-ms/dist ./dist
COPY --from=builder /app/services/knowledge-base-ms/package.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3011
6379

CMD ["node", "dist/index.js"]
