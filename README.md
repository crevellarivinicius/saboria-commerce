# Saboria Commerce

![Node](https://img.shields.io/badge/Node-%E2%89%A520-339933)
![Medusa](https://img.shields.io/badge/Medusa-2.16-9f7aea)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![License](https://img.shields.io/badge/license-MIT-2ea44f)

**English** · [Português (Brasil)](README.pt-BR.md)

Full-stack headless e-commerce for **Saboria**, a fictional artisan pâtisserie: **Medusa 2** backend and a fully customized **Next.js (App Router)** storefront in a Turborepo monorepo — pt-BR storefront, BRL pricing with strike-through price lists, real product data model (nutritional info, allergens, shelf life) and a local environment that boots with two commands.

![Saboria homepage](docs/shot-home.png)

| Storefront | Product page | Mobile |
|---|---|---|
| ![Store](docs/shot-store.png) | ![PDP](docs/shot-pdp.png) | ![Mobile](docs/shot-mobile.png) |

## Lighthouse

Measured on the production build (`next build` + `next start`), homepage `/br`:

| | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Desktop | **100** | 94 | **100** | 91 |
| Mobile | **90** | 94 | **100** | 91 |

Core Web Vitals (mobile): FCP 1.0 s · LCP 3.5 s · TBT 80 ms · **CLS 0**.

## Stack

| Layer | Tech |
|---|---|
| Backend | [Medusa 2.16](https://medusajs.com) (Node 20+, Postgres, Redis-backed cache/event-bus/workflow-engine) |
| Storefront | Next.js 15 App Router, Tailwind CSS, [OpenNext](https://opennext.js.org/cloudflare) for Cloudflare Workers |
| Monorepo | Turborepo + npm workspaces |
| Infra (local) | Docker Compose (Postgres 16, Redis 7) |

## Features

- Catalog with 6 lines and 13 products seeded from a single JSON file (idempotent seed);
- **"De/por" pricing** via Medusa price lists — strike-through original price and discount badge on the PDP;
- Product data model with **nutritional info, allergens, gluten/lactose flags and shelf life** (rendered as PDP tabs);
- Cart with mini-dropdown in the header, add-to-cart from product cards, full checkout flow (BR region, flat-rate standard/express shipping);
- Custom design system: raspberry-on-chocolate palette, DM Serif Display + Outfit, arch "vitrine" hero;
- pt-BR storefront, BRL currency, `/br` region routing;
- **Incremental KV cache** on the OpenNext build for catalog pages, per-user data kept `no-store` ([ADR 0003](docs/adr/0003-opennext-incremental-cache.md));
- Redis-backed cache, event bus and workflow engine, enabled automatically when `REDIS_URL` is present.

## Quickstart

Requirements: Node 20+, Docker.

```bash
# 1. infra (Postgres + Redis)
docker compose up -d

# 2. dependencies
npm install

# 3. environment files
cp apps/backend/.env.template apps/backend/.env
cp apps/storefront/.env.template apps/storefront/.env.local

# 4. database: migrations + base data (BR region, shipping, publishable key) + catalog
npm run setup   -w @crevellari/backend
npm run seed    -w @crevellari/backend
npx medusa user -e admin@example.com -p supersecret \
  --prefix apps/backend   # admin login

# 5. run both apps
npm run dev
```

`npm run setup` prints the `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` — paste it into `apps/storefront/.env.local`, then:

- Storefront: http://localhost:8000
- Admin: http://localhost:9000/app

> The setup script is **idempotent per step** (region, tax, stock location, shipping, API key) — safe to re-run. The catalog seed wipes and recreates products, so it is also safe to re-run.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Backend (`:9000`) + storefront (`:8000`) in dev mode via Turbo |
| `npm run build` | Production build of both apps |
| `npm run setup -w @crevellari/backend` | Base data bootstrap (region BR, tax, stock, shipping, publishable key) |
| `npm run seed -w @crevellari/backend` | Catalog seed from `saboria-catalogo.json` |
| `npm run lint` | Lint both apps |

## Architecture

```
apps/
├── backend/         Medusa 2 — commerce API, admin, jobs
│   └── src/scripts/ setup.ts (base bootstrap) · seed-saboria-real.ts (catalog)
└── storefront/      Next.js App Router — src/modules/* per domain
```

Decisions worth reading:

- [ADR 0001 — Headless commerce on Medusa](docs/adr/0001-headless-commerce-medusa.md)
- [ADR 0002 — Turborepo monorepo](docs/adr/0002-monorepo-turborepo.md)
- [ADR 0003 — OpenNext incremental cache strategy](docs/adr/0003-opennext-incremental-cache.md)

## Deploying

The reference environment is local. [DEPLOY.md](DEPLOY.md) documents a production topology (Cloudflare Workers storefront, managed Postgres/Redis, S3-compatible media) without binding the project to any provider.

## Credits

Product and scene photography from [Pexels](https://www.pexels.com) (Pexels License) — see [CREDITS.md](CREDITS.md).

## License

[MIT](LICENSE) © Vinícius Augusto Crevellari
