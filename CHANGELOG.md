# Changelog

Formato baseado no [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
com [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [1.1.0] - 2026-11-05

### Adicionado

- Demo ao vivo: storefront no Cloudflare Workers (OpenNext) e backend no Render, com Postgres no Supabase e Redis no Upstash;
- Blueprint do Render (`render.yaml`) e flag `DISABLE_MEDUSA_ADMIN` para rodar o backend sem o dashboard em instâncias pequenas;
- Workflow que mantém o backend do demo acordado (ping a cada 10 minutos);
- Scores do Lighthouse medidos na URL pública.

### Alterado

- Storefront atualizado para Next.js 16.4 e React 19.3; invalidação de cache migrada para `revalidateTag(tag, { expire: 0 })`;
- `@types/react` unificado na raiz do monorepo (o pin antigo ficava em `pnpm.overrides`, ignorado pelo npm);
- Textos restantes do template do Medusa (checkout, títulos de página, 404) trocados pela marca Saboria.

### Corrigido

- Adicionar item ao carrinho falhava com erro 500: a região fiscal BR era criada sem provedor de imposto (`tp_system`). O `npm run setup` agora cria a região corretamente e corrige bancos já existentes;
- Rotas da conta com Next.js 16: visitante sem login em `/account/profile` (e demais sub-rotas) vê o login em vez de erro;
- Título duplicado nas páginas de categoria.

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
