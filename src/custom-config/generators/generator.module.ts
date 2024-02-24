import { Module } from '@nestjs/common';
import { CustomConfigModule } from '../custom-config.module';
import { UserGeneratorModule } from './user/user-generator.module';
import { PositionGeneratorModule } from './position/position-generator.module';
import { FileGeneratorModule } from './file/file-generator.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionConfigService } from '../connection-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [CustomConfigModule],
      inject: [ConnectionConfigService],
      useFactory: (configService: ConnectionConfigService) =>
        configService.getDbConnectionOption(),
    }),
    UserGeneratorModule,
    PositionGeneratorModule,
    FileGeneratorModule,
  ],
})
export class GeneratorModule {}
