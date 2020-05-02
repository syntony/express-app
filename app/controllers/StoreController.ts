import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { validate } from 'class-validator'

import { Store } from '../models/Store'

class StoreController {
  static listAll = async (req: Request, res: Response): Promise<void> => {
    // Params for pagination
    const { limit = '10', page = '0' } = req.query
    const take: number = Number(limit)
    const reqPage: number = Number(page)
    const skip: number = take * reqPage
    // Get repo
    const storeRepository = getRepository(Store)
    // Get query from database and some meta
    const [stores, [allStores, total]] = await Promise.all([
      storeRepository.find({ take, skip, cache: true }),
      storeRepository.findAndCount(),
    ])
    // Send the stores object and meta
    res.send({
      results: stores,
      meta: { limit: take, page: reqPage, pages: Math.ceil(allStores.length / take), total },
    })
  }

  static getOneById = async (req: Request, res: Response): Promise<void> => {
    // Params
    const { id } = req.params
    // Get repo
    const storeRepository = getRepository(Store)
    // Get query from database
    const store = await storeRepository.findOneOrFail(id)
    // Send the users object
    res.send({ results: store })
  }

  static createStore = async (req: Request, res: Response): Promise<void> => {
    // Get parameters from the body
    const { name, description, image } = req.body
    const store = new Store()
    store.name = name
    store.description = description
    store.image = image
    // Validate if the parameters are ok
    const errors = await validate(store)
    if (errors.length > 0) {
      res.status(400).send({ message: 'Bad Request', errors })
      return
    }
    // Get repo
    const storeRepository = getRepository(Store)
    // Save to database
    try {
      await storeRepository.save(store)
    } catch (error) {
      res.status(409).send({ message: 'Store name is already in use' })
      return
    }

    // If all ok, send 201 response
    res.status(201).send({ message: 'Store created' })
  }

  static editStore = async (req: Request, res: Response): Promise<void> => {
    // Get the ID from the url
    const id = req.params.id
    // Get values from the body
    const { name, description, image } = req.body
    // Get repo
    const storeRepository = getRepository(Store)
    let store: Store
    try {
      store = await storeRepository.findOneOrFail(id)
    } catch (error) {
      // If not found, send a 404 response
      res.status(404).send({ message: 'Store not found' })
      return
    }
    // Validate the new values on model
    store.name = name
    store.description = description
    store.image = image
    const errors = await validate(store)
    if (errors.length > 0) {
      res.status(400).send({ message: 'Bad Request', errors })
      return
    }
    // Try to safe, if fails, that means username already in use
    try {
      await storeRepository.save(store)
    } catch (e) {
      res.status(409).send({ message: 'Store name is already in use' })
      return
    }

    // After all send a 204 (no content, but accepted) response
    res.status(204).send()
  }

  static deleteStore = async (req: Request, res: Response): Promise<void> => {
    //Get the ID from the url
    const id = req.params.id
    // Get repo
    const storeRepository = getRepository(Store)
    try {
      await storeRepository.findOneOrFail(id)
    } catch (error) {
      res.status(404).send({ message: 'Store not found' })
      return
    }
    await storeRepository.delete(id)

    // After all send a 204 (no content, but accepted) response
    res.status(204).send()
  }
}

export default StoreController
