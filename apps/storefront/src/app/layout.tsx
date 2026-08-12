import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { DM_Serif_Display, Outfit } from "next/font/google"
import "styles/globals.css"

const display = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-display",
  style: ["normal", "italic"],
  weight: ["400"],
})

const body = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      data-mode="light"
      className={`${display.variable} ${body.variable}`}
    >
      <body className="font-sans">
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
