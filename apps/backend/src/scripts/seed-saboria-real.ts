import { ExecArgs } from "@medusajs/framework/types"
import {
  ContainerRegistrationKeys,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils"
import {
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createInventoryLevelsWorkflow,
  createPriceListsWorkflow,
} from "@medusajs/medusa/core-flows"
import * as fs from "fs"
import * as path from "path"

type Catalogo = {
  categorias: { name: string; handle: string }[]
  produtos: Array<{
    sku: string
    handle: string
    title: string
    description: string
    categoria: string
    categoria_handle: string
    weight: number | null
    validade_dias: number
    preco_de: number
    preco_por: number
    custo: number
    ean13: string
    image: string
    nutricional: {
      ingredientes?: string
      alergicos?: string
      gluten?: string
      lactose?: string
    }
    nutricional_pendente: boolean
  }>
}

export default async function seedSaboriaReal({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const productModule = container.resolve(Modules.PRODUCT)
  const inventoryModule = container.resolve(Modules.INVENTORY)

  const catalogo: Catalogo = JSON.parse(
    fs.readFileSync(path.join(__dirname, "saboria-catalogo.json"), "utf8")
  )

  // 1) LIMPAR catálogo antigo (produtos demo/seed + categorias)
  const { data: oldProds } = await query.graph({
    entity: "product",
    fields: ["id"],
  })
  if (oldProds.length) {
    await productModule.deleteProducts(oldProds.map((p: any) => p.id))
    logger.info(`Saboria: removidos ${oldProds.length} produtos antigos.`)
  }
  const { data: oldCats } = await query.graph({
    entity: "product_category",
    fields: ["id"],
  })
  if (oldCats.length) {
    await productModule.deleteProductCategories(oldCats.map((c: any) => c.id))
    logger.info(`Saboria: removidas ${oldCats.length} categorias antigas.`)
  }
  // inventory items ficam órfãos ao deletar produtos → limpar p/ evitar SKU duplicado
  const { data: oldInv } = await query.graph({
    entity: "inventory_item",
    fields: ["id"],
  })
  if (oldInv.length) {
    await inventoryModule.deleteInventoryItems(oldInv.map((i: any) => i.id))
    logger.info(`Saboria: removidos ${oldInv.length} inventory items órfãos.`)
  }

  // 2) CATEGORIAS reais (linhas da planilha)
  const { result: cats } = await createProductCategoriesWorkflow(container).run({
    input: {
      product_categories: catalogo.categorias.map((c) => ({
        name: c.name,
        handle: c.handle,
        is_active: true,
      })),
    },
  })
  const catId = (handle: string) =>
    cats.find((c: any) => c.handle === handle)!.id

  // infra já existente (região/canal/estoque/perfil vieram da migração)
  const { data: scs } = await query.graph({
    entity: "sales_channel",
    fields: ["id", "name"],
  })
  const sc =
    scs.find((s: any) => s.name === "Default Sales Channel") || scs[0]
  const { data: profs } = await query.graph({
    entity: "shipping_profile",
    fields: ["id"],
  })
  const shippingProfile = profs[0]
  const { data: locs } = await query.graph({
    entity: "stock_location",
    fields: ["id"],
  })
  const stockLocation = locs[0]

  // 3) PRODUTOS — preço base do variante = "de" (Preço Varejo Máximo)
  logger.info(`Saboria: criando ${catalogo.produtos.length} produtos...`)
  const productsInput = catalogo.produtos.map((p) => ({
    title: p.title,
    handle: p.handle,
    description: p.description,
    status: ProductStatus.PUBLISHED,
    weight: p.weight ?? undefined,
    category_ids: [catId(p.categoria_handle)],
    shipping_profile_id: shippingProfile.id,
    thumbnail: p.image,
    images: [{ url: p.image }],
    options: [{ title: "Tamanho", values: ["Único"] }],
    metadata: {
      sku: p.sku,
      ean13: p.ean13,
      custo: p.custo,
      preco_de: p.preco_de,
      validade_dias: p.validade_dias,
      ingredientes: p.nutricional.ingredientes ?? null,
      alergicos: p.nutricional.alergicos ?? null,
      gluten: p.nutricional.gluten ?? null,
      lactose: p.nutricional.lactose ?? null,
      nutricional_pendente: p.nutricional_pendente,
    },
    variants: [
      {
        title: "Único",
        sku: p.sku,
        options: { Tamanho: "Único" },
        prices: [{ amount: p.preco_de, currency_code: "brl" }],
      },
    ],
    sales_channels: [{ id: sc.id }],
  }))
  const { result: created } = await createProductsWorkflow(container).run({
    input: { products: productsInput },
  })
  logger.info(`Saboria: ${created.length} produtos criados.`)

  // 4) PRICE LIST "sale" com o "por" (Preço Médio Varejo) → storefront mostra de/por
  const { data: allVars } = await query.graph({
    entity: "product_variant",
    fields: ["id", "sku"],
  })
  const varBySku: Record<string, string> = Object.fromEntries(
    allVars.filter((v: any) => v.sku).map((v: any) => [v.sku, v.id])
  )
  const prices = catalogo.produtos
    .filter((p) => varBySku[p.sku])
    .map((p) => ({
      variant_id: varBySku[p.sku],
      amount: p.preco_por,
      currency_code: "brl",
    }))
  if (prices.length) {
    const priceListData: any = {
      title: "Preço de Lançamento",
      description: "Preço médio de varejo (por) sobre o preço máximo (de).",
      type: "sale",
      status: "active",
      prices,
    }
    await createPriceListsWorkflow(container).run({
      input: { price_lists_data: [priceListData] },
    })
    logger.info(`Saboria: price list de/por criada (${prices.length} preços).`)
  } else {
    logger.warn("Saboria: nenhum variant encontrado para a price list!")
  }

  // 5) níveis de estoque para os itens novos
  const { data: levels } = await query.graph({
    entity: "inventory_level",
    fields: ["inventory_item_id"],
  })
  const existing = new Set(levels.map((l: any) => l.inventory_item_id))
  const { data: items } = await query.graph({
    entity: "inventory_item",
    fields: ["id"],
  })
  const newItems = items.filter((i: any) => !existing.has(i.id))
  if (newItems.length) {
    await createInventoryLevelsWorkflow(container).run({
      input: {
        inventory_levels: newItems.map((i: any) => ({
          location_id: stockLocation.id,
          stocked_quantity: 1000,
          inventory_item_id: i.id,
        })),
      },
    })
  }

  logger.info(
    `Saboria: seed concluído — ${catalogo.categorias.length} categorias, ${catalogo.produtos.length} produtos, price list de/por, estoque.`
  )
}
