# ── PHP dependencies ───────────────────────────────────────────────────────
FROM composer:2 AS vendor
WORKDIR /app
COPY composer.json composer.lock ./
# Scripts need the app booted (artisan); they run in the runtime stage instead.
RUN composer install --no-dev --no-interaction --no-scripts --prefer-dist \
    --optimize-autoloader --ignore-platform-reqs

# ── Front-end build ────────────────────────────────────────────────────────
FROM node:22-alpine AS assets
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY vite.config.js ./
COPY resources ./resources
# app.js bundles Livewire and Alpine from the package itself.
COPY --from=vendor /app/vendor/livewire/livewire/dist ./vendor/livewire/livewire/dist
RUN npm run build

# ── Runtime: PHP-FPM behind nginx in one image ─────────────────────────────
FROM serversideup/php:8.5-fpm-nginx-alpine AS runtime

ENV PHP_OPCACHE_ENABLE=1 \
    SSL_MODE=off \
    AUTORUN_ENABLED=true \
    AUTORUN_LARAVEL_MIGRATION=true \
    AUTORUN_LARAVEL_STORAGE_LINK=true

WORKDIR /var/www/html

COPY --chown=www-data:www-data . .
COPY --chown=www-data:www-data --from=vendor /app/vendor ./vendor
COPY --chown=www-data:www-data --from=assets /app/public/build ./public/build

RUN composer run-script post-autoload-dump --no-interaction \
    && php artisan filament:assets --no-interaction \
    && php artisan config:clear
