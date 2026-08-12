"use client"

import { useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const lines = [
  {
    name: "Bolos & Tortas",
    handle: "bolos-tortas",
    img: "300101",
    eyebrow: "O centro da mesa",
    desc: "Bolo de chocolate belga com ganache e torta de limão siciliano com merengue maçaricado — feitos no dia, para 10 fatias generosas.",
  },
  {
    name: "Brigadeiros Finos",
    handle: "brigadeiros",
    img: "300201",
    eyebrow: "Enrolados à mão",
    desc: "Chocolate belga, pistache e granulado de cacau 70%. A caixa que resolve presente, comemoração e segunda-feira difícil.",
  },
  {
    name: "Macarons",
    handle: "macarons",
    img: "300301",
    eyebrow: "Casquinha crocante",
    desc: "Framboesa, pistache, chocolate, baunilha e limão — coloridos naturalmente, recheados com ganache cremosa.",
  },
  {
    name: "Cookies & Brownies",
    handle: "cookies-brownies",
    img: "300401",
    eyebrow: "Assados no dia",
    desc: "Cookies de centro macio, brownie 70% de origem única e o red velvet que virou febre na vitrine.",
  },
  {
    name: "Cheesecakes",
    handle: "cheesecakes",
    img: "300501",
    eyebrow: "Assados lentamente",
    desc: "Cream cheese sobre base amanteigada, com calda de frutas vermelhas frescas ou maracujá com sementes crocantes.",
  },
  {
    name: "Kits & Presentes",
    handle: "kits-presentes",
    img: "300601",
    eyebrow: "Prontos para dar",
    desc: "Caixas presenteáveis com o melhor da vitrine — do kit café da tarde à caixa de doces finos dos casamentos.",
  },
]

export default function NossasLinhas() {
  const [active, setActive] = useState(0)
  const line = lines[active]

  return (
    <section className="bg-saboria-blush/30 py-20">
      <div className="content-container">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-saboria-berry">
          Conheça nossos deliciosos produtos
        </p>
        <h2 className="mt-2 font-display text-4xl italic text-saboria-cacao">
          Nossas Linhas
        </h2>

        <div className="mt-7 flex flex-wrap gap-2">
          {lines.map((l, i) => (
            <button
              key={l.name}
              type="button"
              onClick={() => setActive(i)}
              className={`rounded-full px-3.5 py-1.5 text-[13px] font-bold transition ${
                i === active
                  ? "bg-saboria-berry text-white shadow-[0_8px_20px_-8px_rgba(194,46,90,0.6)]"
                  : "border border-saboria-cacao/20 text-saboria-cacao hover:border-saboria-berry"
              }`}
            >
              {l.name}
            </button>
          ))}
        </div>

        <div className="mt-10 grid items-center gap-8 rounded-2xl bg-white p-4 shadow-xl small:grid-cols-[0.9fr_1.1fr]">
          <div
            key={line.img}
            className="h-[300px] animate-[enter_300ms_ease-out] rounded-xl bg-cover bg-center"
            style={{ backgroundImage: `url('/saboria/products/${line.img}.jpg')` }}
          />
          <div className="px-2 py-2 small:pr-10">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-saboria-berry">
              {line.eyebrow}
            </p>
            <h3 className="mt-2 font-display text-3xl italic text-saboria-cacao">
              {line.name}
            </h3>
            <p className="mt-3 max-w-md text-saboria-cacao/70">{line.desc}</p>
            <LocalizedClientLink
              href={`/categories/${line.handle}`}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-saboria-berry px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-saboria-berry-bright"
            >
              Conheça a linha
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </section>
  )
}
