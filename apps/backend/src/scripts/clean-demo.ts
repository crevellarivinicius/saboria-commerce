import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"

export default async function cleanDemo({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const productModule = container.resolve(Modules.PRODUCT)

  const demoHandles = ["t-shirt", "sweatshirt", "sweatpants", "shorts"]
  const { data: prods } = await query.graph({ entity: "product", fields: ["id", "handle"] })
  const toDelete = prods
    .filter((p: any) => demoHandles.includes(p.handle))
    .map((p: any) => p.id)
  if (toDelete.length) {
    await productModule.deleteProducts(toDelete)
    logger.info(`Removidos ${toDelete.length} produtos demo.`)
  }

  const demoCats = ["Shirts", "Sweatshirts", "Pants", "Merch"]
  const { data: cats } = await query.graph({ entity: "product_category", fields: ["id", "name"] })
  const catIds = cats
    .filter((c: any) => demoCats.includes(c.name))
    .map((c: any) => c.id)
  if (catIds.length) {
    await productModule.deleteProductCategories(catIds)
    logger.info(`Removidas ${catIds.length} categorias demo.`)
  }

  logger.info("Limpeza dos dados demo concluída.")
}
