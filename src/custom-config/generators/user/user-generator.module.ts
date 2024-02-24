import { Module } from '@nestjs/common';
import { UserGeneratorService } from './user-generator.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../user/entities/user.entity';
import { UserModule } from '../../../user/user.module';
import { PositionModule } from '../../../position/position.module';
import { FileGeneratorModule } from '../file/file-generator.module';

@Module({
  imports: [
    UserModule,
    PositionModule,
    FileGeneratorModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UserGeneratorService],
  exports: [UserGeneratorService],
})
export class UserGeneratorModule {}
