import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomConfigService } from './custom-config/custom-config.service';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get<CustomConfigService>(CustomConfigService);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  const port = configService.get<number>('APP_PORT');
  const apiUrl = configService.get<string>('APP_HOST');
  const options = new DocumentBuilder()
    .setTitle('swagger')
    .setVersion('1.0')
    .addServer(`${apiUrl}`)
    .build();

  app.useStaticAssets(path.join(__dirname, '..', 'public'));
  app.useStaticAssets(path.join(__dirname, '..', 'user-photo'));

  const document = SwaggerModule.createDocument(app, options);

  app.enableCors({ origin: '*' });
  app.use(helmet());

  SwaggerModule.setup('api/swagger', app, document);

  await app.listen(port, () => console.log(`App started on port: ${port}`));
}

bootstrap();
