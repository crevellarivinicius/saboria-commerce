import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PageBanner from "@modules/content/page-banner"
import { listCategories } from "@lib/data/categories"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = async ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  const categories = await listCategories({ fields: "id,name,handle" }).catch(
    () => []
  )

  return (
    <>
      <PageBanner
        eyebrow="Nossa loja"
        title="Todos os produtos"
        subtitle="Bolos, brigadeiros, macarons, cookies e cheesecakes — feitos em pequenos lotes."
      />
      <div
        className="content-container flex flex-col py-12 small:flex-row small:items-start"
        data-testid="category-container"
      >
        <RefinementList sortBy={sort} categories={categories} />
        <div className="w-full">
          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              countryCode={countryCode}
            />
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default StoreTemplate
