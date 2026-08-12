import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import {
  createApiKeysWorkflow,
  createRegionsWorkflow,
  createShippingOptionsWorkflow,
  createShippingProfilesWorkflow,
  createStockLocationsWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
  updateStoresWorkflow,
} from "@medusajs/medusa/core-flows"

/**
 * Bootstrap de base para ambiente local: região BR (BRL), tax region,
 * estoque, frete e publishable key ligada ao sales channel padrão.
 *
 * Idempotente por etapa: cada recurso só é criado se ainda não existir,
 * então o script pode ser reexecutado com segurança.
 *
 * Uso: npm run setup (ou npx medusa exec ./src/scripts/setup.ts)
 */
export default async function setup({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const link = container.resolve(ContainerRegistrationKeys.LINK)
  const salesChannelModule = container.resolve(Modules.SALES_CHANNEL)
  const storeModule = container.resolve(Modules.STORE)
  const fulfillmentModule = container.resolve(Modules.FULFILLMENT)
  const regionModule = container.resolve(Modules.REGION)
  const stockLocationModule = container.resolve(Modules.STOCK_LOCATION)
  const taxModule = container.resolve(Modules.TAX)

  // 1) sales channel padrão
  let [defaultChannel] = await salesChannelModule.listSalesChannels({
    name: "Default Sales Channel",
  })
  if (!defaultChannel) {
    defaultChannel = await salesChannelModule.createSalesChannels({
      name: "Default Sales Channel",
    })
    logger.info("Sales channel padrão criado.")
  }

  // 2) moedas da loja (brl padrão; mantém eur para dados pré-existentes)
  const [store] = await storeModule.listStores()
  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: {
        supported_currencies: [
          { currency_code: "brl", is_default: true },
          { currency_code: "eur" },
        ],
        default_sales_channel_id: defaultChannel.id,
      },
    },
  })

  // 3) região Brasil
  let [brRegion] = await regionModule.listRegions({ currency_code: "brl" })
  if (!brRegion) {
    const { result } = await createRegionsWorkflow(container).run({
      input: {
        regions: [
          {
            name: "Brasil",
            currency_code: "brl",
            countries: ["br"],
            payment_providers: ["pp_system_default"],
          },
        ],
      },
    })
    brRegion = result[0]
    logger.info("Região Brasil criada.")
  }

  // 4) tax region br
  const taxRegions = await taxModule.listTaxRegions({ country_code: "br" })
  if (!taxRegions.length) {
    await createTaxRegionsWorkflow(container).run({
      input: [{ country_code: "br" }],
    })
    logger.info("Tax region BR criada.")
  }

  // 5) estoque
  let [stockLocation] = await stockLocationModule.listStockLocations({
    name: "Ateliê Saboria",
  })
  if (!stockLocation) {
    const { result } = await createStockLocationsWorkflow(container).run({
      input: {
        locations: [
          {
            name: "Ateliê Saboria",
            address: {
              address_1: "Rua dos Sabores, 100",
              city: "São Paulo",
              country_code: "BR",
            },
          },
        ],
      },
    })
    stockLocation = result[0]
    logger.info("Stock location criada.")

    await linkSalesChannelsToStockLocationWorkflow(container).run({
      input: { id: stockLocation.id, add: [defaultChannel.id] },
    })

    await link.create({
      [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
      [Modules.FULFILLMENT]: { fulfillment_provider_id: "manual_manual" },
    })
  }

  // 6) frete: perfil + fulfillment set + opções BR
  let shippingProfile = (
    await fulfillmentModule.listShippingProfiles({ type: "default" })
  )[0]
  if (!shippingProfile) {
    const { result } = await createShippingProfilesWorkflow(container).run({
      input: { data: [{ name: "Default", type: "default" }] },
    })
    shippingProfile = result[0]
  }

  let [fulfillmentSet] = await fulfillmentModule.listFulfillmentSets({
    name: "Entrega Brasil",
  })
  if (!fulfillmentSet) {
    fulfillmentSet = await fulfillmentModule.createFulfillmentSets({
      name: "Entrega Brasil",
      type: "shipping",
      service_zones: [
        {
          name: "Brasil",
          geo_zones: [{ country_code: "br", type: "country" }],
        },
      ],
    })

    await link.create({
      [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
      [Modules.FULFILLMENT]: { fulfillment_set_id: fulfillmentSet.id },
    })

    await createShippingOptionsWorkflow(container).run({
      input: [
        {
          name: "Entrega padrão",
          price_type: "flat",
          provider_id: "manual_manual",
          service_zone_id: fulfillmentSet.service_zones[0].id,
          shipping_profile_id: shippingProfile.id,
          type: {
            label: "Padrão",
            description: "Entrega em até 7 dias úteis.",
            code: "standard",
          },
          prices: [{ currency_code: "brl", amount: 15 }],
          rules: [
            { attribute: "enabled_in_store", value: "true", operator: "eq" },
            { attribute: "is_return", value: "false", operator: "eq" },
          ],
        },
        {
          name: "Entrega expressa",
          price_type: "flat",
          provider_id: "manual_manual",
          service_zone_id: fulfillmentSet.service_zones[0].id,
          shipping_profile_id: shippingProfile.id,
          type: {
            label: "Expressa",
            description: "Entrega em até 2 dias úteis.",
            code: "express",
          },
          prices: [{ currency_code: "brl", amount: 30 }],
          rules: [
            { attribute: "enabled_in_store", value: "true", operator: "eq" },
            { attribute: "is_return", value: "false", operator: "eq" },
          ],
        },
      ],
    })
    logger.info("Frete BR configurado (padrão + expressa).")
  }

  // 7) publishable key (reaproveita se já existir)
  const { data: existingKeys } = await query.graph({
    entity: "api_key",
    fields: ["id", "token", "type"],
  })
  const existingPk = existingKeys.find((k: any) => k.type === "publishable")

  let publishableToken: string
  if (existingPk) {
    publishableToken = existingPk.token
  } else {
    const { result: apiKeys } = await createApiKeysWorkflow(container).run({
      input: {
        api_keys: [
          { title: "Storefront", type: "publishable", created_by: "setup" },
        ],
      },
    })
    await linkSalesChannelsToApiKeyWorkflow(container).run({
      input: { id: apiKeys[0].id, add: [defaultChannel.id] },
    })
    publishableToken = apiKeys[0].token
  }

  logger.info("Setup concluído.")
  logger.info(`NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=${publishableToken}`)
}
