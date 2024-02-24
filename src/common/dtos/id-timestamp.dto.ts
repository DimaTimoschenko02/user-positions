import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class IdTimestampDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  id: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
