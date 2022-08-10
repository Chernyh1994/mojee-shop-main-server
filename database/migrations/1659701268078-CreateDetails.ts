import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { SizeEnum } from '../../src/products/enums/size.enum';

export class CreateDetails1659701268078 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'details',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'full_name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            length: '300',
            isNullable: true,
          },
          {
            name: 'size',
            type: 'enum',
            enum: [SizeEnum.XS, SizeEnum.S, SizeEnum.M, SizeEnum.L, SizeEnum.XL],
            enumName: 'details_size_enum[]',
            isNullable: false,
          },
          {
            name: 'fabric_type',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'product_country',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'brand',
            type: 'varchar',
            length: '50',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('details');
  }
}
