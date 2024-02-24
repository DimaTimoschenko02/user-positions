import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PositionService } from './position.service';
import { PositionDto } from './dtos/position.dto';
import { Position } from './entities/position.entity';

@ApiTags('Position')
@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Get()
  @ApiOkResponse({ type: PositionDto, isArray: true })
  public async getPositions(): Promise<Position[]> {
    return this.positionService.getPositions();
  }
}
