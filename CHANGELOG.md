# Changelog

Formato baseado no [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
com [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2026-08-12

### Adicionado

- Backend Medusa 2.16 com módulos de cache, event bus e workflow engine em Redis (ativados por `REDIS_URL`), SSL de banco opt-in via `DATABASE_SSL`;
- Bootstrap de base idempotente (`npm run setup`): região Brasil/BRL, tax region, estoque, frete padrão/expresso e publishable key;
- Seed de catálogo a partir de JSON (`npm run seed`): 6 linhas e 13 produtos de confeitaria com price list "de/por", informação nutricional, alergênicos e validade;
- Storefront Next.js 15 (App Router) em pt-BR com moeda BRL: home com hero de vitrine em arco, linhas interativas, mais vendidos, mosaico e manifesto; PDP com abas de informação nutricional e entrega; carrinho com mini-dropdown e add-to-cart nos cards; checkout com frete BR;
- Design system próprio: paleta framboesa/chocolate-ameixa, DM Serif Display + Outfit, logo tipográfico;
- Build OpenNext para Cloudflare Workers com cache incremental em KV para catálogo (dados por usuário em `no-store`);
- Docker Compose para infra local (Postgres 16 + Redis 7);
- CI (GitHub Actions): build do backend e typecheck do storefront;
- Documentação bilíngue (EN/pt-BR), ADRs de arquitetura, guia de deploy e créditos de imagem.
