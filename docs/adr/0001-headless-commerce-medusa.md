# ADR 0001: Headless commerce on Medusa 2

## Status

Accepted

## Context

The project needed a commerce engine for a small direct-to-consumer catalog
(tens of SKUs), with full control over the storefront experience, BRL pricing
with promotional price lists, and a data model extensible enough to carry
food-specific attributes (nutritional info, allergens, shelf life).

Options considered:

1. **Monolithic platform (Magento/WooCommerce)** — complete feature set, but
   the storefront is coupled to the platform's rendering stack, and the
   operational footprint (PHP-FPM, search engine, FPC) is heavy for a catalog
   this size;
2. **SaaS (Shopify)** — fastest to launch, but checkout/domain lock-in,
   monthly cost per store, and limited backend extensibility;
3. **Headless Node commerce (Medusa 2)** — commerce primitives (products,
   price lists, regions, carts, fulfillment) exposed over REST, storefront
   fully owned, extension via TypeScript modules and workflows.

## Decision

Use **Medusa 2** as the commerce backend and a custom **Next.js** storefront.

- Product metadata carries the food-specific fields, rendered by the
  storefront as PDP tabs — no platform surgery required;
- Price lists model the "de/por" promotional pricing natively;
- Regions/sales channels give BRL + `/br` routing with a clean path to
  multi-region later;
- The whole stack is TypeScript, one language across backend, storefront and
  tooling.

## Consequences

- Features a monolith ships out of the box (CMS pages, reviews, promotions
  UI) must be built or integrated when needed;
- The storefront owns SEO, caching and performance decisions (see ADR 0003);
- Local development requires orchestrating two apps plus Postgres/Redis —
  mitigated by the compose file and the idempotent bootstrap scripts.
