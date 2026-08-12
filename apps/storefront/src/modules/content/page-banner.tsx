export default function PageBanner({
  eyebrow,
  title,
  subtitle,
  image = "/saboria/band.jpg",
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  image?: string
}) {
  return (
    <section className="relative -mt-2 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-saboria-cacao-deep/95 via-saboria-cacao-deep/85 to-saboria-plum/60" />
      <div className="content-container relative z-10 py-20">
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-saboria-berry-bright">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 font-display text-5xl italic text-saboria-cream small:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-xl text-[#E8CBD5]">{subtitle}</p>
        )}
      </div>
    </section>
  )
}
