import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class CreateImages1659701307795 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'images',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'product_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'origin_name',
            type: 'varchar',
            length: '150',
            isNullable: false,
          },
          {
            name: 'system_name',
            type: 'varchar',
            length: '150',
            isNullable: false,
          },
          {
            name: 'url',
            type: 'varchar',
            length: '250',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'images',
      new TableForeignKey({
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      }),
    );

    await queryRunner.createIndex(
      'images',
      new TableIndex({
        name: 'IDX_IMAGE_PRODUCTS',
        columnNames: ['product_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
  }
}
