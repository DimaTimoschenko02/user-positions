import { GeneratorModule } from './generator.module';
import { NestFactory } from '@nestjs/core';
import { UserGeneratorService } from './user/user-generator.service';

const runGenerators = async () => {
  const app = await NestFactory.create(GeneratorModule);

  // await app.get(PositionGeneratorService).generatePositions(5);
  await app.get(UserGeneratorService).generateRandomUsers(35);

  await app.close();
};

runGenerators().then(() => console.log('data generated successfully'));
