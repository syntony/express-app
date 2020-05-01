const { resolve } = require('path')

module.exports = {
  type: 'sqlite',
  database: 'app.sqlite',
  synchronize: false,
  logging: true,
  entities: [resolve(__dirname, 'src/database/entities/**/*.ts')],
  migrations: [resolve(__dirname, 'src/database/migrations/**/*.ts')],
  subscribers: [resolve(__dirname, 'src/database/subscribers/**/*.ts')],
  seeds: [resolve(__dirname, 'src/database/seeds/**/*.ts')],
  factories: [resolve(__dirname, 'src/database/factories/**/*.ts')],
  cli: {
    entitiesDir: resolve(__dirname, 'src/database/entities'),
    migrationsDir: resolve(__dirname, 'src/database/migrations'),
    subscribersDir: resolve(__dirname, 'src/database/subscribers'),
    seedsDir: resolve(__dirname, 'src/database/seeds'),
    factoriesDir: resolve(__dirname, 'src/database/factories'),
  },
}
