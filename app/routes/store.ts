import { Router } from 'express'

import ErrorService from '../services/ErrorService'
import StoreController from '../controllers/StoreController'

const router = Router()

// CRUD
router.get('/', ErrorService.catchErrors(StoreController.listAll))
router.get('/:id', ErrorService.catchErrors(StoreController.getOneById))
router.post('/', ErrorService.catchErrors(StoreController.createStore))
router.patch('/:id', ErrorService.catchErrors(StoreController.editStore))
router.delete('/:id', ErrorService.catchErrors(StoreController.deleteStore))

export default router
