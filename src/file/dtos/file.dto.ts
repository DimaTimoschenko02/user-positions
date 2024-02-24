import { IdTimestampDto } from '../../common/dtos/id-timestamp.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FileDto extends IdTimestampDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  key: string;
}
