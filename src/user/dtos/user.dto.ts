import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  Length,
  Matches,
  Min,
  ValidateNested,
} from 'class-validator';
import { FileDto } from '../../file/dtos/file.dto';
import { Type } from 'class-transformer';

export class UserDto {
  @ApiProperty({ type: String, nullable: false })
  @IsNotEmpty()
  @IsString()
  @Length(2, 60)
  name: string;

  @ApiProperty({ type: String, nullable: false })
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  @Matches(
    /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])$)/,
    {
      message: 'Invalid email format',
    },
  )
  email: string;

  @ApiProperty({ type: String, nullable: false })
  @IsNotEmpty()
  @Matches(/^[\+]?380([0-9]{9})$/)
  phone: string;

  @ApiProperty({ type: Number, nullable: false })
  @Min(1)
  @IsInt()
  positionId: number;

  @ApiProperty({ type: () => FileDto })
  @IsNotEmptyObject()
  @Type(() => FileDto)
  @ValidateNested()
  photo: FileDto;
}
