import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { validate } from 'class-validator'

import { Hookah } from '../models/Hookah'
import { Store } from '../models/Store'
import { Offer } from '../models/Offer'

class HookahController {
  static listAll = async (req: Request, res: Response): Promise<void> => {
    // Params for pagination
    const { limit = '10', page = '0', from: fromDate, to: toDate, guestsNumber } = req.query
    const take: number = Number(limit)
    const reqPage: number = Number(page)
    const skip: number = take * reqPage
    // Params
    const { storeId } = req.params
    const hookahRepository = getRepository(Hookah)
    // Get query from database and some meta
    let hookahs
    let total
    if (fromDate || toDate || guestsNumber) {
      // Search request
      if (!fromDate || !toDate || !guestsNumber) {
        // If search request - this 3 fields is required
        res.status(422).send({
          message: 'Unprocessable Entity',
          errors: {
            ...(!fromDate && { from: ['Query param "from" is required'] }),
            ...(!toDate && { to: ['Query param "to" is required'] }),
            ...(!guestsNumber && { guestsNumber: ['Query param "guestsNumber" is required'] }),
          },
        })
        return
      }
      const offer = new Offer()
      offer.guestsNumber = Number(guestsNumber)
      offer.reservedFrom = String(fromDate)
      offer.reservedUntil = String(toDate)
      // Validate if the parameters are ok
      const errors = await validate(offer, { groups: ['hookahs-queries'] })
      if (errors.length > 0) {
        res.status(400).send({ message: 'Bad Request', errors })
        return
      }
      try {
        hookahs = await hookahRepository
          .createQueryBuilder('hookah')
          .where({ storeId })
          .leftJoinAndSelect('hookah.offers', 'offers')
          .getMany()
        // TODO: add filter by time and pipes
        // hookahs = hookahs.reduce((acc, h) => {
        //   const hookah = h
        //   const latestDate = new Date(
        //     Math.max.apply(
        //       null,
        //       h.offers.map(({ reservedUntil }) => new Date(reservedUntil))
        //     )
        //   )
        //   const o = hookah.offers.find(({ reservedUntil }) => {
        //     console.log({ reservedUntil, latestDate: new Date(latestDate) })
        //     return new Date(reservedUntil) == latestDate
        //   })
        //   console.log({ o })
        //   hookah.offer = o
        //   delete hookah.offers
        //   return [...acc, hookah]
        // }, [])
      } catch (errors) {
        res.status(500).send({ message: 'Internal server error', errors })
        return
      }
    } else {
      // Not search request
      try {
        ;[hookahs, total] = await hookahRepository.findAndCount({ where: { storeId }, take, skip, cache: true })
      } catch (errors) {
        res.status(500).send({ message: 'Internal server error', errors })
        return
      }
    }
    //
    if (!hookahs.length) {
      res.status(404).send({ message: 'Hookahs not found' })
      return
    }
    // Send the stores object and meta
    res.send({
      results: hookahs,
      meta: {
        limit: take,
        page: reqPage,
        pages: Math.ceil(hookahs.length / take),
        total,
      },
    })
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
