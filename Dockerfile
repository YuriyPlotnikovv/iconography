# Multi-stage Dockerfile for Next.js (production)
# Builds the app and serves it with `next start` on port 3000

FROM node:24-alpine AS builder
ARG COCKPIT_API_URL
ARG COCKPIT_API_KEY
ENV NEXT_PUBLIC_COCKPIT_URL=$COCKPIT_API_URL
ENV COCKPIT_API_KEY=$COCKPIT_API_KEY
WORKDIR /app

# Install dependencies (prefer npm ci when lockfile present)
COPY package.json package-lock.json* yarn.lock* ./
RUN npm ci --no-audit --prefer-offline || npm install

# Copy source and build
COPY . .
RUN npm run build

FROM node:24-alpine AS runner
WORKDIR /app

# Copy only what is needed to run
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s CMD wget -qO- http://127.0.0.1:3000/health || exit 1

CMD ["npm", "run", "start"]

