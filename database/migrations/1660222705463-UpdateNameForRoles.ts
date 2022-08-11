import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
import { RoleEnum } from '../../src/roles/enums/role.enum';

export class UpdateNameForRoles1660222705463 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'roles',
      'name',
      new TableColumn({
        name: 'name',
        type: 'enum',
        enum: [RoleEnum.OWNER, RoleEnum.ADMIN, RoleEnum.MODERATOR, RoleEnum.VERIFY_USER, RoleEnum.USER],
        enumName: 'roles_name_enum',
        default: `'${RoleEnum.USER}'`,
        isUnique: true,
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'roles',
      'name',
      new TableColumn({
        name: 'name',
        type: 'enum',
        enum: [RoleEnum.OWNER, RoleEnum.ADMIN, RoleEnum.MODERATOR, RoleEnum.VERIFY_USER, RoleEnum.USER],
        enumName: 'roles_name_enum',
        default: `'${RoleEnum.USER}'`,
        isNullable: false,
      }),
    );
  }
}
