import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateUserResponseDto } from './dtos/create-user-response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileSizeEnum } from '../file/enums/file-size.enum';
import { userPhotoFilter } from '../common/utils/user-photo-filter';
import { FileDto } from '../file/dtos/file.dto';
import { GetUsersQueryDto } from './dtos/get-users-query.dto';
import { RegistrationTokenGuard } from '../auth/guards/registration-token.guard';
import { GetUsersResponseDto } from './dtos/get-users.response.dto';
import { IdDto } from '../common/dtos/id.dto';
import { GetUserResponseDto } from './dtos/get-user.response.dto';
import { checkUserPhotoSize } from '../common/utils/check-user-photo-size.util';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({ type: GetUsersResponseDto })
  public async getUsers(
    @Query() query: GetUsersQueryDto,
  ): Promise<GetUsersResponseDto> {
    return this.userService.getUsers(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: GetUserResponseDto })
  public async getUserById(
    @Param() { id }: IdDto,
  ): Promise<GetUserResponseDto> {
    return this.userService.getUserById(id);
  }

  @Post()
  @ApiHeader({ name: 'registration-token' })
  @UseGuards(RegistrationTokenGuard)
  @ApiOkResponse({ type: CreateUserResponseDto })
  public async createUser(
    @Body() { user }: CreateUserDto,
    @Headers('registration-token') registrationToken: string,
  ): Promise<CreateUserResponseDto> {
    return this.userService.createUser(user, registrationToken);
  }

  @Post('photo')
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ type: FileDto })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        photo: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('photo', {
      fileFilter: userPhotoFilter,
      limits: { fileSize: FileSizeEnum['5MB'] },
    }),
  )
  public async createUserPhoto(
    @UploadedFile() photo: Express.Multer.File,
  ): Promise<FileDto> {
    if (!checkUserPhotoSize(photo)) {
      throw new BadRequestException('FileSizeMustBeAtLeast70*70');
    }

    return this.userService.createUserPhoto(photo);
  }
}
