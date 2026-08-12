"use client"

import { addToCart } from "@lib/data/cart"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

export default function AddToCartButton({
  variantId,
  className = "",
}: {
  variantId?: string
  className?: string
}) {
  const router = useRouter()
  const countryCode = (useParams()?.countryCode as string) || "br"
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!variantId || loading) return
    setLoading(true)
    try {
      await addToCart({ variantId, quantity: 1, countryCode })
      router.refresh()
      setDone(true)
      setTimeout(() => setDone(false), 1500)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handle}
      disabled={loading || !variantId}
      aria-label="Adicionar à sacola"
      className={`flex h-10 w-10 flex-none items-center justify-center rounded-full bg-saboria-berry text-white shadow-[0_10px_22px_-8px_rgba(194,46,90,0.7)] transition hover:bg-saboria-berry-bright disabled:opacity-60 ${className}`}
    >
      {loading ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5 animate-spin" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 3a9 9 0 1 0 9 9" />
        </svg>
      ) : done ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5">
          <path d="M12 5v14M5 12h14" />
        </svg>
      )}
    </button>
  )
}
