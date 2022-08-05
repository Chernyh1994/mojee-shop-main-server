import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';

export class AddRoleIdIndexForUsers1659010742605 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'IDX_USER_ROLE',
        columnNames: ['role_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('users', 'IDX_USER_ROLE');
  }
}
