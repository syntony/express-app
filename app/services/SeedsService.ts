import * as faker from 'faker'
import { QueryRunner } from 'typeorm'

import { Hookah } from '../models/Hookah'
import { Offer } from '../models/Offer'

export default class SeedsService {
  static arrayGenerator(schema, min = 1, max): Array<object> {
    max = max || min
    return Array.from({ length: faker.random.number({ min, max }) }).map(() =>
      Object.keys(schema).reduce((entity, key) => {
        entity[key] = faker.fake(schema[key])
        return entity
      }, {})
    )
  }

  static async seed(queryRunner: QueryRunner): Promise<void> {
    const storesSchema = {
      name: '{{company.companyName}} {{company.companySuffix}}',
      description: '{{lorem.sentences}}',
      image: 'http://loremflickr.com/640/480/hookah',
    }
    const hookahsSchema = {
      name: '{{commerce.productName}}',
      description: '{{lorem.sentences}}',
      pipes: '{{random.number(6)}}',
      image: 'http://loremflickr.com/640/480/hookah',
    }
    const offerSchema = {
      guest: '{{name.firstName}} {{name.lastName}}',
      guestsNumber: '{{random.number(8)}}',
      reservedFrom: new Date().toUTCString(),
      reservedUntil: new Date().toUTCString(),
    }
    // seed
    // stores
    const stores = this.arrayGenerator(storesSchema, 3, 10)
    const { identifiers: storesIdentifiers } = await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('store')
      .values(stores)
      .execute()
    // hookahs
    const hookahs = storesIdentifiers.reduce((acc: Array<object> = [], { id }) => {
      const data = this.arrayGenerator(hookahsSchema, 3, 10)
      return [...acc, ...data.map((hookah: Hookah) => ({ ...hookah, storeId: id }))]
    }, [])
    const { identifiers: hookahsIdentifiers } = await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('hookah')
      .values(hookahs)
      .execute()
    // offers
    const offers = hookahsIdentifiers.reduce((acc: Array<object> = [], { id }) => {
      const data = this.arrayGenerator(offerSchema, 1, 2)
      return [
        ...acc,
        ...data.map((offer: Offer) => ({
          ...offer,
          hookahId: id,
          storeId: storesIdentifiers[Math.floor(Math.random() * storesIdentifiers.length)].id,
        })),
      ]
    }, [])
    await queryRunner.manager.createQueryBuilder().insert().into('offer').values(offers).execute()
  }
}
