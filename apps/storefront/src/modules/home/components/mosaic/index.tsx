import LocalizedClientLink from "@modules/common/components/localized-client-link"

const tiles = [
  { name: "Bolos & Tortas", handle: "bolos-tortas", img: "300101", big: true },
  { name: "Brigadeiros Finos", handle: "brigadeiros", img: "300201" },
  { name: "Macarons", handle: "macarons", img: "300301" },
  { name: "Cookies & Brownies", handle: "cookies-brownies", img: "300401" },
  { name: "Cheesecakes", handle: "cheesecakes", img: "300501" },
  { name: "Kits & Presentes", handle: "kits-presentes", img: "300601", full: true },
]

const Mosaic = () => {
  return (
    <section className="bg-saboria-blush/40 py-20">
      <div className="content-container">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-saboria-berry">
            Para deliciosos momentos
          </p>
          <h2 className="mt-2 font-display text-4xl italic text-saboria-cacao">
            Explore por linha
          </h2>
        </div>
        <div className="grid auto-rows-[170px] grid-cols-2 gap-3 small:grid-cols-4">
          {tiles.map((t) => (
            <LocalizedClientLink
              key={t.name}
              href={`/categories/${t.handle}`}
              className={`group relative overflow-hidden rounded-2xl shadow-[0_18px_40px_-26px_rgba(0,0,0,0.5)] ${
                t.big ? "col-span-2 row-span-2" : ""
              } ${t.full ? "col-span-2 small:col-span-4" : ""}`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('/saboria/products/${t.img}.jpg')` }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(32,14,24,.05) 35%, rgba(32,14,24,.72))",
                }}
              />
              <span
                className={`absolute inset-x-0 bottom-5 z-10 text-center font-display italic text-saboria-cream drop-shadow-lg ${
                  t.big ? "text-3xl" : "text-xl"
                }`}
              >
                {t.name}
              </span>
            </LocalizedClientLink>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Mosaic
