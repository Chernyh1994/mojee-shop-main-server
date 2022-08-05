import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RemoveAgeFromUsers1659010337494 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'age');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'age',
        type: 'int',
        isNullable: false,
      }),
    );
  }
}
