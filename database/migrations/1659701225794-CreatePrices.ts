import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { CurrencyCodeEnum } from '../../src/products/enums/currency-code.enum';
import { CurrencySymbolEnum } from '../../src/products/enums/currency-symbol.enum';

export class CreatePrices1659701225794 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'prices',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'current',
            type: 'decimal',
            precision: 7,
            scale: 2,
            isNullable: false,
            default: 0.0,
          },
          {
            name: 'currency_code',
            type: 'enum',
            enum: [CurrencyCodeEnum.USD, CurrencyCodeEnum.EUR, CurrencyCodeEnum.UAH],
            enumName: 'prices_currency_code_enum',
            isNullable: false,
          },
          {
            name: 'symbol',
            type: 'enum',
            enum: [CurrencySymbolEnum.USD, CurrencySymbolEnum.EUR, CurrencySymbolEnum.UAH],
            enumName: 'prices_symbol_enum',
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
    await queryRunner.dropTable('prices');
  }
}
