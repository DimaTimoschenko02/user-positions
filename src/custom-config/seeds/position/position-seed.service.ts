import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In } from 'typeorm';
import { PositionRepository } from '../../../position/repositories/position.repository';
import { SeededPositionsEnum } from './enums/seeded-positions.enum';

@Injectable()
export class PositionSeedService {
  constructor(
    @InjectRepository(PositionRepository)
    private readonly positionRepository: PositionRepository,
  ) {}

  public async run() {
    const existingPositions = await this.positionRepository.find({
      where: { name: In(Object.values(SeededPositionsEnum)) },
    });

    const devPosition = existingPositions.find(
      ({ name }) => name === SeededPositionsEnum.DEVELOPER,
    );

    if (!devPosition) {
      await this.positionRepository.save({
        name: SeededPositionsEnum.DEVELOPER,
      });
    }

    const leadPosition = existingPositions.find(
      ({ name }) => name === SeededPositionsEnum.LEAD,
    );

    if (!leadPosition) {
      await this.positionRepository.save({
        name: SeededPositionsEnum.LEAD,
      });
    }

    const managerPosition = existingPositions.find(
      ({ name }) => name === SeededPositionsEnum.MANAGER,
    );

    if (!managerPosition) {
      await this.positionRepository.save({
        name: SeededPositionsEnum.MANAGER,
      });
    }

    const adminPosition = existingPositions.find(
      ({ name }) => name === SeededPositionsEnum.ADMIN,
    );

    if (!adminPosition) {
      await this.positionRepository.save({
        name: SeededPositionsEnum.ADMIN,
      });
    }
  }
}
