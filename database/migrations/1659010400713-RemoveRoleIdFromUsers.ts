import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RemoveRoleIdFromUsers1659010400713 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'role_id');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'role_id',
        type: 'int',
      }),
    );
  }
}
