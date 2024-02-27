import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class IdTimestampDto {
  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  id: number;

  @ApiProperty({ type: Date })
  @IsOptional()
  createdAt: Date;

  @ApiProperty({ type: Date })
  @IsOptional()
  updatedAt: Date;
}
