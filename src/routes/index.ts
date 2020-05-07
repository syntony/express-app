import { Router } from 'express'

const routes = Router()

import ErrorService from '../services/ErrorService'
import StoreController from '../controllers/StoreController'
import HookahController from '../controllers/HookahController'
import OfferController from '../controllers/OfferController'

// stores
routes.get('/stores', ErrorService.catchErrors(StoreController.listAll))
routes.get('/stores/:id', ErrorService.catchErrors(StoreController.getOneById))
routes.post('/stores', ErrorService.catchErrors(StoreController.createStore))
routes.patch('/stores/:id', ErrorService.catchErrors(StoreController.editStore))
routes.delete('/stores/:id', ErrorService.catchErrors(StoreController.deleteStore))
// hookahs
routes.get('/stores/:storeId/hookahs', ErrorService.catchErrors(HookahController.listAll))
routes.get('/stores/:storeId/hookahs/:id', ErrorService.catchErrors(HookahController.getOneById))
routes.post('/stores/:storeId/hookahs', ErrorService.catchErrors(HookahController.createHookah))
routes.patch('/stores/:storeId/hookahs/:id', ErrorService.catchErrors(HookahController.editHookah))
routes.delete('/stores/:storeId/hookahs/:id', ErrorService.catchErrors(HookahController.deleteHookah))
// offers
routes.get('/stores/:storeId/offers', ErrorService.catchErrors(OfferController.listAll))
routes.get('/stores/:storeId/hookahs/:hookahId/offers', ErrorService.catchErrors(OfferController.listAll))
routes.get('/stores/:storeId/hookahs/:hookahId/offers/:id', ErrorService.catchErrors(OfferController.getOneById))
routes.post('/stores/:storeId/hookahs/:hookahId/offers', ErrorService.catchErrors(OfferController.createOffer))

export default routes
