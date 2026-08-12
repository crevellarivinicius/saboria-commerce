"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Informação Nutricional",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Entrega e Devoluções",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  const m = (product.metadata ?? {}) as Record<string, any>
  const badge = (v: string) =>
    /sem|não|nao/i.test(v)
      ? "bg-green-100 text-green-800"
      : "bg-saboria-berry-deep text-saboria-cacao"

  return (
    <div className="py-8 text-sm text-saboria-cacao/80">
      {m.ingredientes && (
        <div className="mb-5">
          <span className="font-semibold text-saboria-cacao">
            Ingredientes
          </span>
          <p className="mt-1 leading-relaxed">{m.ingredientes}</p>
        </div>
      )}
      {m.alergicos && (
        <div className="mb-5">
          <span className="font-semibold text-saboria-cacao">Alérgicos</span>
          <p className="mt-1 leading-relaxed">{m.alergicos}</p>
        </div>
      )}
      {(m.gluten || m.lactose) && (
        <div className="mb-6 flex flex-wrap gap-2">
          {m.gluten && (
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${badge(
                m.gluten
              )}`}
            >
              {m.gluten}
            </span>
          )}
          {m.lactose && (
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${badge(
                m.lactose
              )}`}
            >
              {m.lactose}
            </span>
          )}
        </div>
      )}
      <div className="grid grid-cols-2 gap-x-8 gap-y-3 border-t border-saboria-cacao/10 pt-5">
        <div>
          <span className="font-semibold text-saboria-cacao">Peso</span>
          <p>{product.weight ? `${product.weight} g` : "-"}</p>
        </div>
        {m.validade_dias && (
          <div>
            <span className="font-semibold text-saboria-cacao">Validade</span>
            <p>{m.validade_dias} dias</p>
          </div>
        )}
        {m.ean13 && (
          <div>
            <span className="font-semibold text-saboria-cacao">
              Código de barras
            </span>
            <p>{m.ean13}</p>
          </div>
        )}
      </div>
      {m.nutricional_pendente && (
        <p className="mt-5 text-xs italic text-saboria-cacao/50">
          Tabela nutricional completa em breve.
        </p>
      )}
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <FastDelivery />
          <div>
            <span className="font-semibold">Entrega rápida</span>
            <p className="max-w-sm">
              Seu pedido chega em 3 a 5 dias úteis no ponto de retirada
              escolhido ou no conforto da sua casa.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Refresh />
          <div>
            <span className="font-semibold">Trocas fáceis</span>
            <p className="max-w-sm">
              O produto não era bem o que você esperava? Sem problemas, fazemos a
              troca por um novo.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Back />
          <div>
            <span className="font-semibold">Devoluções sem complicação</span>
            <p className="max-w-sm">
              É só devolver o produto que devolvemos o seu dinheiro. Sem
              perguntas: fazemos o possível para que sua devolução seja
              tranquila.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
