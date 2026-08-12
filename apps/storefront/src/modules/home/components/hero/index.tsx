import LocalizedClientLink from "@modules/common/components/localized-client-link"

const proofs = ["Feito no dia", "Pequenos lotes", "Sem conservantes"]

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-saboria-cream">
      {/* brilho rosé decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-saboria-blush/70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-52 -left-32 h-[420px] w-[420px] rounded-full bg-saboria-berry/10 blur-3xl"
      />

      <div className="content-container relative z-10 grid items-center gap-12 py-16 small:grid-cols-[1.05fr_0.95fr] small:py-24">
        {/* conteúdo */}
        <div className="order-2 text-center small:order-1 small:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-saboria-berry/25 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-saboria-berry">
            Confeitaria artesanal
          </span>
          <h1 className="mt-6 font-display text-5xl italic leading-[1.02] text-saboria-cacao small:text-7xl">
            Doce como
            <br />
            deve ser<span className="text-saboria-berry">.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-saboria-cacao/70 small:mx-0">
            Bolos, brigadeiros, macarons e cheesecakes feitos no dia, em
            pequenos lotes — para os momentos que merecem festa.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 small:justify-start">
            <LocalizedClientLink href="/store">
              <button className="rounded-full bg-saboria-berry px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[0_16px_30px_-14px_rgba(194,46,90,0.55)] transition hover:bg-saboria-berry-bright">
                Ver a vitrine
              </button>
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/a-saboria"
              className="text-sm font-bold uppercase tracking-wider text-saboria-cacao underline-offset-4 transition hover:text-saboria-berry hover:underline"
            >
              Nossa história
            </LocalizedClientLink>
          </div>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 small:justify-start">
            {proofs.map((proof) => (
              <li
                key={proof}
                className="flex items-center gap-2 text-[13px] font-semibold text-saboria-cacao/60"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-saboria-berry"
                />
                {proof}
              </li>
            ))}
          </ul>
        </div>

        {/* vitrine em arco */}
        <div className="order-1 mx-auto w-full max-w-[420px] small:order-2">
          <div className="relative">
            <div className="overflow-hidden rounded-t-[999px] rounded-b-3xl border-8 border-white shadow-[0_35px_70px_-30px_rgba(42,22,31,0.45)]">
              <div
                className="aspect-[4/5] w-full bg-saboria-blush bg-cover bg-center"
                style={{ backgroundImage: "url('/saboria/hero.jpg')" }}
                role="img"
                aria-label="Doces artesanais da vitrine Saboria"
              />
            </div>
            <span className="absolute -left-3 bottom-10 rounded-full bg-saboria-cacao-deep px-5 py-2.5 font-display text-base italic text-saboria-cream shadow-xl small:-left-8">
              fornada de hoje
            </span>
            <span className="absolute -right-2 top-8 rounded-full bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-saboria-berry shadow-lg small:-right-5">
              5% off no Pix
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
