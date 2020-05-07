import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { validate } from 'class-validator'

import { Offer, Hookah } from '../models'
import DateService from '../services/DateService'

class OfferController {
  static listAll = async (req: Request, res: Response): Promise<void> => {
    // Params for pagination
    const { limit = '10', page = '0' } = req.query
    const take: number = Number(limit)
    const reqPage: number = Number(page)
    const skip: number = take * reqPage
    // Params
    const { storeId, hookahId } = req.params
    const offerRepository = getRepository(Offer)
    // Get query from database and some meta
    let offers, allOffers, total
    if (typeof hookahId === 'undefined') {
      try {
        ;[offers, [allOffers, total]] = await Promise.all([
          offerRepository.find({ where: { storeId }, skip, take, cache: true }),
          offerRepository.findAndCount({ storeId }),
        ])
      } catch (errors) {
        res.status(404).send({ message: 'Store not found', errors })
        return
      }
    } else {
      try {
        ;[offers, [allOffers, total]] = await Promise.all([
          offerRepository.find({ where: { hookahId }, skip, take, cache: true }),
          offerRepository.findAndCount({ storeId, hookahId }),
          getRepository(Hookah).findOneOrFail({ storeId, id: hookahId }),
        ])
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
    res.send({
      results: offers,
      meta: {
        limit: take,
        offset: reqPage,
        pagesTotal: Math.ceil(allOffers.length / take),
        itemsTotal: total,
      },
    })
  }

  static getOneById = async (req: Request, res: Response): Promise<void> => {
    // Params
    const { hookahId, id } = req.params
    // Get repo
    const offerRepository = getRepository(Offer)
    // Check
    // Get query from database
    let offer: Offer
    try {
      offer = await offerRepository.findOneOrFail({ hookahId, id })
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
    const { storeId, hookahId } = req.params
    const { guest, guestsNumber, reservedFrom } = req.body
    const offer = new Offer()
    offer.guest = guest
    offer.guestsNumber = guestsNumber
    offer.reservedFrom = reservedFrom
    offer.reservedUntil = reservedFrom && new Date(new Date(reservedFrom).getTime() + 30 * 60000).toISOString()
    offer.storeId = storeId
    offer.hookahId = hookahId
    // Validate if the parameters are ok
    const errors = await validate(offer, { groups: ['offers-queries'] })
    if (errors.length > 0) {
      res.status(400).send({ message: 'Bad Request', errors })
      return
    }
    // Find if hookah is valid
    let hookah: Hookah
    try {
      hookah = await getRepository(Hookah).findOneOrFail({ storeId, id: hookahId })
    } catch {
      res.status(404).send({ message: 'Hookah not found' })
      return
    }
    // Gust have to be number <= hookah.pipes * 2
    if (offer.guestsNumber > hookah.pipes * 2) {
      res.status(422).send({ message: "This hookah doesn't have enough pipes for this offer" })
      return
    }

    // Get repo
    const offerRepository = getRepository(Offer)
    try {
      // Check concurrent query
      const concurrentOffers = await offerRepository.find({
        storeId,
        hookahId,
        reservedUntil: DateService.MoreThan(offer.reservedFrom),
      })
      if (concurrentOffers.length) throw { concurrentOffers }
      // Save to database
      await offerRepository.save(offer)
    } catch (errors) {
      res.status(409).send({ message: 'This hookah is already in use', errors })
      return
    }

    // If all ok, send 201 response
    res.status(201).send({ message: 'Offer created' })
  }
}

export default OfferController
