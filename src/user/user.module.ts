import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PositionModule } from '../position/position.module';
import { FileModule } from '../file/file.module';
import { CustomCacheModule } from '../cache/cache.module';
import { User } from './entities/user.entity';
import { TokenJwtModule } from '../token-jwt/token-jwt.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PositionModule,
    FileModule,
    CustomCacheModule,
    TokenJwtModule,
  ],
  providers: [UserRepository, UserService],
  controllers: [UserController],
  exports: [UserRepository],
})
export class UserModule {}
