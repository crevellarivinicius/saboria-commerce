import { notFound } from "next/navigation"
import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import PageBanner from "@modules/content/page-banner"
import { listCategories } from "@lib/data/categories"
import { HttpTypes } from "@medusajs/types"

export default async function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  const categories = await listCategories({ fields: "id,name,handle" }).catch(
    () => []
  )

  return (
    <>
      <PageBanner
        eyebrow="Nossas Linhas"
        title={category.name}
        subtitle={category.description || undefined}
      />
      <div
        className="content-container flex flex-col py-12 small:flex-row small:items-start"
        data-testid="category-container"
      >
        <RefinementList
          sortBy={sort}
          categories={categories}
          activeCategoryId={category.id}
          data-testid="sort-by-container"
        />
        <div className="w-full">
          <Suspense
            fallback={
              <SkeletonProductGrid
                numberOfProducts={category.products?.length ?? 8}
              />
            }
          >
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              categoryId={category.id}
              countryCode={countryCode}
            />
          </Suspense>
        </div>
      </div>
    </>
  )
}
