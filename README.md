# deveze.bleon.net

Personal site and blog. Laravel with Blade and Livewire on the front, Filament
on the back, one app, one container.

```bash
composer run setup     # deps, .env, key, migrate, npm install, build
php artisan db:seed    # projects, roles, the three posts, the admin — empty tables only
composer run dev       # php server on :8000 + vite + queue + logs
```

The admin is at `/admin`. Sign in with `ADMIN_EMAIL` / `ADMIN_PASSWORD` from
`.env` (the seeder creates that account; change both before deploying).

## What lives where

| You want to… | Go to |
| --- | --- |
| Write or publish a post | `/admin/posts` — markdown, code fences highlighted, empty date = draft, future date = scheduled |
| Add a project, feature it, reorder the list | `/admin/projects` — drag rows to reorder, toggle *Featured* |
| Add a project from the seed file to a seeded site | `php artisan projects:import` — inserts what the database is missing, shows the list and asks first |
| Update roles | `/admin/roles` |
| Rewrite "What I'm working on" | `/admin/snippets` → `now` |
| Moderate comments | `/admin/comments` |
| Change your name, role, email, socials, booking link | `config/site.php` |
| The intro line, the colours, the fonts | `resources/views/home.blade.php`, `resources/css/app.css` |

Readers can react (six emojis, one tap toggles) and comment on posts, both
anonymously through Livewire; a fingerprint of IP + user agent stops
double-counting. Views are counted once per session. `/rss.xml` is the feed.

## Layout

```
app/
├── Models/            Post, Project, Role, Snippet, Comment, Reaction
├── Http/Controllers/  Home, Post (index/show), Feed, Sitemap
├── Livewire/          PostReactions, PostComments — the two interactive parts
├── Filament/          The admin — one resource per model
├── Services/          Markdown (rendered on save), ImageOptimizer, ReaderFingerprint
config/site.php        Identity, read straight from the views
resources/
├── css/app.css        Design tokens: the palette, no webfonts, motion
├── js/app.js          Alpine components (the light switch, lightbox, hand) + Livewire
├── views/home, blog/  The pages
├── views/components/  layouts/site (the frame + meta tags), site/, project/, blog/, ui/
├── views/livewire/    The two Livewire views
└── views/errors/      404 and friends, in the site's own frame
database/seeders/data/ The seed content as JSON/markdown
```

Pages are server-rendered Blade: the HTML arrives complete, and the only
JavaScript is Livewire's bundle plus a few Alpine components.

Posts and snippets store markdown; the HTML is rendered once, on save, by
`App\Services\Markdown` (league/commonmark + tempest/highlight). Uploaded
images go to `storage/app/public` (served through `public/storage`); the seed
screenshots stay in `public/images/projects`.

## Deploying

`Dockerfile` builds the assets and ships PHP-FPM + nginx in one image.
`docker-compose.yml` runs it on `:3000` with volumes for the SQLite database
and uploads:

```bash
APP_KEY=... ADMIN_EMAIL=... ADMIN_PASSWORD=... docker compose up --build
```

Set `DB_*` to MySQL to skip SQLite. Migrations run on boot; seeding is manual and only ever fills empty tables, so it is safe to run again.

## Tests

```bash
php artisan test
```

Feature tests cover every public page, the two Livewire components, the feed,
seeding, and every admin page; the markdown pipeline has unit tests.
