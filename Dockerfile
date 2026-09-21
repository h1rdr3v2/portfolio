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

# DB_DATABASE is where SQLite lives unless the environment points at MySQL.
# It sits in its own directory so a volume can hold the file and nothing else.
ENV PHP_OPCACHE_ENABLE=1 \
    SSL_MODE=off \
    AUTORUN_ENABLED=true \
    AUTORUN_LARAVEL_MIGRATION=true \
    AUTORUN_LARAVEL_STORAGE_LINK=true \
    DB_DATABASE=/var/www/html/storage/sqlite/database.sqlite

WORKDIR /var/www/html

# Runs before the image's Laravel automations (entrypoint.d runs in name
# order; those are 50-*). Two jobs: SQLite refuses to connect unless its file
# already exists, and the automations test the connection before `migrate`
# could create it; and when a database is unreachable the automations only
# count down, so say why.
# The base image ships without intl (Filament tables format counts with it)
# and gd (ImageOptimizer writes webp with it).
USER root
RUN install-php-extensions intl gd
COPY <<'EOF' /etc/entrypoint.d/10-database.sh
#!/bin/sh
app="${APP_BASE_DIR:-/var/www/html}"

if [ "${DB_CONNECTION:-sqlite}" = "sqlite" ] && [ -n "$DB_DATABASE" ] && [ ! -f "$DB_DATABASE" ]; then
    mkdir -p "$(dirname "$DB_DATABASE")" && touch "$DB_DATABASE"
fi

(cd "$app" && php -r '
    require "vendor/autoload.php";
    $app = require "bootstrap/app.php";
    $app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
    try {
        $app["db"]->connection()->getPdo();
        echo "Database connection OK (", config("database.default"), ")\n";
    } catch (Throwable $e) {
        echo "Database connection failed (", config("database.default"), "): ", $e->getMessage(), "\n";
    }
')
EOF
RUN chmod +x /etc/entrypoint.d/10-database.sh
USER www-data

COPY --chown=www-data:www-data . .
COPY --chown=www-data:www-data --from=vendor /app/vendor ./vendor
COPY --chown=www-data:www-data --from=assets /app/public/build ./public/build

# The SQLite directory exists in the image, owned by www-data, so a fresh
# volume mounted over it starts out writable.
RUN mkdir -p storage/sqlite \
    && composer run-script post-autoload-dump --no-interaction \
    && php artisan filament:assets --no-interaction \
    && php artisan config:clear
