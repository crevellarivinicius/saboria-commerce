import { Suspense } from "react"

import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import HeaderShell from "./header-shell"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((r: StoreRegion[]) => r),
    listLocales(),
    getLocale(),
  ])

  const link =
    "text-sm font-semibold text-saboria-cream transition hover:text-white"

  return (
    <HeaderShell>
      <nav className="content-container flex items-center justify-between transition-all duration-300 group-data-[state=transparent]/nav:py-5 group-data-[state=solid]/nav:py-2.5">
        {/* esquerda: hamburguer (mobile) + logo */}
        <div className="flex flex-1 items-center gap-3">
          <div className="text-saboria-cream small:hidden">
            <SideMenu
              regions={regions}
              locales={locales}
              currentLocale={currentLocale}
            />
          </div>
          <LocalizedClientLink
            href="/"
            data-testid="nav-store-link"
            className="flex flex-col leading-none"
          >
            <span className="font-display text-3xl italic lowercase text-saboria-cream transition-all duration-300 group-data-[state=solid]/nav:text-2xl">
              saboria<span className="text-saboria-berry-bright">.</span>
            </span>
            <span className="mt-1 text-[8px] font-bold uppercase tracking-[0.34em] text-saboria-berry-bright">
              confeitaria artesanal
            </span>
          </LocalizedClientLink>
        </div>

        {/* centro: navegação */}
        <div className="hidden items-center gap-9 small:flex">
          <LocalizedClientLink
            href="/"
            className={`${link} relative after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-0.5 after:bg-saboria-berry-bright`}
          >
            Início
          </LocalizedClientLink>
          <LocalizedClientLink href="/a-saboria" className={`${link} opacity-90 hover:opacity-100`}>
            A Saboria
          </LocalizedClientLink>
          <LocalizedClientLink href="/store" className={`${link} opacity-90 hover:opacity-100`}>
            Produtos
          </LocalizedClientLink>
          <LocalizedClientLink href="/contato" className={`${link} opacity-90 hover:opacity-100`}>
            Contato
          </LocalizedClientLink>
        </div>

        {/* direita: ícones */}
        <div className="flex flex-1 items-center justify-end gap-5 text-saboria-berry-bright">
          <LocalizedClientLink href="/store" aria-label="Buscar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4-4" />
            </svg>
          </LocalizedClientLink>
          <LocalizedClientLink href="/account" aria-label="Conta" data-testid="nav-account-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </LocalizedClientLink>
          <Suspense
            fallback={
              <LocalizedClientLink href="/cart" aria-label="Sacola" className="flex items-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                  <path d="M3 5h2l2.5 12h11L21 8H7" />
                  <circle cx="9" cy="20" r="1.4" />
                  <circle cx="18" cy="20" r="1.4" />
                </svg>
              </LocalizedClientLink>
            }
          >
            <CartButton />
          </Suspense>
        </div>
      </nav>
    </HeaderShell>
  )
}
