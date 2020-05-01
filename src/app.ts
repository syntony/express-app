import * as express from 'express'
import bodyParser = require('body-parser')

import Routes from './routes/Routes'
import * as ErrorHandlers from './services/ErrorHandlers'

class App {
  public app: express.Application
  public routePrv: Routes
  constructor() {
    // initializing express in this application
    this.app = express()
    // support application/json type post data
    this.app.use(bodyParser.json())
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }))
    // for routing the http request to controller
    this.routePrv = new Routes()
    this.routePrv.routes(this.app)
    // If that above routes didnt work, we 404 them and forward to error handler
    this.app.use(ErrorHandlers.notFound)
  }
}

export default new App().app
