import { Request, Response } from 'express'

import Connection from '../services/Connection'
import { Store } from '../database/entities/Store'

class StoreController {
  public getAll = async (req: Request, res: Response) => {
    const connection = await Connection
    console.log({ Repo: connection.getRepository(Store) })
    const allStores = connection.getRepository(Store).find()
    res.json(allStores)
  }
}

export default StoreController
