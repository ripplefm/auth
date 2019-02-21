import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class create_users1542315396947 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS pgcrypto');
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()'
          },
          {
            name: 'username',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: false
          },
          {
            name: 'activation_token',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'password',
            type: 'varchar'
          }
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('users');
    await queryRunner.query('DROP EXTENSION pgcrypto');
  }
}
