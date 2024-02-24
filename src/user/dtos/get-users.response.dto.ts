import { LinksDto } from './links.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { GetUsersSingleUserDto } from './get-users-single-user.dto';

export class GetUsersResponseDto {
  @ApiPropertyOptional({ type: Number })
  page: number;

  @ApiPropertyOptional({ type: Number, nullable: true })
  totalPages: number;

  @ApiProperty({ type: Number })
  totalUsers: number;

  @ApiProperty({ type: Number })
  count: number;

  @ApiProperty({ type: () => LinksDto })
  @Type(() => LinksDto)
  links: LinksDto;

  @ApiProperty({ type: () => GetUsersSingleUserDto, isArray: true })
  @Type(() => GetUsersSingleUserDto)
  users: GetUsersSingleUserDto[];
}
