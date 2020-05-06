import 'reflect-metadata'
import { createConnection } from 'typeorm'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as helmet from 'helmet'
import * as cors from 'cors'
import routes from './routes'

import { Store, Hookah, Offer } from './models'

//Connects to the Database -> then starts the express
export default createConnection({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: false,
  logging: false,
  entities: [Store, Hookah, Offer],
  migrations: [`${__dirname}/src/migration/**/*.ts`],
  cli: {
    entitiesDir: `${__dirname}/src/models`,
    migrationsDir: `${__dirname}/src/migration`,
  },
})
  .then(async () => {
    // Create a new express application instance
    const app = express()

    // Call middlewares
    app.use(cors())
    app.use(helmet())
    app.use(bodyParser.json())

    //Set all routes from routes folder
    app.use('/api/v1', routes)

    app.listen(3000, () => {
      console.log('Server started on port http://localhost:3000!')
    })
  })
  .catch((error) => console.log(error))
