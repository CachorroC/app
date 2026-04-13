# -----------------------------------------------------------------------------
# Stage 1: Base
# -----------------------------------------------------------------------------
FROM node:22-alpine AS base

# 1. Install dependencies required for Prisma + Alpine (OpenSSL is critical)
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

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
COPY package.json pnpm-lock.yaml* ./

# 2. Install dependencies using cache mount for speed
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install --frozen-lockfile

# -----------------------------------------------------------------------------
# Stage 3: Builder
# -----------------------------------------------------------------------------
FROM base AS builder
WORKDIR /app

# Copy node_modules and source
COPY --from=deps /app/node_modules ./node_modules
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

# Security: Don't run as root
RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Setup nextjs cache directory
RUN mkdir .next && chown nextjs:nodejs .next

# Copy the standalone build (Output Tracing)
# This includes only the necessary files for production
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000

# Start server.js created by Next.js standalone output
CMD ["node", "server.js"]