import { loadEnv, defineConfig, Modules } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

const REDIS_URL = process.env.REDIS_URL

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    // Postgres gerenciado (Supabase/Neon/RDS) exige SSL — ative com DATABASE_SSL=true.
    // rejectUnauthorized:false evita erro de cadeia de certificado em poolers.
    databaseDriverOptions: {
      ...(process.env.DATABASE_SSL === 'true'
        ? { connection: { ssl: { rejectUnauthorized: false } } }
        : {}),
      pool: { min: 0, max: 8 },
    },
    // Quando REDIS_URL existe, o Medusa usa Redis também para locking/sessões.
    ...(REDIS_URL ? { redisUrl: REDIS_URL } : {}),
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
    }
  },
  // Cache + Event Bus + Workflow Engine em Redis (setup de produção).
  // Só ativa quando REDIS_URL está setada — sem ela, caem nos módulos
  // in-memory padrão (fallback seguro, sem mudança de comportamento).
  ...(REDIS_URL
    ? {
        modules: [
          {
            key: Modules.CACHE,
            resolve: '@medusajs/cache-redis',
            options: { redisUrl: REDIS_URL },
          },
          {
            key: Modules.EVENT_BUS,
            resolve: '@medusajs/event-bus-redis',
            options: { redisUrl: REDIS_URL },
          },
          {
            key: Modules.WORKFLOW_ENGINE,
            resolve: '@medusajs/workflow-engine-redis',
            options: { redis: { url: REDIS_URL } },
          },
        ],
      }
    : {}),
})
