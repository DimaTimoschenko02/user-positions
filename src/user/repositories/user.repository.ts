import { DataSource, EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { GetUsersQueryDto } from '../dtos/get-users-query.dto';
import { GetUsersSingleUserDto } from '../dtos/get-users-single-user.dto';

@EntityRepository()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  public async getUserById(id: number): Promise<GetUsersSingleUserDto | null> {
    return this.createQueryBuilder('user')
      .select([
        'user.id as "id"',
        'user.name as "name"',
        'user.email as "email"',
        'user.phone as "phone"',
        'position.name as "position"',
        'position.id as "positionId"',
        'photo.key as "photo"',
        'user.createdAt as "registrationDate"',
      ])
      .leftJoin('user.photo', 'photo')
      .leftJoin('user.position', 'position')
      .where('user.id = :id', { id })
      .getRawOne();
  }

  public async getUsersByPages({
    page,
    offset,
    count,
  }: GetUsersQueryDto): Promise<{
    count: number;
    users: GetUsersSingleUserDto[];
  }> {
    const query = this.createQueryBuilder('user')
      .select([
        'user.id as "id"',
        'user.name as "name"',
        'user.email as "email"',
        'user.phone as "phone"',
        'position.name as "position"',
        'position.id as "positionId"',
        'photo.key as "photo"',
        'user.createdAt as "registrationDate"',
      ])
      .leftJoin('user.photo', 'photo')
      .leftJoin('user.position', 'position')
      .orderBy('"registrationDate"', 'ASC');

    const skip = offset ? offset : count * page - count || null;

    const [usersCount, users] = await Promise.all([
      query.getCount(),
      query.offset(skip).limit(count).getRawMany(),
    ]);

    return {
      count: usersCount,
      users,
    };
  }

  public async checkUserEmailAndPhone(email: string, phone: string) {
    return this.createQueryBuilder('user')
      .where('user.email = :email', { email })
      .orWhere('user.phone = :phone', { phone })
      .getOne();
  }
}
