import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class LinksDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  nextUrl = null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  previousUrl = null;
}
