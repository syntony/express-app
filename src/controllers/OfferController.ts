import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { validate } from 'class-validator'

import { Offer } from '../models/Offer'
import { Hookah } from '../models/Hookah'
import { Store } from '../models/Store'

class OfferController {
  static listAll = async (req: Request, res: Response): Promise<void> => {
    // Params
    const { storeId, hookahId } = req.params
    const offerRepository = getRepository(Offer)
    // Get query from database and some meta
    let offers
    if (typeof hookahId === 'undefined') {
      try {
        offers = await offerRepository.find({ where: { storeId }, cache: true })
      } catch (errors) {
        res.status(404).send({ message: 'Store not found', errors })
        return
      }
    } else {
      try {
        await getRepository(Hookah).findOneOrFail({ storeId })
        offers = await offerRepository.find({ where: { hookahId }, cache: true })
      } catch (errors) {
        res.status(404).send({ message: 'Hookah not found', errors })
        return
      }
    }
    //
    if (!offers.length) {
      res.status(404).send({ message: 'Offers not found' })
      return
    }
    // Send the stores object and meta
    res.send({ results: offers })
  }

  // TODO: start from this point tomorrow
  static getOneById = async (req: Request, res: Response): Promise<void> => {
    // Params
    const { storeId, hookahId, id } = req.params
    // Get repo
    const offerRepository = getRepository(Offer)
    // Get query from database
    let offer: Offer
    try {
      offer = await offerRepository.findOneOrFail({ id })
    } catch (error) {
      console.log(error)
      res.status(500).send({ message: 'Offer not found', error })
      return
    }

    // Send the users object
    res.send({ results: offer })
  }

  static createOffer = async (req: Request, res: Response): Promise<void> => {
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
    }
    // Get repo
    const offerRepository = getRepository(Hookah)
    // Save to database
    try {
      await offerRepository.save(hookah)
    } catch (error) {
      res.status(409).send({ message: 'Hookah name is already in use' })
      return
    }

    // If all ok, send 201 response
    res.status(201).send({ message: 'Hookah created' })
  }
}

export default OfferController
