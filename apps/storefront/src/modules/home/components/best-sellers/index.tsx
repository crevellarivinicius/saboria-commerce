import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import AddToCartButton from "@modules/products/components/add-to-cart-button"

// categoria por produto (do catálogo demo) — evita depender de fields extras na API
const CAT: Record<string, string> = {
  "bolo-chocolate-belga": "Bolos & Tortas",
  "torta-limao-siciliano": "Bolos & Tortas",
  "caixa-brigadeiro-belga-12": "Brigadeiros Finos",
  "brigadeiros-pistache-6": "Brigadeiros Finos",
  "macarons-sortidos-8": "Macarons",
  "macarons-framboesa-6": "Macarons",
  "cookie-chocolate-chunks": "Cookies & Brownies",
  "brownie-70-cacau": "Cookies & Brownies",
  "cookie-red-velvet": "Cookies & Brownies",
  "cheesecake-frutas-vermelhas": "Cheesecakes",
  "cheesecake-maracuja": "Cheesecakes",
  "kit-cafe-da-tarde": "Kits & Presentes",
  "caixa-doces-finos-16": "Kits & Presentes",
}

export default async function BestSellers({
  countryCode,
}: {
  countryCode: string
}) {
  const region = await getRegion(countryCode)
  if (!region) return null

  const {
    response: { products },
  } = await listProducts({ countryCode, queryParams: { limit: 9 } })

  if (!products?.length) return null

  const [featured, ...rest] = products
  const priceOf = (p: any) =>
    getProductPrice({ product: p }).cheapestPrice?.calculated_price
  const catOf = (p: any) => CAT[p.handle] || "Saboria"
  const weightOf = (p: any) => (p.weight ? `${p.weight}g` : "")
  const variantOf = (p: any) => p.variants?.[0]?.id

  return (
    <section className="bg-saboria-blush py-20">
      <div className="content-container">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-saboria-berry">
              Favoritos da casa
            </p>
            <h2 className="mt-2 font-display text-4xl italic text-saboria-cacao">
              Mais vendidos
            </h2>
          </div>
          <LocalizedClientLink
            href="/store"
            className="hidden text-xs font-bold uppercase tracking-wider text-saboria-rose hover:underline small:inline"
          >
            Ver todos os produtos →
          </LocalizedClientLink>
        </div>

        <div className="mt-9 grid grid-cols-2 gap-5 small:grid-cols-4">
          {/* card destaque */}
          {featured && (
            <LocalizedClientLink
              href={`/products/${featured.handle}`}
              className="group col-span-2 row-span-2 block"
            >
              <div className="grid h-full overflow-hidden rounded-2xl bg-white shadow-[0_18px_40px_-26px_rgba(58,35,22,0.45)] transition duration-300 group-hover:-translate-y-1.5 small:grid-cols-[1.1fr_0.9fr]">
                <div
                  className="relative min-h-[260px] bg-cover bg-center"
                  style={{ backgroundImage: `url(${featured.thumbnail})` }}
                >
                  <span className="absolute left-3 top-3 rounded-full bg-saboria-cacao-deep px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-saboria-berry-bright">
                    Destaque
                  </span>
                </div>
                <div className="flex flex-col justify-center p-7">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-saboria-rose">
                    {catOf(featured)}
                  </p>
                  <h3 className="mt-2 font-display text-2xl italic leading-tight text-saboria-cacao">
                    {featured.title}
                  </h3>
                  {featured.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-saboria-cacao/60">
                      {featured.description}
                    </p>
                  )}
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-xl font-extrabold text-saboria-cacao">
                      {priceOf(featured)}
                      {weightOf(featured) && (
                        <small className="ml-1 text-xs font-semibold text-saboria-cacao/50">
                          / {weightOf(featured)}
                        </small>
                      )}
                    </span>
                    <AddToCartButton variantId={variantOf(featured)} />
                  </div>
                </div>
              </div>
            </LocalizedClientLink>
          )}

          {/* cards regulares */}
          {rest.map((p: any) => (
            <LocalizedClientLink
              key={p.id}
              href={`/products/${p.handle}`}
              className="group block"
            >
              <div className="overflow-hidden rounded-2xl bg-white shadow-[0_18px_40px_-26px_rgba(58,35,22,0.45)] transition duration-300 group-hover:-translate-y-1.5">
                <div
                  className="relative h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${p.thumbnail})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-saboria-cacao-deep px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-saboria-berry-bright">
                    {catOf(p)}
                  </span>
                  <span className="absolute right-3 top-3 rounded-full bg-saboria-berry-bright px-2.5 py-1 text-[10px] font-extrabold text-white">
                    5% Pix
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-saboria-rose">
                    {catOf(p)}
                  </p>
                  <h3 className="mt-1 font-display text-lg text-saboria-cacao">
                    {p.title}
                  </h3>
                  {weightOf(p) && (
                    <p className="text-xs text-saboria-cacao/50">{weightOf(p)}</p>
                  )}
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xl font-extrabold text-saboria-cacao">
                      {priceOf(p)}
                    </span>
                    <AddToCartButton variantId={variantOf(p)} />
                  </div>
                </div>
              </div>
            </LocalizedClientLink>
          ))}
        </div>
      </div>
    </section>
  )
}
