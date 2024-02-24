import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from './entities/position.entity';
import { PositionRepository } from './repositories/position.repository';
import { PositionService } from './position.service';
import { PositionController } from './position.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Position])],
  providers: [PositionRepository, PositionService],
  controllers: [PositionController],
  exports: [PositionService, PositionRepository],
})
export class PositionModule {}
