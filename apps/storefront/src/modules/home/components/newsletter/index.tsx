const Newsletter = () => {
  return (
    <section className="bg-saboria-berry-deep py-16 text-white">
      <div className="content-container grid gap-10 small:grid-cols-2 small:items-center">
        <div>
          <h2 className="font-display text-4xl italic">
            Adoçamos sua caixa de entrada
          </h2>
          <p className="mt-3 max-w-md text-[#FFF1DD]">
            Receba lançamentos, receitas e cupons exclusivos. Sem spam — só
            delícia, feita à mão.
          </p>
          <form className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-1 rounded-full px-5 py-3 text-saboria-cacao outline-none"
            />
            <button
              type="button"
              className="rounded-full bg-saboria-cacao-deep px-7 py-3 text-sm font-bold uppercase tracking-wider text-saboria-cream transition hover:opacity-90"
            >
              Quero receber
            </button>
          </form>
        </div>
        <div className="small:text-right">
          <div className="font-display text-3xl">saboria</div>
          <div className="mt-1 text-[8px] font-bold uppercase tracking-[0.3em] text-[#FFF3E2]">
            feito em pequenos lotes
          </div>
          <p className="mt-4 text-sm leading-relaxed text-[#FFF3E2]">
            Trav. Romilda Rosa Leite Meleiro, 70
            <br />
            Vale dos Sabores · Brasil
            <br />
            sac@saboria.com.br
          </p>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
