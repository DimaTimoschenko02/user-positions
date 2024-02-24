import { GetUsersSingleUserDto } from './get-users-single-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { GetUsersResponseDto } from './get-users.response.dto';
import { Type } from 'class-transformer';

export class GetUserResponseDto {
  @ApiProperty({ type: () => GetUsersResponseDto })
  @Type(() => GetUsersSingleUserDto)
  user: GetUsersSingleUserDto;
}
