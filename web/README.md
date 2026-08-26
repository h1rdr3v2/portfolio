# deveze.bleon.net

Portfolio and writing, built with TanStack Start.

```bash
npm install && npm run dev
```

Dev server runs on `http://localhost:3000`. `npm run build` produces a Nitro
server in `.output`; `npm start` runs it.

## How it is laid out

```
src/
├── routes/          File-based routes. One file per URL, nothing else.
├── features/        One folder per page section — hero, featured, projects…
├── components/      Reusable pieces, grouped by what they are about
│   ├── ui/          Primitives with no domain knowledge (Section, Tag, Modal)
│   ├── layout/      The frame: rail, mobile header, page shell
│   ├── project/     Cards, dialog, gallery, links
│   ├── blog/        Post rows, post body, reading progress
│   └── device/      The pinned showcase pane
├── data/            The actual content: projects, experience
├── config/          Identity and navigation — edited often, imported everywhere
├── lib/             Pure helpers and the server-side blog pipeline
├── hooks/           Scroll spy, smooth scroll, reveal, viewport
├── types/           Domain types, no React
└── styles/app.css   Design tokens, then everything derives from them
```

The rule the structure follows: **a section knows about its own content and
nothing else.** Sections compose primitives; primitives never import data.
Anything shared between two sections moves down into `components/ui`.

## Editing content

**Projects** live in `src/data/projects.ts`. Add an entry, and it appears in the
grid and its filter automatically. The three in the scroll-through showcase are
listed in `featuredProjects` at the bottom of the same file — a featured project
needs screenshots, since the pinned pane is the point of that section.

Featured entries can carry a `metrics` array (`{ value, label }`). It is empty
right now: the showcase drops the stat row rather than display numbers nobody
has verified. Fill it in and the row appears.

**Writing** lives in `content/blog/<slug>/index.md`, with frontmatter:

```markdown
---
title: "Post title"
date: "2026-08-26"
excerpt: "One or two sentences, shown in every list."
author: "Destiny Ezenwata"
tags: ["React Native", "Offline"]
---
```

Drop images beside the markdown and reference them as `./images/shot.png`; the
pipeline rewrites the path to `/blog-images/<slug>/shot.png`, which is where
they should be copied in `public/`.

The homepage shows the three most recent posts and links to `/blog` for the
rest. That cap is `HOME_POST_LIMIT` in `src/routes/index.tsx`.

Code fences are highlighted by Shiki. Only the grammars listed in
`src/lib/blog/markdown.ts` are bundled — add a language there before using it in
a post, or the fence renders as plain text.

**Identity** — name, role, location, socials, booking link — is in
`src/config/site.ts`. Section names and order are in `src/config/navigation.ts`;
adding a section there wires it into the rail, the mobile nav and the scroll spy
at once.

## Design tokens

Colours, type scale and fonts are custom properties in `src/styles/app.css`,
re-exported into Tailwind with `@theme inline`. Components use semantic classes
(`bg-bg`, `text-mute`, `border-rule`) and never literal colours, so a re-skin is
a change to that one block.

## Running both sites

`docker-compose.yml` in the repo root brings up this site and the previous one
together, so they can sit side by side in two tabs:

```bash
docker compose up --build
```

New site on `:3000`, the old one on `:3002`. Override either when a port is
already taken:

```bash
PORT_NEW=4000 PORT_OLD=4001 docker compose up
```

`docker compose up portfolio` runs just this one.

## The deploy's own URL

`og:url`, `og:image` and `twitter:image` have to be absolute — crawlers will not
resolve a relative path — so the origin is a deploy-time fact. It defaults to
the canonical domain in `src/config/site.ts`, which is the right answer for
production and means a link shared from a preview still points at the real site.

To have a deploy advertise its own domain instead, set `VITE_SITE_URL`.

**It is a build-time value, not a runtime one.** Vite inlines `VITE_*` into the
bundle when `npm run build` runs, so setting it as a runtime environment
variable has no effect. `web/Dockerfile` takes it as an `ARG` and
`docker-compose.yml` passes it through, falling back to Coolify's
`SERVICE_URL_PORTFOLIO` when it is not given explicitly:

```bash
VITE_SITE_URL=https://staging.example.dev docker compose up --build portfolio
```

## Deploying

`Dockerfile` builds and runs the Nitro output; `nixpacks.toml` covers Railway.
Both ship `content/` alongside the build — posts are read from disk at request
time, not baked into the bundle, so the image needs that directory present.
