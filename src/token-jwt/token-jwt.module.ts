import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenJwtService } from './token-jwt.service';
import { CustomConfigModule } from '../custom-config/custom-config.module';

@Module({
  imports: [CustomConfigModule, JwtModule.register({})],
  providers: [TokenJwtService],
  exports: [TokenJwtService],
})
export class TokenJwtModule {}
