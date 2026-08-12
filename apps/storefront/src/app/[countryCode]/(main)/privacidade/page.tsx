import { Metadata } from "next"
import PageBanner from "@modules/content/page-banner"

export const metadata: Metadata = {
  title: "Política de Privacidade (LGPD) — Saboria",
}

export default function PrivacidadePage() {
  return (
    <>
      <PageBanner eyebrow="Institucional" title="Privacidade (LGPD)" />
      <section className="bg-saboria-blush/20 py-16">
        <div className="content-container max-w-3xl space-y-8 text-saboria-cacao/80">
          <p className="leading-relaxed">
            A Saboria Alimentos Ltda. respeita a sua privacidade e trata seus
            dados pessoais de acordo com a Lei Geral de Proteção de Dados (Lei nº
            13.709/2018 — LGPD).
          </p>
          <div>
            <h2 className="font-display text-2xl italic text-saboria-cacao">
              Quais dados coletamos
            </h2>
            <p className="mt-3 leading-relaxed">
              Coletamos os dados necessários para processar seu pedido: nome, CPF,
              e-mail, telefone, endereço de entrega e dados de pagamento (estes
              processados de forma segura pelo nosso provedor, sem que armazenemos
              os números do cartão).
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl italic text-saboria-cacao">
              Como usamos
            </h2>
            <p className="mt-3 leading-relaxed">
              Usamos seus dados para concluir e entregar pedidos, emitir nota
              fiscal, oferecer suporte e, com seu consentimento, enviar novidades e
              ofertas. Não vendemos seus dados a terceiros.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl italic text-saboria-cacao">
              Seus direitos
            </h2>
            <p className="mt-3 leading-relaxed">
              Você pode solicitar a qualquer momento o acesso, a correção ou a
              exclusão dos seus dados, bem como revogar consentimentos. Basta
              escrever para{" "}
              <a href="mailto:sac@saboria.com.br" className="text-saboria-berry underline">
                sac@saboria.com.br
              </a>
              .
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl italic text-saboria-cacao">
              Cookies
            </h2>
            <p className="mt-3 leading-relaxed">
              Utilizamos cookies essenciais para o funcionamento da loja e cookies
              de análise para melhorar sua experiência. Você pode gerenciá-los nas
              configurações do seu navegador.
            </p>
          </div>
          <p className="text-sm italic text-saboria-cacao/50">
            Versão preliminar — recomenda-se revisão jurídica antes da operação
            comercial.
          </p>
        </div>
      </section>
    </>
  )
}
