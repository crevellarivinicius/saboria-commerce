import { Metadata } from "next"
import PageBanner from "@modules/content/page-banner"

export const metadata: Metadata = {
  title: "Contato — Saboria",
  description: "Fale com a Saboria. Dúvidas, críticas ou pedidos, adoramos conversar.",
}

export default function ContatoPage() {
  return (
    <>
      <PageBanner
        eyebrow="Fale com a gente"
        title="Contato"
        subtitle="Na Saboria, adoramos conversar e conhecer pessoas. Qualquer dúvida, crítica ou pedido, fale com a gente!"
      />

      <section className="bg-saboria-berry-deep py-16 text-white">
        <div className="content-container grid gap-12 small:grid-cols-[1.2fr_0.8fr]">
          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                placeholder="Nome"
                className="w-full rounded-lg border-none px-5 py-3.5 text-saboria-cacao outline-none"
              />
              <input
                placeholder="Telefone"
                className="w-full rounded-lg border-none px-5 py-3.5 text-saboria-cacao outline-none"
              />
            </div>
            <input
              placeholder="E-mail"
              type="email"
              className="w-full rounded-lg border-none px-5 py-3.5 text-saboria-cacao outline-none"
            />
            <textarea
              placeholder="Mensagem"
              rows={5}
              className="w-full rounded-lg border-none px-5 py-3.5 text-saboria-cacao outline-none"
            />
            <button
              type="button"
              className="w-full rounded-full bg-saboria-cacao-deep py-4 text-sm font-bold uppercase tracking-wider text-saboria-cream transition hover:opacity-90"
            >
              Enviar
            </button>
          </form>

          <div className="small:pl-8">
            <div className="font-display text-3xl lowercase text-white">saboria</div>
            <div className="mt-1 text-[8px] font-bold uppercase tracking-[0.34em] text-[#FFF3E2]">
              feito em pequenos lotes
            </div>
            <p className="mt-6 text-sm leading-relaxed text-[#FFF3E2]">
              Trav. Romilda Rosa Leite Meleiro, 70
              <br />
              Vale dos Sabores · Brasil
            </p>
            <p className="mt-4 text-sm text-[#FFF3E2]">
              <a href="mailto:sac@saboria.com.br" className="hover:underline">
                sac@saboria.com.br
              </a>
            </p>
            <div className="mt-6 flex gap-4 text-sm font-semibold text-white">
              <a href="#" className="hover:underline">Instagram</a>
              <a href="#" className="hover:underline">Facebook</a>
              <a href="#" className="hover:underline">WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
