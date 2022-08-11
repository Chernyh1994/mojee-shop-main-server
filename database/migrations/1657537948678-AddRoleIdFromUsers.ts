import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddRoleIdFromUsers1657537948678 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'role_id',
        type: 'int',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'role_id');
  }
}
