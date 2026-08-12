import LocalizedClientLink from "@modules/common/components/localized-client-link"

const produtos = [
  "Bolos & Tortas",
  "Brigadeiros Finos",
  "Macarons",
  "Cookies & Brownies",
  "Cheesecakes",
]
const aSaboria = [
  { label: "Nossa História", href: "/a-saboria" },
  { label: "Propósito", href: "/a-saboria" },
  { label: "Manifesto", href: "/a-saboria" },
  { label: "Trocas e Devoluções", href: "/trocas-devolucoes" },
  { label: "Privacidade (LGPD)", href: "/privacidade" },
]
const pagamentos = ["PIX", "VISA", "MASTER", "BOLETO"]

export default function Footer() {
  return (
    <footer className="border-t-2 border-saboria-berry bg-saboria-cacao-deep text-[#C9A5B4]">
      <div className="content-container">
        <div className="grid gap-10 py-16 small:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* marca */}
          <div>
            <div className="font-display text-3xl font-semibold lowercase text-saboria-cream">
              saboria
            </div>
            <div className="mt-1 text-[8px] font-bold uppercase tracking-[0.34em] text-saboria-berry-bright">
              feito em pequenos lotes
            </div>
            <p className="mt-5 max-w-xs text-[13px] leading-relaxed">
              Bolos, brigadeiros, macarons e cheesecakes feitos em pequenos
              lotes, com ingredientes selecionados.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-saboria-cream transition hover:border-saboria-berry"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M13 9h3V6h-3c-2 0-3 1-3 3v2H8v3h2v6h3v-6h2.5l.5-3H13V9z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-saboria-cream transition hover:border-saboria-berry"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" />
                </svg>
              </a>
            </div>
          </div>

          {/* produtos */}
          <div>
            <h5 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-saboria-berry-bright">
              Produtos
            </h5>
            <ul className="space-y-2.5 text-[13.5px]">
              {produtos.map((p) => (
                <li key={p}>
                  <LocalizedClientLink href="/store" className="transition hover:text-saboria-cream">
                    {p}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div>

          {/* a saboria */}
          <div>
            <h5 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-saboria-berry-bright">
              A Saboria
            </h5>
            <ul className="space-y-2.5 text-[13.5px]">
              {aSaboria.map((p) => (
                <li key={p.label}>
                  <LocalizedClientLink href={p.href} className="transition hover:text-saboria-cream">
                    {p.label}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div>

          {/* atendimento */}
          <div>
            <h5 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-saboria-berry-bright">
              Atendimento
            </h5>
            <ul className="space-y-2.5 text-[13.5px]">
              <li><a href="#" className="transition hover:text-saboria-cream">WhatsApp</a></li>
              <li><a href="mailto:sac@saboria.com.br" className="transition hover:text-saboria-cream">sac@saboria.com.br</a></li>
              <li><a href="#" className="transition hover:text-saboria-cream">Instagram</a></li>
              <li><a href="#" className="transition hover:text-saboria-cream">Facebook</a></li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {pagamentos.map((p) => (
                <span
                  key={p}
                  className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-bold text-saboria-cream"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 py-6 text-[11.5px] text-[#B08D9C] small:flex-row small:justify-between">
          <span>
            © {new Date().getFullYear()} Saboria Alimentos Ltda · CNPJ
            00.000.000/0001-00
          </span>
          <span>Saboria · feito com carinho no Brasil</span>
        </div>
      </div>
    </footer>
  )
}
