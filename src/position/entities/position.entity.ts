import { Column, Entity, OneToMany } from 'typeorm';
import { IdTimestampEntity } from '../../common/entities/id-timestamp.entity';
import { User } from '../../user/entities/user.entity';

@Entity('position')
export class Position extends IdTimestampEntity {
  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
    length: 60,
  })
  name: string;

  @OneToMany(() => User, (user) => user.position)
  users: User[];
}
