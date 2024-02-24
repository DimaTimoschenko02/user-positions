import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { CustomConfigModule } from '../custom-config/custom-config.module';
import { ConnectionConfigService } from '../custom-config/connection-config.service';
import { redisStore } from 'cache-manager-redis-yet';
import { CacheService } from './cache.service';

@Module({
  imports: [
    CustomConfigModule,
    CacheModule.registerAsync({
      imports: [CustomConfigModule],
      inject: [ConnectionConfigService],
      useFactory: (dbConfigService: ConnectionConfigService) => {
        return {
          store: redisStore,
          url: dbConfigService.getRedisConnectionUrl(),
          isGlobal: true,
          isCacheableValue: undefined,
        };
      },
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CustomCacheModule {}
