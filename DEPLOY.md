# Deploy — Saboria Commerce

O ambiente de referência deste repositório é **local** (veja o README: `docker compose up -d` + `npm run dev`). Este guia documenta uma topologia de produção possível, sem amarrar o projeto a nenhum provedor.

Arquitetura sugerida: **Storefront (Next.js/OpenNext)** → Cloudflare Workers/Pages · **Backend (Medusa)** → Railway/Render/Fly · **Postgres** → Supabase/Neon/RDS · **Redis** → Upstash · **Mídia** → S3/R2.

> Ordem importa: **backend primeiro** (para ter a URL pública), depois o storefront.

## 1. Redis gerenciado

Crie um Redis com TLS (ex.: Upstash) e guarde a URL `rediss://...`. Os módulos de cache, event bus e workflow engine do backend ativam automaticamente quando `REDIS_URL` está definida.

## 2. Storage de mídia (S3/R2)

Crie um bucket com acesso público de leitura e um token S3 (access key/secret/endpoint). Configure o módulo `@medusajs/file-s3` no `medusa-config` com as variáveis `S3_*` abaixo.

## 3. Backend (Medusa)

1. Novo serviço a partir do repositório, **root = `apps/backend`**;
2. Build: `npm install && npm run build` · Start: `npm run start`;
3. Variáveis de ambiente:

   ```
   DATABASE_URL=<connection string do Postgres>
   DATABASE_SSL=true
   REDIS_URL=<url do Redis com TLS>
   JWT_SECRET=<gerar forte>
   COOKIE_SECRET=<gerar forte>
   STORE_CORS=https://loja.example.com
   ADMIN_CORS=https://loja.example.com,https://<backend-url>
   AUTH_CORS=https://loja.example.com,https://<backend-url>
   S3_FILE_URL=https://<dominio-publico-do-bucket>
   S3_ACCESS_KEY_ID=...
   S3_SECRET_ACCESS_KEY=...
   S3_REGION=auto
   S3_BUCKET=<bucket>
   S3_ENDPOINT=<endpoint S3>
   ```

4. Após subir: `npx medusa db:migrate`, `npm run setup` (região/frete/publishable key), `npm run seed` (catálogo demo) e `npx medusa user -e <email> -p <senha>` para o admin;
5. Anote a **URL pública do backend**.

## 4. Storefront (Next.js + OpenNext)

1. Projeto Cloudflare a partir do repositório, **root = `apps/storefront`** (o `wrangler.jsonc` do app já descreve o build OpenNext);
2. Variáveis de ambiente:

   ```
   MEDUSA_BACKEND_URL=https://<backend-url>
   NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://<backend-url>
   NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=<gerada no passo 3.4>
   NEXT_PUBLIC_DEFAULT_REGION=br
   NEXT_PUBLIC_BASE_URL=https://loja.example.com
   ```

3. O cache incremental do OpenNext usa KV — crie o namespace e vincule conforme o `wrangler.jsonc`.

## Observações

- O checkout usa o payment provider de sistema (manual). Para produção real, configure um provider (ex.: Stripe) e defina `NEXT_PUBLIC_STRIPE_KEY`;
- E-mails transacionais e webhooks de pagamento ficam fora do escopo desta demo.
