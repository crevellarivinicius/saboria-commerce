"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { HttpTypes } from "@medusajs/types"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SortProducts, { SortOptions } from "./sort-products"

type RefinementListProps = {
  sortBy: SortOptions
  categories?: HttpTypes.StoreProductCategory[]
  activeCategoryId?: string
  search?: boolean
  "data-testid"?: string
}

const RefinementList = ({
  sortBy,
  categories,
  activeCategoryId,
  "data-testid": dataTestId,
}: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  const sorted = categories
    ? [...categories].sort((a, b) => a.name.localeCompare(b.name))
    : []

  const linkCls = (active: boolean) =>
    `transition hover:text-saboria-cacao ${
      active ? "font-semibold text-saboria-cacao" : "text-saboria-cacao/60"
    }`

  return (
    <div className="mb-8 w-full small:mr-10 small:w-auto small:min-w-[230px]">
      <div className="rounded-2xl border border-saboria-cacao/10 bg-saboria-blush/30 p-6 small:sticky small:top-32">
        {sorted.length > 0 && (
          <div className="mb-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-saboria-cacao">
              Categorias
            </p>
            <ul className="flex flex-col gap-y-2 text-sm">
              <li>
                <LocalizedClientLink
                  href="/store"
                  className={linkCls(!activeCategoryId)}
                >
                  Todos os produtos
                </LocalizedClientLink>
              </li>
              {sorted.map((c) => (
                <li key={c.id}>
                  <LocalizedClientLink
                    href={`/categories/${c.handle}`}
                    className={linkCls(activeCategoryId === c.id)}
                  >
                    {c.name}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
            <div className="my-5 h-px bg-saboria-cacao/10" />
          </div>
        )}
        <SortProducts
          sortBy={sortBy}
          setQueryParams={setQueryParams}
          data-testid={dataTestId}
        />
      </div>
    </div>
  )
}

export default RefinementList
