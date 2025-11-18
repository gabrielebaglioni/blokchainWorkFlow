# Dockerfile per web-landing - Multi-stage build per Next.js

# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copia file di configurazione pnpm
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/web-landing/package.json ./apps/web-landing/

# Installa pnpm
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

# Installa dipendenze
RUN pnpm install --frozen-lockfile

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Copia dipendenze dal stage precedente
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web-landing/node_modules ./apps/web-landing/node_modules

# Copia tutto il codice sorgente (escludi node_modules già copiati)
COPY --chown=node:node pnpm-workspace.yaml package.json ./
COPY --chown=node:node apps/web-landing ./apps/web-landing
COPY --chown=node:node packages ./packages

# Abilita pnpm
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

# Build dell'applicazione
WORKDIR /app/apps/web-landing
RUN pnpm build

# Stage 3: Runner (produzione)
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia file necessari per la produzione (standalone output)
COPY --from=builder --chown=nextjs:nodejs /app/apps/web-landing/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web-landing/.next/static ./apps/web-landing/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web-landing/public ./apps/web-landing/public

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/web-landing/server.js"]

