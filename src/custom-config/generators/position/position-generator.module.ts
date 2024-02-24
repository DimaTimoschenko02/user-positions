import { Module } from '@nestjs/common';
import { PositionGeneratorService } from './position-generator.service';
import { PositionModule } from '../../../position/position.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from '../../../position/entities/position.entity';

@Module({
  imports: [PositionModule, TypeOrmModule.forFeature([Position])],
  providers: [PositionGeneratorService],
  exports: [PositionGeneratorService],
})
export class PositionGeneratorModule {}
