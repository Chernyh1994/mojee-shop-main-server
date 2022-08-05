import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RemoveIsDeletedFromUsers1659010384352
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'isDeleted');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'isDeleted',
        type: 'boolean',
        default: false,
      }),
    );
  }
}
