import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateProfiles1658752204095 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'profiles',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'first_name',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'last_name',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'phone_number',
            type: 'varchar',
            length: '14',
            isNullable: true,
          },
          {
            name: 'date_of_birth',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'country',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'region',
            type: 'varchar',
            length: '75',
            isNullable: true,
          },
          {
            name: 'city',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'street',
            type: 'varchar',
            length: '75',
            isNullable: true,
          },
          {
            name: 'zip_code',
            type: 'int',
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

    await queryRunner.createIndex(
      'profiles',
      new TableIndex({
        name: 'IDX_PROFILE_CITY',
        columnNames: ['city'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('profiles');
  }
}
