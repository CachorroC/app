# -----------------------------------------------------------------------------
# Stage 1: Base
# -----------------------------------------------------------------------------
FROM node:20-alpine AS base

# 1. Install dependencies required for Prisma + Alpine (OpenSSL is critical)
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Enable pnpm via corepack (included in Node 20)
RUN corepack enable

# -----------------------------------------------------------------------------
# Stage 2: Dependencies
# -----------------------------------------------------------------------------
FROM base AS deps
WORKDIR /app

# Copy lockfiles first for better caching
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# 2. Install dependencies strictly from lockfile
RUN pnpm install --frozen-lockfile

# -----------------------------------------------------------------------------
# Stage 3: Builder
# -----------------------------------------------------------------------------
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 3. Generate Prisma Client
# This looks at your local schema.prisma and creates the client in node_modules
# It does NOT need a database connection to run.
RUN npx prisma generate

# 4. Handle Next.js Public Environment Variables
# Note: 'environment' in docker-compose is NOT available here.
# If you use process.env.NEXT_PUBLIC_... in your client-side code,
# you MUST define those ARGs here and pass them in docker-compose 'build: args'.
ARG NEXT_PUBLIC_MONGODB_URI
ENV NEXT_PUBLIC_MONGODB_URI=${NEXT_PUBLIC_MONGODB_URI}

# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED 1

# Build the application
RUN pnpm build

# -----------------------------------------------------------------------------
# Stage 4: Runner
# -----------------------------------------------------------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set permissions for nextjs cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy the standalone build (Output Tracing)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# Expose port 3000 (Compose maps this to 5555)
EXPOSE 3000

ENV PORT 3000

# Start the application
CMD ["node", "server.js"]