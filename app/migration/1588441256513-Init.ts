import { MigrationInterface, QueryRunner } from 'typeorm'
import SeedsService from '../services/SeedsService'

export class Init1588441256513 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "store" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar, "image" varchar, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "isPublished" boolean NOT NULL DEFAULT (1), CONSTRAINT "UQ_66df34da7fb037e24fc7fee642b" UNIQUE ("name"), CONSTRAINT "UQ_66df34da7fb037e24fc7fee642b" UNIQUE ("name"))`
    )
    await queryRunner.query(
      `CREATE TABLE "hookah" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar, "pipes" tinyint NOT NULL, "image" varchar, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "isPublished" boolean NOT NULL DEFAULT (1), "storeId" varchar NOT NULL, CONSTRAINT "UQ_36f35e7d91b48ee5fa43c938650" UNIQUE ("name"))`
    )
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "role" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`
    )
    await queryRunner.query(
      `CREATE TABLE "temporary_hookah" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar, "pipes" tinyint NOT NULL, "image" varchar, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "isPublished" boolean NOT NULL DEFAULT (1), "storeId" varchar NOT NULL, CONSTRAINT "UQ_36f35e7d91b48ee5fa43c938650" UNIQUE ("name"), CONSTRAINT "FK_12af502bcf94f40a09c55804ad4" FOREIGN KEY ("storeId") REFERENCES "store" ("id"))`
    )
    await queryRunner.query(
      `INSERT INTO "temporary_hookah"("id", "name", "description", "pipes", "image", "createdAt", "updatedAt", "isPublished", "storeId") SELECT "id", "name", "description", "pipes", "image", "createdAt", "updatedAt", "isPublished", "storeId" FROM "hookah"`
    )
    await queryRunner.query(`DROP TABLE "hookah"`)
    await queryRunner.query(`ALTER TABLE "temporary_hookah" RENAME TO "hookah"`)
    // seed
    await SeedsService.seed(queryRunner)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "hookah" RENAME TO "temporary_hookah"`)
    await queryRunner.query(
      `CREATE TABLE "hookah" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" varchar, "pipes" tinyint NOT NULL, "image" varchar, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "isPublished" boolean NOT NULL DEFAULT (1), "storeId" varchar NOT NULL, CONSTRAINT "UQ_36f35e7d91b48ee5fa43c938650" UNIQUE ("name"))`
    )
    await queryRunner.query(
      `INSERT INTO "hookah"("id", "name", "description", "pipes", "image", "createdAt", "updatedAt", "isPublished", "storeId") SELECT "id", "name", "description", "pipes", "image", "createdAt", "updatedAt", "isPublished", "storeId" FROM "temporary_hookah"`
    )
    await queryRunner.query(`DROP TABLE "temporary_hookah"`)
    await queryRunner.query(`DROP TABLE "user"`)
    await queryRunner.query(`DROP TABLE "hookah"`)
    await queryRunner.query(`DROP TABLE "store"`)
  }
}
