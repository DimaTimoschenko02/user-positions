import { Injectable, NotFoundException } from '@nestjs/common';
import { PositionRepository } from './repositories/position.repository';
import { Position } from './entities/position.entity';

@Injectable()
export class PositionService {
  constructor(private readonly positionRepository: PositionRepository) {}

  public async getPositionById(positionId: number) {
    return this.isExistsPosition(positionId);
  }

  public async getPositions(): Promise<Position[]> {
    return this.positionRepository.find();
  }

  private async isExistsPosition(positionId: number) {
    const position = await this.positionRepository.findOne({
      where: { id: positionId },
    });

    if (!position) throw new NotFoundException('PositionNotFound');

    return position;
  }
}
