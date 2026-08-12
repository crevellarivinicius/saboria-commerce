import { Text } from "@modules/common/components/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import AddToCartButton from "@modules/products/components/add-to-cart-button"

export default async function ProductPreview({
  product,
  isFeatured,
  region: _region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  // const pricedProduct = await listProducts({
  //   regionId: region.id,
  //   queryParams: { id: [product.id!] },
  // }).then(({ response }) => response.products[0])

  // if (!pricedProduct) {
  //   return null
  // }

  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group block">
      <div
        data-testid="product-wrapper"
        className="overflow-hidden rounded-2xl bg-white shadow-[0_18px_40px_-26px_rgba(58,35,22,0.45)] transition duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_30px_56px_-26px_rgba(58,35,22,0.55)]"
      >
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          isFeatured={isFeatured}
        />
        <div className="p-4">
          <Text
            className="font-display text-lg text-saboria-cacao"
            data-testid="product-title"
          >
            {product.title}
          </Text>
          <div className="mt-2 flex items-center justify-between gap-x-2">
            <div className="font-semibold text-saboria-cacao">
              {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
            </div>
            <AddToCartButton variantId={product.variants?.[0]?.id} />
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
