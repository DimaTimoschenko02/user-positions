import { ApiProperty } from '@nestjs/swagger';
import { IdTimestampDto } from '../../common/dtos/id-timestamp.dto';

export class PositionDto extends IdTimestampDto {
  @ApiProperty({ type: String })
  name: string;
}
