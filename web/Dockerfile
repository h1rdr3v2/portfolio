# ── Build stage ────────────────────────────────────────────────────────────
FROM node:22-alpine AS build
WORKDIR /app

# Dependencies are installed from the lockfile alone so this layer is only
# rebuilt when the lockfile changes, not on every source edit.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Vite inlines import.meta.env.VITE_* at build time, so this has to be a build
# arg — a runtime environment variable would never reach the bundle. Unset, the
# app falls back to the canonical domain in src/config/site.ts.
ARG VITE_SITE_URL
ENV VITE_SITE_URL=$VITE_SITE_URL

RUN npm run build

# ── Runtime stage ──────────────────────────────────────────────────────────
FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# The Nitro output is self-contained, but the blog is read from disk at request
# time, so `content/` ships alongside it.
COPY --from=build /app/.output ./.output
COPY --from=build /app/content ./content

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
	CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/ || exit 1

CMD ["node", ".output/server/index.mjs"]
