import * as express from 'express'
import * as bodyParser from 'body-parser'

import routes from './routes/index'

require('dotenv').config({
  path: __dirname + `/../.env.${process.env.NODE_ENV || 'example'}`,
})

const { PORT = 3000 } = process.env

// Create our Express app
const app = express()

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// After all that above middleware, we finally handle our own routes!
app.use('/', routes)

// Message after server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log('server started at http://localhost:' + PORT)
  })
}

export default app
