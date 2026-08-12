# ADR 0003: OpenNext on Cloudflare with KV incremental cache

## Status

Accepted

## Context

The storefront targets Cloudflare Workers via **OpenNext**. Catalog pages
(home, category, product) are read-heavy and change only when the catalog
changes; cart, account and checkout are per-user and must never be shared.
Workers have no local filesystem, so Next.js' default file-based incremental
cache does not apply.

## Decision

- **Catalog data uses Next.js incremental caching backed by Cloudflare KV**
  (the OpenNext incremental cache adapter): cached across requests and PoPs,
  revalidated in the background;
- **Per-user data (cart, session, account) is fetched with `cache:
  "no-store"`** — always fresh, never shared;
- Locally, the same code runs on Next's default cache — the strategy is
  declared in the data-fetching layer, not in infrastructure.

## Consequences

- Catalog pages are served from edge cache in production, with the origin hit
  only on revalidation;
- A catalog change may take up to the revalidation window to appear — an
  accepted trade-off for a pâtisserie catalog (fresh data on stock is not a
  requirement of this storefront, unlike pricing correctness, which the
  checkout always re-validates server-side);
- During development, aggressive data caching can serve stale catalog after a
  reseed — clearing `.next` (or restarting dev) refreshes it. Documented here
  because it *will* surprise someone.
