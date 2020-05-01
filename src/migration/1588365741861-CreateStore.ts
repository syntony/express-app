import * as faker from 'faker'
import { MigrationInterface, QueryRunner } from 'typeorm'

// random generator
const generator = (schema, min = 1, max) => {
  max = max || min
  return Array.from({ length: faker.random.number({ min, max }) }).map(() =>
    Object.keys(schema).reduce((entity, key) => {
      entity[key] = faker.fake(schema[key])
      return entity
    }, {})
  )
}

// your schema
const clientsSchema = {
  name: '{{company.companyName}} {{company.companySuffix}}',
  description: '{{lorem.sentences}}',
  isPublished: true,
}

export class CreateStore1588365741861 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "store" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar, "isPublished" boolean NOT NULL DEFAULT (0), CONSTRAINT "UQ_66df34da7fb037e24fc7fee642b" UNIQUE ("name"))`
    )
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('store')
      .values(generator(clientsSchema, 3, 10))
      .execute()
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "store"`)
  }
}
