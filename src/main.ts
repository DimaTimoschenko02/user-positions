import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomConfigService } from './custom-config/custom-config.service';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<CustomConfigService>(CustomConfigService);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  const port = configService.get<number>('APP_PORT');

  const options = new DocumentBuilder()
    .setTitle('swagger')
    .setVersion('1.0')
    .addServer(`http://localhost:${port}`)
    .build();
  const document = SwaggerModule.createDocument(app, options);

  app.enableCors({ origin: '*' });
  app.use(helmet());

  SwaggerModule.setup('api/swagger', app, document);

  await app.listen(port, () => console.log(`App started on port: ${port}`));
}

bootstrap();

setTimeout(() => {
  console.log(__dirname);
}, 3000);
