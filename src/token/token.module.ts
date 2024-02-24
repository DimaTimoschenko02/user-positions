import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { TokenJwtModule } from '../token-jwt/token-jwt.module';
import { CustomCacheModule } from '../cache/cache.module';

@Module({
  imports: [CustomCacheModule, TokenJwtModule],
  providers: [TokenService],
  controllers: [TokenController],
})
export class TokenModule {}
