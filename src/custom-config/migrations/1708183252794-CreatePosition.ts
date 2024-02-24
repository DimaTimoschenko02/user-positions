import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumnOptions,
} from 'typeorm';

export class CreatePosition1708183252794 implements MigrationInterface {
  private readonly tableName = 'position';
  private readonly columns: Array<TableColumnOptions> = [
    { name: 'id', type: 'int8', isPrimary: true, isGenerated: true },
    {
      name: 'name',
      type: 'varchar',
      isNullable: false,
      length: '60',
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

  private readonly table = new Table({
    name: this.tableName,
    columns: this.columns,
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
