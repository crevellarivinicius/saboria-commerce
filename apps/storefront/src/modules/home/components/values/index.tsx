const Values = () => {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/saboria/band.jpg')" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(120deg, rgba(32,14,24,.92), rgba(74,31,51,.8))",
        }}
      />
      <div className="content-container relative z-10 py-24">
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-saboria-berry-bright">
          Nosso Propósito
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="font-display text-5xl italic text-saboria-cream small:text-6xl">
            Selecionar
          </span>
          <span className="text-2xl text-saboria-berry-bright">·</span>
          <span className="font-display text-5xl italic text-saboria-cream small:text-6xl">
            Preparar
          </span>
          <span className="text-2xl text-saboria-berry-bright">·</span>
          <span className="font-display text-5xl italic text-saboria-cream small:text-6xl">
            Compartilhar
          </span>
        </div>
        <p className="mt-6 max-w-xl text-[#E8CBD5]">
          Ingredientes escolhidos a dedo, produção em pequenos lotes e o
          significado que nos move, traduzido no nosso propósito:{" "}
          <span className="text-saboria-cream">alimentar bons momentos</span>.
        </p>
      </div>
    </section>
  )
}

export default Values
