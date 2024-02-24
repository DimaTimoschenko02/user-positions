import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { IdTimestampEntity } from '../../common/entities/id-timestamp.entity';
import { Position } from '../../position/entities/position.entity';
import { File } from '../../file/entities/file.entity';

@Entity('user')
export class User extends IdTimestampEntity {
  @Column({ name: 'name', type: 'varchar', length: 60, nullable: false })
  name: string;

  @Column({ name: 'email', type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({
    name: 'phone',
    type: 'varchar',
    length: 13,
    nullable: false,
    unique: true,
  })
  phone: string;

  @ManyToOne(() => Position, (position) => position.users)
  @JoinColumn({ name: 'position_id', referencedColumnName: 'id' })
  position: Position;

  @OneToOne(() => File, { nullable: false })
  @JoinColumn({ name: 'photo_id', referencedColumnName: 'id' })
  photo: File;
}
