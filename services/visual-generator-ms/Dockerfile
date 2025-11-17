# Multi-stage build for visual-generator-ms

# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY services/visual-generator-ms/package.json ./services/visual-generator-ms/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/services/visual-generator-ms/node_modules ./services/visual-generator-ms/node_modules

# Copy source code
COPY pnpm-workspace.yaml package.json ./
COPY services/visual-generator-ms ./services/visual-generator-ms
COPY packages ./packages

# Build
WORKDIR /app/services/visual-generator-ms
RUN pnpm build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

# Copy built files
COPY --from=builder /app/services/visual-generator-ms/dist ./dist
COPY --from=builder /app/services/visual-generator-ms/package.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3008
6379

CMD ["node", "dist/index.js"]
