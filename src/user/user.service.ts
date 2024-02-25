import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { PositionService } from '../position/position.service';
import { UserDto } from './dtos/user.dto';
import { FileService } from '../file/file.service';
import { CreateUserResponseDto } from './dtos/create-user-response.dto';
import { CacheService } from '../cache/cache.service';
import { FileDto } from '../file/dtos/file.dto';
import { GetUsersQueryDto } from './dtos/get-users-query.dto';
import { LinksDto } from './dtos/links.dto';
import { first, isEmpty, isNil } from 'lodash';
import { GetUsersResponseDto } from './dtos/get-users.response.dto';
import { GetUserResponseDto } from './dtos/get-user.response.dto';
import { GetUsersSingleUserDto } from './dtos/get-users-single-user.dto';
import { CustomConfigService } from '../custom-config/custom-config.service';

@Injectable()
export class UserService {
  private readonly apiUserUrl: string;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly positionService: PositionService,
    private readonly fileService: FileService,
    private readonly cacheService: CacheService,
    private readonly configService: CustomConfigService,
  ) {
    this.apiUserUrl = configService.get<string>('API_URL') + '/' + 'user';
  }

  public async getUserById(id: number): Promise<GetUserResponseDto> {
    const user = await this.userRepository.getUserById(id);

    if (isNil(user)) throw new NotFoundException('UserNotFound');

    return { user: first(this.mapUsersPhoto([user])) };
  }

  public async getUsers(query: GetUsersQueryDto): Promise<GetUsersResponseDto> {
    const { users, count: usersCount } =
      await this.userRepository.getUsersByPages(query);

    if (isEmpty(users)) throw new NotFoundException('PageNotFound');

    return {
      count: query.count,
      totalUsers: usersCount,
      totalPages: query.count ? Math.ceil(usersCount / query.count) : null,
      page: query.page || 1,
      links: query.page
        ? this.getLinks({
            totalUsers: usersCount,
            page: query.page,
            count: query.count,
          })
        : new LinksDto(),
      users: this.mapUsersPhoto(users),
    };
  }

  public async createUser(
    { positionId, photo, ...user }: UserDto,
    token: string,
  ): Promise<CreateUserResponseDto> {
    const [file, position, existingUser] = await Promise.all([
      this.fileService.getFileById(photo.id),
      this.positionService.getPositionById(positionId),
      this.userRepository.checkUserEmailAndPhone(user.email, user.phone),
    ]);

    if (existingUser)
      throw new BadRequestException('EmailOrPhoneAlreadyExists');

    this.cacheService.deleteRegistrationToken(token).then();

    return this.userRepository.save({
      ...user,
      position,
      photo: file,
    });
  }

  public async createUserPhoto(file: Express.Multer.File): Promise<FileDto> {
    return this.fileService.createUserPhoto(file);
  }

  private mapUsersPhoto(users: GetUsersSingleUserDto[]) {
    return users.map(({ photo, ...user }) => ({
      ...user,
      photo: `${this.fileService.getUserPhotoPath()}/${photo}`,
    }));
  }

  private getLinks(params: {
    totalUsers: number;
    page: number;
    count: number;
  }): LinksDto {
    const { totalUsers, page, count } = params;

    return {
      previousUrl:
        page > 1 ? `${this.apiUserUrl}?page=${page - 1}&count=${count}` : null,
      nextUrl:
        page * count < totalUsers
          ? `${this.apiUserUrl}?page=${page + 1}&count=${count}`
          : null,
    };
  }
}
