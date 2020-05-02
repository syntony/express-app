import { Router } from 'express'
// import auth from './auth'
// import user from './user'
import store from './store'

const routes = Router()

// routes.use('/auth', auth)
// routes.use('/user', user)
routes.use('/stores', store)

export default routes
