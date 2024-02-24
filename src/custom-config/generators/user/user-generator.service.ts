import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserRepository } from '../../../user/repositories/user.repository';
import { PositionService } from '../../../position/position.service';
import { Position } from '../../../position/entities/position.entity';
import { faker } from '@faker-js/faker';
import { range, sample } from 'lodash';
import { FileGeneratorService } from '../file/file-generator.service';
import { User } from '../../../user/entities/user.entity';

@Injectable()
export class UserGeneratorService implements OnModuleInit {
  private readonly defaultGenerationCount = 45;
  private allPositions: Position[];

  constructor(
    private readonly userRepository: UserRepository,
    private readonly positionService: PositionService,
    private readonly fileGeneratorService: FileGeneratorService,
  ) {}

  async onModuleInit() {
    this.allPositions = await this.positionService.getPositions();
  }

  public async generateRandomUsers(count = this.defaultGenerationCount) {
    if (!this.allPositions) {
      await this.onModuleInit();
    }

    const users = await Promise.all(
      range(count).map(async () => await this.createRandomUser()),
    );

    await this.userRepository.save(users);
  }

  private async createRandomUser(): Promise<User> {
    return this.userRepository.create({
      name: faker.person.firstName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      position: sample(this.allPositions),
      photo: await this.fileGeneratorService.generateFile(),
    });
  }
}
