import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PositionSeedService } from './position-seed.service';
import { Position } from '../../../position/entities/position.entity';
import { PositionModule } from '../../../position/position.module';

@Module({
  imports: [TypeOrmModule.forFeature([Position]), PositionModule],
  providers: [PositionSeedService],
  exports: [PositionSeedService],
})
export class PositionSeedModule {}
