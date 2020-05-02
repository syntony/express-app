import * as faker from 'faker'
import { QueryRunner } from 'typeorm'

import { Hookah } from '../models/Hookah'

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
    await queryRunner.manager.createQueryBuilder().insert().into('hookah').values(hookahs).execute()
  }
}
