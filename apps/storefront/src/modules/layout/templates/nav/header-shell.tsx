"use client"

import { useEffect, useState } from "react"

export default function HeaderShell({
  children,
}: {
  children: React.ReactNode
}) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50">
        {/* barra de avisos — sempre acima de tudo */}
        <div className="bg-saboria-cacao-deep py-2 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-saboria-cream">
          Frete grátis acima de R$ 99 ·{" "}
          <span className="text-saboria-berry-bright">Pix com 5% OFF</span> ·
          Parcele em até 3x
        </div>

        {/* header sempre sólido; compacta levemente ao rolar */}
        <header
          data-state={scrolled ? "solid" : "transparent"}
          className={`group/nav bg-saboria-cacao-deep transition-all duration-300 ${
            scrolled ? "shadow-lg" : ""
          }`}
        >
          {children}
        </header>
      </div>

      {/* espaçador para o conteúdo começar abaixo do header fixo */}
      <div className="h-[94px]" />
    </>
  )
}
