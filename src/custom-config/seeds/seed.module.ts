import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomConfigModule } from '../custom-config.module';
import { ConnectionConfigService } from '../connection-config.service';
import { UserGeneratorModule } from '../generators/user/user-generator.module';
import { FileGeneratorModule } from '../generators/file/file-generator.module';
import { PositionGeneratorModule } from '../generators/position/position-generator.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [CustomConfigModule],
      inject: [ConnectionConfigService],
      useFactory: (configService: ConnectionConfigService) =>
        configService.getDbConnectionOption(),
    }),
    UserGeneratorModule,
    FileGeneratorModule,
    PositionGeneratorModule,
  ],
})
export class SeedModule {}
