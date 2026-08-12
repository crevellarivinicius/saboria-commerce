import LocalizedClientLink from "@modules/common/components/localized-client-link"

const BrandBand = () => {
  return (
    <section className="relative overflow-hidden bg-saboria-plum">
      <div className="content-container relative z-10 grid items-center gap-12 py-20 small:grid-cols-[1.15fr_0.85fr]">
        <div>
          <h2 className="font-display text-4xl italic leading-tight text-saboria-cream small:text-5xl">
            Doces artesanais para{" "}
            <span className="text-saboria-berry-bright">momentos que merecem</span>{" "}
            festa.
          </h2>
          <p className="mt-5 max-w-md text-[#E8CBD5]">
            Ingredientes selecionados, receitas próprias e produção em pequenos
            lotes — do nosso ateliê de confeitaria para a sua mesa.
          </p>
          <LocalizedClientLink
            href="/store"
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-saboria-berry-bright/70 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-saboria-cream transition hover:border-saboria-berry hover:bg-saboria-berry hover:text-white"
          >
            Conheça a Saboria
          </LocalizedClientLink>
        </div>
        <div className="relative h-[300px] -rotate-1 overflow-hidden rounded-2xl shadow-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/saboria/band.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <span className="absolute bottom-4 left-4 rounded-full bg-black/60 px-4 py-2 font-display text-base italic text-saboria-cream backdrop-blur">
            desde 2003
          </span>
        </div>
      </div>
    </section>
  )
}

export default BrandBand
