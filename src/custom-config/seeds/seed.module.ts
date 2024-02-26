import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomConfigModule } from '../custom-config.module';
import { ConnectionConfigService } from '../connection-config.service';
import { PositionSeedModule } from './position/position-seed.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [CustomConfigModule],
      inject: [ConnectionConfigService],
      useFactory: (configService: ConnectionConfigService) =>
        configService.getDbConnectionOption(),
    }),
    PositionSeedModule,
  ],
})
export class SeedModule {}
