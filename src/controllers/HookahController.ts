import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { validate } from 'class-validator'

import { Hookah } from '../models/Hookah'
import { Store } from '../models/Store'

class HookahController {
  static listAll = async (req: Request, res: Response): Promise<void> => {
    // Params
    const { storeId } = req.params
    const hookahRepository = getRepository(Hookah)
    // Get query from database and some meta
    let hookahs
    try {
      hookahs = await hookahRepository.find({ storeId })
    } catch (errors) {
      res.status(500).send({ message: 'Internal server error' })
      return
    }
    //
    if (!hookahs.length) {
      res.status(404).send({ message: 'Hookahs not found' })
      return
    }
    // Send the stores object and meta
    res.send({ results: hookahs })
  }

  static getOneById = async (req: Request, res: Response): Promise<void> => {
    // Params
    const { storeId, id } = req.params
    // Get repo
    const hookahRepository = getRepository(Hookah)
    // Get query from database
    let hookah: Hookah
    try {
      hookah = await hookahRepository
        .createQueryBuilder('hookah')
        .where({ storeId, id })
        .leftJoinAndSelect('hookah.offers', 'offer')
        .getOne()
    } catch (error) {
      console.log(error)
      res.status(500).send({ message: 'Internal Error', error })
      return
    }

    // If not found, send a 404 response
    if (!hookah) {
      res.status(404).send({ message: 'Hookah not found' })
      return
    }

    // Send the users object
    res.send({ results: hookah })
  }

  static createHookah = async (req: Request, res: Response): Promise<void> => {
    // Get parameters from the body
    const { name, description, pipes, image, storeId } = req.body
    const hookah = new Hookah()
    hookah.name = name
    hookah.description = description
    hookah.pipes = pipes
    hookah.image = image
    hookah.image = storeId
    // Validate if the parameters are ok
    const errors = await validate(hookah)
    if (errors.length > 0) {
      res.status(400).send({ message: 'Bad Request', errors })
      return
    }
    // Find if store is valid
    try {
      await getRepository(Store).findOneOrFail(storeId)
    } catch {
      res.status(422).send({ message: 'Store not found' })
      return
    }
    // Get repo
    const hookahRepository = getRepository(Hookah)
    // Save to database
    try {
      await hookahRepository.save(hookah)
    } catch (error) {
      res.status(409).send({ message: 'Hookah name is already in use' })
      return
    }

    // If all ok, send 201 response
    res.status(201).send({ message: 'Hookah created' })
  }

  static editHookah = async (req: Request, res: Response): Promise<void> => {
    // Get the ID from the url
    const { storeId, id } = req.params
    // Get values from the body
    const { name, description, pipes, image } = req.body
    // Get repo
    const hookahRepository = getRepository(Hookah)
    let hookah: Hookah
    try {
      hookah = await hookahRepository.findOneOrFail({ storeId, id })
    } catch (error) {
      // If not found, send a 404 response
      res.status(404).send({ message: 'Hookah not found' })
      return
    }
    // Validate the new values on model
    hookah.name = name
    hookah.description = description
    hookah.image = image
    hookah.pipes = pipes
    const errors = await validate(hookah)
    if (errors.length > 0) {
      res.status(400).send({ message: 'Bad Request', errors })
      return
    }
    // Try to safe, if fails, that means username already in use
    try {
      await hookahRepository.save(hookah)
    } catch (e) {
      res.status(409).send({ message: 'Hookah name is already in use' })
      return
    }

    // After all send a 204 (no content, but accepted) response
    res.status(204).send()
  }

  static deleteHookah = async (req: Request, res: Response): Promise<void> => {
    //Get the ID from the url
    const { storeId, id } = req.params
    // Get repo
    const hookahRepository = getRepository(Hookah)
    try {
      await hookahRepository.findOneOrFail({ storeId, id })
    } catch (error) {
      res.status(404).send({ message: 'Hookah not found' })
      return
    }
    await hookahRepository.delete(id)

    // After all send a 204 (no content, but accepted) response
    res.status(204).send()
  }
}

export default HookahController
