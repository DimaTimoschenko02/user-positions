import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomConfigService } from './custom-config.service';
import { ConnectionConfigService } from './connection-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  providers: [CustomConfigService, ConnectionConfigService],
  exports: [CustomConfigService, ConnectionConfigService],
})
export class CustomConfigModule {}
