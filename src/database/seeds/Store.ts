import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'

import { Store } from '../entities/Store'

export default class CreateStores implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(Store)().createMany(10)
  }
}
