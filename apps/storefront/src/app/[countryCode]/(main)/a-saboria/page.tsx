import { Metadata } from "next"
import PageBanner from "@modules/content/page-banner"
import Values from "@modules/home/components/values"

export const metadata: Metadata = {
  title: "A Saboria — Nossa História",
  description:
    "Conheça a história da Saboria: confeitaria artesanal feita em pequenos lotes, com ingredientes selecionados e receitas próprias.",
}

export default function ASaboriaPage() {
  return (
    <>
      <PageBanner
        eyebrow="A Saboria"
        title="Nossa História"
        subtitle="Feito em pequenos lotes — para alimentar bons momentos."
      />

      <section className="bg-saboria-blush/20 py-20">
        <div className="content-container max-w-3xl space-y-5 text-lg leading-relaxed text-saboria-cacao/80">
          <p>
            A Saboria nasceu em uma cozinha pequena, com uma panela de brigadeiro
            no fogo e a teimosia de acreditar que doce bom não precisa de
            atalhos. Das primeiras caixinhas vendidas para vizinhos surgiu um
            ateliê de confeitaria que cresceu sem abrir mão do jeito de fazer:
            em pequenos lotes, com ingredientes que a gente teria orgulho de
            servir em casa.
          </p>
          <p>
            Hoje são bolos e tortas feitos no dia, brigadeiros enrolados à mão,
            macarons de casquinha crocante, cookies, cheesecakes e caixas de
            presente — uma vitrine inteira pensada para transformar qualquer
            data em ocasião.
          </p>
          <p>
            De lá para cá muita coisa mudou, menos o essencial: cada fornada
            continua saindo pequena, provada e aprovada antes de chegar à sua
            mesa.
          </p>
          <p className="font-display text-2xl italic text-saboria-cacao">
            Tudo isso traduzido no nosso propósito: alimentar bons momentos.
          </p>
        </div>
      </section>

      {/* Nosso Propósito — Selecionar · Preparar · Compartilhar */}
      <Values />

      <section className="bg-saboria-cacao-deep py-16 text-center">
        <div className="content-container">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-saboria-berry-bright">
            Nosso Manifesto
          </p>
          <p className="mx-auto mt-5 max-w-2xl font-display text-2xl italic leading-relaxed text-saboria-cream small:text-3xl">
            “Acreditamos que comida boa é feita para ser compartilhada — e que o
            cuidado artesanal é o que torna cada momento inesquecível.”
          </p>
        </div>
      </section>
    </>
  )
}
