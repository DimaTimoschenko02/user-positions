import { UserDto } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({ type: () => UserDto })
  @IsNotEmptyObject()
  @Type(() => UserDto)
  @ValidateNested()
  user: UserDto;
}
