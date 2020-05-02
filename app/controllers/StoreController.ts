import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import { Store } from '../models/Store'

class StoreController {
  static listAll = async (req: Request, res: Response) => {
    //Get users from database
    const storeRepository = getRepository(Store)
    const stores = await storeRepository.find()

    //Send the users object
    return res.send({ results: stores })
  }
}

export default StoreController
