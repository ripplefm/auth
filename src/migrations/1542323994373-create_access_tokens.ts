import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';

export class createAccessTokens1542323994373 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'access_tokens',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()'
          },
          {
            name: 'token',
            type: 'varchar'
          },
          {
            name: 'expires_at',
            type: 'timestamp without time zone'
          },
          {
            name: 'scopes',
            type: 'text'
          },
          {
            name: 'user_id',
            type: 'uuid'
          }
        ]
      }),
      true
    );

    await queryRunner.createForeignKey(
      'access_tokens',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'NO ACTION'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const table = await queryRunner.getTable('access_tokens');
    const fk = table.foreignKeys.find(
      fk => fk.columnNames.indexOf('user_id') !== -1
    );
    await queryRunner.dropForeignKey('access_tokens', fk);
    await queryRunner.dropTable('access_tokens');
  }
}
