import 'reflect-metadata'
import * as express from 'express'
import { createConnection, ConnectionOptions } from 'typeorm'
import { Server } from 'http'
import * as bodyParser from 'body-parser'
import * as helmet from 'helmet'
import * as cors from 'cors'

import { Store, Hookah, Offer } from './models'
import routes from './routes'
import ErrorService from './services/ErrorService'

// App port
const PORT = 3000
// TypeORM connection
const connectionOptions: ConnectionOptions = {
  type: 'sqlite',
  database: 'database.sqlite',
  logging: false,
  synchronize: true,
  dropSchema: false,
  entities: [Store, Hookah, Offer],
  migrations: [`${__dirname}/src/migration/**/*.ts`],
  cli: {
    entitiesDir: `${__dirname}/src/models`,
    migrationsDir: `${__dirname}/src/migration`,
  },
}

export default async (): Promise<Server> => {
  // Create a new express application instance
  const app = express()
  // Call middlewares
  app.use(cors())
  app.use(helmet())
  app.use(bodyParser.json())
  // In Demo Purposes
  app.get('/', (req, res) => res.redirect('/api/v1/stores'))
  // Set all routes from routes folder
  app.use('/api/v1', routes)
  // Catch errors
  app.use(ErrorService.notFound)
  try {
    //Connects to the Database -> then starts the express
    await createConnection({ ...connectionOptions })
    return app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}!`))
  } catch {
    throw new Error('Launch app via this command: "docker-compose up -d"')
  }
}
