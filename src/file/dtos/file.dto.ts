import { IdTimestampDto } from '../../common/dtos/id-timestamp.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FileDto extends IdTimestampDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  key: string;
}
