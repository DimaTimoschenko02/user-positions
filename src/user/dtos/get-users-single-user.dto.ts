import { ApiProperty } from '@nestjs/swagger';

export class GetUsersSingleUserDto {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  position: string;

  @ApiProperty({ type: Number })
  positionId: string;

  @ApiProperty({ type: Date })
  registrationDate: string;

  @ApiProperty({ type: String })
  photo: string;
}
