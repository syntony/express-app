import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Initial1588356789078 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'store',
        columns: [
          {
            name: 'id',
            type: 'string',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'isPublished',
            type: 'bool',
          },
        ],
      }),
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('store')
  }
}
