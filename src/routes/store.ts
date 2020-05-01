import { Router } from 'express'

import StoreController from '../controllers/StoreController'

const router = Router()

// get all stores
router.get('/', StoreController.listAll)

export default router
