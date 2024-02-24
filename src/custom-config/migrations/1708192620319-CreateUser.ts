import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumnOptions,
  TableForeignKeyOptions,
} from 'typeorm';

export class CreateUser1708192620319 implements MigrationInterface {
  private readonly tableName = 'user';
  private readonly columns: Array<TableColumnOptions> = [
    { name: 'id', type: 'int8', isPrimary: true, isGenerated: true },
    {
      name: 'name',
      type: 'varchar',
      isNullable: false,
      length: '60',
    },
    {
      name: 'email',
      type: 'varchar',
      isNullable: false,
      isUnique: true,
    },
    {
      name: 'phone',
      type: 'varchar',
      length: '24', // length is 24 because faker has not ua localization and generates phone numbers longer then 13 like in ua number
      isNullable: false,
      isUnique: true,
    },
    {
      name: 'position_id',
      type: 'int8',
      isNullable: false,
    },
    {
      name: 'photo_id',
      type: 'int8',
      isNullable: false,
    },
    {
      name: 'created_at',
      type: 'timestamp',
      default: 'NOW()',
    },
    {
      name: 'updated_at',
      type: 'timestamp',
      default: 'NOW()',
    },
  ];

  private readonly foreignKeys: Array<TableForeignKeyOptions> = [
    {
      name: 'user_file_fk',
      columnNames: ['photo_id'],
      referencedTableName: 'file',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL',
    },
    {
      name: 'user_position_fk',
      columnNames: ['position_id'],
      referencedTableName: 'position',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL',
    },
  ];

  private readonly table = new Table({
    name: this.tableName,
    columns: this.columns,
    foreignKeys: this.foreignKeys,
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
