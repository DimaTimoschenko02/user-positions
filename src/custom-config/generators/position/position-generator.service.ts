import { Injectable } from '@nestjs/common';
import { es, Faker, faker } from '@faker-js/faker';
import { PositionRepository } from '../../../position/repositories/position.repository';
import { Position } from '../../../position/entities/position.entity';

@Injectable()
export class PositionGeneratorService {
  private readonly faker: Faker;
  private readonly defaultGenerationCount = 10;

  constructor(private readonly positionRepository: PositionRepository) {
    this.faker = new Faker({ locale: [es] });
  }

  public async generatePositions(
    count = this.defaultGenerationCount,
  ): Promise<Position[]> {
    const newPositions = faker.helpers.multiple(this.createRandomPositions, {
      count,
    });

    return this.positionRepository.save(newPositions);
  }

  private createRandomPositions() {
    return {
      name: faker.person.jobTitle(),
    };
  }
}
