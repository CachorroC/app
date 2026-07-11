# -----------------------------------------------------------------------------
# Stage 1: Base
# -----------------------------------------------------------------------------
FROM node:22-alpine AS base

# 1. Upgrade existing alpine packages to patch OS vulnerabilities, THEN install dependencies
RUN apk upgrade --no-cache && \
  apk add --no-cache libc6-compat openssl
WORKDIR /app

# Enable pnpm via corepack
RUN corepack enable

# Enable pnpm and configure home for caching
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# -----------------------------------------------------------------------------
# Stage 2: Dependencies
# -----------------------------------------------------------------------------
FROM base AS deps
WORKDIR /app

# Copy lockfiles first for better caching
# Only re-run pnpm install if these files change
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./

# Copy scripts directory for postinstall scripts
COPY scripts/ ./scripts/

# Install dependencies strictly from the lockfile for deterministic builds
RUN pnpm approve-builds --all
RUN pnpm install --frozen-lockfile

# -----------------------------------------------------------------------------
# Stage 3: Builder
# -----------------------------------------------------------------------------
FROM base AS builder
WORKDIR /app

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the source code
COPY . .

# 3. Generate Prisma Client (No DB connection needed)
RUN npx prisma generate

# 4. Environment variables & Build
ARG NEXT_PUBLIC_MONGODB_URI
ENV NEXT_PUBLIC_MONGODB_URI=${NEXT_PUBLIC_MONGODB_URI}
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application (Standalone output must be enabled in next.config.js)
RUN pnpm build

# -----------------------------------------------------------------------------
# Stage 4: Runner
# -----------------------------------------------------------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy static assets and public files
COPY --from=builder /app/public ./public

# Set permissions for nextjs cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy the standalone build (requires output: 'standalone' in next.config.ts)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000

# Start the application
CMD ["node", "server.js"]