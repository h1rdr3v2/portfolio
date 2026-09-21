# deveze.bleon.net

Personal site and blog. Laravel + Inertia (React) on the front, Filament on
the back, one app.

```bash
composer run setup     # deps, .env, key, migrate, npm install, build
php artisan db:seed    # projects, roles, the three sample posts, the admin
composer run dev       # php server on :8000 + vite + queue + logs
```

The admin is at `/admin`. Sign in with `ADMIN_EMAIL` / `ADMIN_PASSWORD` from
`.env` (the seeder creates that account; change both before deploying).

## What lives where

| You want to… | Go to |
| --- | --- |
| Write or publish a post | `/admin/posts` — markdown, code fences highlighted, empty date = draft, future date = scheduled |
| Add a project, feature it, reorder the list | `/admin/projects` — drag rows to reorder, toggle *Featured* |
| Update roles | `/admin/roles` |
| Rewrite "What I'm working on" | `/admin/snippets` → `now` |
| Moderate comments | `/admin/comments` |
| Change your name, role, email, socials, booking link | `config/site.php` |
| The intro line, the colours, the fonts | `resources/js/features/about-section.tsx`, `resources/css/app.css` |

Readers can react (six emojis, one tap toggles) and comment on posts, both
anonymously; a fingerprint of IP + user agent stops double-counting. Views are
counted once per session. `/rss.xml` is the feed.

## Layout

```
app/
├── Models/            Post, Project, Role, Snippet, Comment, Reaction
├── Http/Controllers/  Home, Post (index/show), Reaction, Comment, Feed
├── Filament/          The admin — one resource per model
├── Services/          Markdown (rendered on save into *_html), ReaderFingerprint
config/site.php        Identity. Shared with every page as the `site` prop.
resources/
├── css/app.css        Design tokens: the palette, no webfonts, motion
├── js/pages/          One file per Inertia page: home, blog/index, blog/show, error
├── js/features/       The homepage sections, top to bottom
├── js/components/     UI primitives, project, blog, layout, theme
└── views/app.blade.php  Root template — meta/OG tags and the pre-paint theme script
database/seeders/data/ The seed content as JSON/markdown
```

Posts and snippets store markdown; the HTML is rendered once, on save, by
`App\Services\Markdown` (league/commonmark + tempest/highlight). Uploaded
images go to `storage/app/public` (served through `public/storage`); the seed
screenshots stay in `public/images/projects`.

## Deploying

`Dockerfile` builds the assets (client + SSR bundle) and ships PHP-FPM + nginx
in one image. `docker-compose.yml` runs it on `:3000` with volumes for the
SQLite database and uploads, and an optional `ssr` service:

```bash
APP_KEY=... ADMIN_EMAIL=... ADMIN_PASSWORD=... docker compose up --build
docker compose --profile ssr up          # with server-side rendering
```

Set `DB_*` to MySQL or Postgres to skip SQLite. Migrations run on boot.

## Tests

```bash
php artisan test
```

Feature tests cover every public page, reactions, comments, the feed, and
every admin page; the markdown pipeline has unit tests.
