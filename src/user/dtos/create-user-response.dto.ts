import { ApiProperty } from '@nestjs/swagger';
import { FileDto } from '../../file/dtos/file.dto';
import { PositionDto } from '../../position/dtos/position.dto';
import { Position } from '../../position/entities/position.entity';

export class CreateUserResponseDto {
  @ApiProperty({ type: String, nullable: false })
  name: string;

  @ApiProperty({ type: String, nullable: false })
  email: string;

  @ApiProperty({ type: String, nullable: false })
  phone: string;

  @ApiProperty({ type: () => PositionDto })
  position: Position;

  @ApiProperty({ type: () => FileDto })
  photo: FileDto;
}
