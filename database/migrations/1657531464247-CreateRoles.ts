import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { RoleValues } from '../../src/roles/types/roles.type';

export class CreateRoles1657531464247 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'roles',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'enum',
            enum: [
              RoleValues.OWNER,
              RoleValues.ADMIN,
              RoleValues.MODERATOR,
              RoleValues.VERIFY_USER,
              RoleValues.USER,
            ],
            enumName: 'roles_name_enum',
            default: `'${RoleValues.USER}'`,
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
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
    await queryRunner.dropTable('roles');
  }
}
