import { defineCloudflareConfig } from "@opennextjs/cloudflare"
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache"

export default defineCloudflareConfig({
  // Cache incremental do Next (fetch force-cache + ISR) persistido em KV.
  // Catálogo (produtos/regiões/categorias) é cacheado entre navegações.
  // Dados por-usuário (carrinho/cliente/checkout) usam no-store nos data fns.
  incrementalCache: kvIncrementalCache,
})
