import { Metadata } from "next"

import Hero from "@modules/home/components/hero"
import NossasLinhas from "@modules/home/components/nossas-linhas"
import BestSellers from "@modules/home/components/best-sellers"
import BrandBand from "@modules/home/components/brand-band"
import Mosaic from "@modules/home/components/mosaic"
import Values from "@modules/home/components/values"
import Benefits from "@modules/home/components/benefits"
import Newsletter from "@modules/home/components/newsletter"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Saboria — Confeitaria Artesanal",
  description:
    "Bolos, tortas, brigadeiros finos, macarons, cookies e cheesecakes da Saboria. Feitos no dia, em pequenos lotes, com ingredientes selecionados.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await props.params

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  return (
    <>
      <Hero />
      <NossasLinhas />
      <BestSellers countryCode={countryCode} />
      <BrandBand />
      <Mosaic />
      <Values />
      <Benefits />
      <Newsletter />
    </>
  )
}
