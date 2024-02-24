import { Column, Entity } from 'typeorm';
import { IdTimestampEntity } from '../../common/entities/id-timestamp.entity';

@Entity('file')
export class File extends IdTimestampEntity {
  @Column({
    name: 'key',
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  key: string;
}
