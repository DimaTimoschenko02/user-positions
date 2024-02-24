import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { PositionSeedService } from './position/position-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  await app.get(PositionSeedService).run();
  await app.close();
};

runSeed();
