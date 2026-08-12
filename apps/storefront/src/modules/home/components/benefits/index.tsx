const items = [
  {
    t: "Pix na hora",
    s: "Aprovação instantânea",
    icon: (
      <path d="M12 2l2.5 5 5.5.8-4 3.9 1 5.5L12 20l-5 2.6 1-5.5-4-3.9L9.5 7z" />
    ),
  },
  {
    t: "Entrega Brasil",
    s: "Correios e transportadoras",
    icon: (
      <>
        <path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z" />
        <circle cx="7" cy="18" r="1.6" />
        <circle cx="17" cy="18" r="1.6" />
      </>
    ),
  },
  {
    t: "Compra segura",
    s: "Site criptografado",
    icon: <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5z" />,
  },
  {
    t: "Troca fácil",
    s: "7 dias garantidos",
    icon: <path d="M3 12a9 9 0 1 0 3-6.7M3 4v4h4" />,
  },
]

const Benefits = () => {
  return (
    <section className="bg-saboria-cacao-deep text-saboria-cream">
      <div className="content-container grid gap-8 py-10 small:grid-cols-4">
        {items.map((i) => (
          <div key={i.t} className="flex items-center gap-3">
            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-saboria-berry-bright/15 text-saboria-berry-bright">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                className="h-5 w-5"
              >
                {i.icon}
              </svg>
            </div>
            <div>
              <b className="block text-sm text-saboria-cream">{i.t}</b>
              <span className="text-xs text-[#C9A5B4]">{i.s}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Benefits
