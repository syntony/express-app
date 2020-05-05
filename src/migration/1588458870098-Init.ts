import { MigrationInterface, QueryRunner } from 'typeorm'
import SeedsService from '../services/SeedsService'

export class Init1588458870098 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "offer" ("id" varchar PRIMARY KEY NOT NULL, "guest" varchar NOT NULL, "guestsNumber" integer NOT NULL, "reservedFrom" date NOT NULL, "reservedUntil" date NOT NULL, "storeId" varchar NOT NULL, "hookahId" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`
    )
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "store" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar, "image" varchar, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "isPublished" boolean NOT NULL DEFAULT (1), CONSTRAINT "UQ_66df34da7fb037e24fc7fee642b" UNIQUE ("name"), CONSTRAINT "UQ_66df34da7fb037e24fc7fee642b" UNIQUE ("name"))`
    )
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "hookah" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar, "pipes" tinyint NOT NULL, "image" varchar, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "isPublished" boolean NOT NULL DEFAULT (1), "storeId" varchar NOT NULL, CONSTRAINT "UQ_36f35e7d91b48ee5fa43c938650" UNIQUE ("name"))`
    )
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "temporary_offer" ("id" varchar PRIMARY KEY NOT NULL, "guest" varchar NOT NULL, "guestsNumber" integer NOT NULL, "reservedFrom" date NOT NULL, "reservedUntil" date NOT NULL, "storeId" varchar NOT NULL, "hookahId" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_863e1890733fe417777e214dccb" FOREIGN KEY ("storeId") REFERENCES "store" ("id"), CONSTRAINT "FK_5d2a1caa3af8e3bb96848250761" FOREIGN KEY ("hookahId") REFERENCES "hookah" ("id"))`
    )
    await queryRunner.query(
      `INSERT INTO "temporary_offer"("id", "guest", "guestsNumber", "reservedFrom", "reservedUntil", "storeId", "hookahId", "createdAt", "updatedAt") SELECT "id", "guest", "guestsNumber", "reservedFrom", "reservedUntil", "storeId", "hookahId", "createdAt", "updatedAt" FROM "offer"`
    )
    await queryRunner.query(`DROP TABLE "offer"`)
    await queryRunner.query(`ALTER TABLE "temporary_offer" RENAME TO "offer"`)
    await queryRunner.query(
      `CREATE TABLE "temporary_hookah" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar, "pipes" tinyint NOT NULL, "image" varchar, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "isPublished" boolean NOT NULL DEFAULT (1), "storeId" varchar NOT NULL, CONSTRAINT "UQ_36f35e7d91b48ee5fa43c938650" UNIQUE ("name"), CONSTRAINT "FK_12af502bcf94f40a09c55804ad4" FOREIGN KEY ("storeId") REFERENCES "store" ("id"))`
    )
    await queryRunner.query(
      `INSERT INTO "temporary_hookah"("id", "name", "description", "pipes", "image", "createdAt", "updatedAt", "isPublished", "storeId") SELECT "id", "name", "description", "pipes", "image", "createdAt", "updatedAt", "isPublished", "storeId" FROM "hookah"`
    )
    await queryRunner.query(`DROP TABLE "hookah"`)
    await queryRunner.query(`ALTER TABLE "temporary_hookah" RENAME TO "hookah"`)
    await SeedsService.seed(queryRunner)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    // await queryRunner.query(`ALTER TABLE "hookah" RENAME TO "temporary_hookah"`)
    // await queryRunner.query(
    //   `CREATE TABLE "hookah" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar, "pipes" tinyint NOT NULL, "image" varchar, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "isPublished" boolean NOT NULL DEFAULT (1), "storeId" varchar NOT NULL, CONSTRAINT "UQ_36f35e7d91b48ee5fa43c938650" UNIQUE ("name"))`
    // )
    // await queryRunner.query(
    //   `INSERT INTO "hookah"("id", "name", "description", "pipes", "image", "createdAt", "updatedAt", "isPublished", "storeId") SELECT "id", "name", "description", "pipes", "image", "createdAt", "updatedAt", "isPublished", "storeId" FROM "temporary_hookah"`
    // )
    // await queryRunner.query(`DROP TABLE "temporary_hookah"`)
    // await queryRunner.query(`ALTER TABLE "offer" RENAME TO "temporary_offer"`)
    // await queryRunner.query(
    //   `CREATE TABLE "offer" ("id" varchar PRIMARY KEY NOT NULL, "guest" varchar NOT NULL, "guestsNumber" integer NOT NULL, "reservedFrom" date NOT NULL, "reservedUntil" date NOT NULL, "storeId" varchar NOT NULL, "hookahId" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`
    // )
    // await queryRunner.query(
    //   `INSERT INTO "offer"("id", "guest", "guestsNumber", "reservedFrom", "reservedUntil", "storeId", "hookahId", "createdAt", "updatedAt") SELECT "id", "guest", "guestsNumber", "reservedFrom", "reservedUntil", "storeId", "hookahId", "createdAt", "updatedAt" FROM "temporary_offer"`
    // )
    // await queryRunner.query(`DROP TABLE "temporary_offer"`)
    await queryRunner.query(`DROP TABLE "offer"`)
    await queryRunner.query(`DROP TABLE "hookah"`)
    await queryRunner.query(`DROP TABLE "store"`)
  }
}
