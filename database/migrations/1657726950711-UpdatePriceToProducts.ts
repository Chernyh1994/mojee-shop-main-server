import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdatePriceToProducts1657726950711 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'products',
      'price',
      new TableColumn({
        name: 'price',
        type: 'decimal',
        precision: 7,
        scale: 2,
        isNullable: false,
        default: 0.0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'products',
      'price',
      new TableColumn({
        name: 'price',
        type: 'int',
        isNullable: false,
      }),
    );
  }
}
