import Faker from 'faker'
import { define } from 'typeorm-seeding'

import { Store } from '../entities/Store'

define(Store, (faker: typeof Faker) => {
  const store = new Store()
  store.name = faker.company.companyName()
  store.description = faker.lorem.sentences()
  return store
})
