import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export class createOauth2Clients1542325237092 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'oauth2_clients',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()'
          },
          {
            name: 'client_secret',
            type: 'varchar'
          },
          {
            name: 'redirect_uris',
            type: 'text'
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'description',
            type: 'varchar'
          },
          {
            name: 'is_trusted',
            type: 'boolean',
            default: false
          }
        ]
      }),
      true
    );

    await queryRunner.addColumn(
      'access_tokens',
      new TableColumn({
        name: 'client_id',
        type: 'uuid'
      })
    );

    await queryRunner.createForeignKey(
      'access_tokens',
      new TableForeignKey({
        columnNames: ['client_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'oauth2_clients',
        onDelete: 'NO ACTION'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const table = await queryRunner.getTable('access_tokens');
    const fk = table.foreignKeys.find(
      fk => fk.columnNames.indexOf('client_id') !== -1
    );
    await queryRunner.dropForeignKey('access_tokens', fk);
    await queryRunner.dropColumn('access_tokens', 'client_id');
    await queryRunner.dropTable('oauth2_clients');
  }
}
