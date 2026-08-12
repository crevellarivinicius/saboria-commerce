import { Metadata } from "next"
import PageBanner from "@modules/content/page-banner"

export const metadata: Metadata = {
  title: "Trocas e Devoluções — Saboria",
}

export default function TrocasPage() {
  return (
    <>
      <PageBanner eyebrow="Institucional" title="Trocas e Devoluções" />
      <section className="bg-saboria-blush/20 py-16">
        <div className="content-container max-w-3xl space-y-8 text-saboria-cacao/80">
          <div>
            <h2 className="font-display text-2xl italic text-saboria-cacao">
              Direito de arrependimento
            </h2>
            <p className="mt-3 leading-relaxed">
              De acordo com o Código de Defesa do Consumidor (Art. 49), você pode
              desistir da compra em até <strong>7 dias corridos</strong> a partir
              do recebimento do produto, sem necessidade de justificativa. Basta
              entrar em contato pelo e-mail{" "}
              <a href="mailto:sac@saboria.com.br" className="text-saboria-berry underline">
                sac@saboria.com.br
              </a>
              .
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl italic text-saboria-cacao">
              Produtos com defeito ou avaria
            </h2>
            <p className="mt-3 leading-relaxed">
              Recebeu um produto com qualquer problema? Nos avise em até 7 dias com
              fotos do item e da embalagem. Faremos a troca ou o reembolso integral,
              sem custo adicional.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl italic text-saboria-cacao">
              Como solicitar
            </h2>
            <p className="mt-3 leading-relaxed">
              Envie um e-mail para sac@saboria.com.br com o número do pedido e o
              motivo. Nossa equipe responde em até 2 dias úteis com as instruções
              de postagem. O reembolso é processado em até 10 dias úteis após o
              recebimento do produto devolvido.
            </p>
          </div>
          <p className="text-sm italic text-saboria-cacao/50">
            Política sujeita a ajustes — versão preliminar, recomenda-se revisão
            jurídica antes da operação comercial.
          </p>
        </div>
      </section>
    </>
  )
}
