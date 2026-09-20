# ── Front-end build ────────────────────────────────────────────────────────
FROM node:22-alpine AS assets
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY vite.config.ts tsconfig.json ./
COPY resources ./resources
RUN npm run build

# ── Runtime ────────────────────────────────────────────────────────────────
# PHP-FPM behind nginx in one image, with Composer included. Node is added so
# the same image can run the Inertia SSR server (see docker-compose.yml).
FROM serversideup/php:8.5-fpm-nginx-alpine AS runtime

USER root
RUN apk add --no-cache nodejs
USER www-data

ENV PHP_OPCACHE_ENABLE=1 \
    SSL_MODE=off \
    AUTORUN_ENABLED=true \
    AUTORUN_LARAVEL_MIGRATION=true \
    AUTORUN_LARAVEL_STORAGE_LINK=true

WORKDIR /var/www/html

COPY --chown=www-data:www-data composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --no-scripts --prefer-dist --optimize-autoloader

COPY --chown=www-data:www-data . .
COPY --chown=www-data:www-data --from=assets /app/public/build ./public/build
COPY --chown=www-data:www-data --from=assets /app/bootstrap/ssr ./bootstrap/ssr

RUN composer run-script post-autoload-dump --no-interaction \
    && php artisan filament:assets --no-interaction \
    && php artisan config:clear
