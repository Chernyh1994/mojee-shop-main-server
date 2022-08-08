import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { RoleEnum } from '../../src/roles/enums/role.enum';

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
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'enum',
            enum: [
              RoleEnum.OWNER,
              RoleEnum.ADMIN,
              RoleEnum.MODERATOR,
              RoleEnum.VERIFY_USER,
              RoleEnum.USER,
            ],
            enumName: 'roles_name_enum',
            default: `'${RoleEnum.USER}'`,
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
