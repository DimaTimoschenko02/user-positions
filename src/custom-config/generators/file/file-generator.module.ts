import { Module } from '@nestjs/common';
import { FileGeneratorService } from './file-generator.service';
import { FileModule } from '../../../file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from '../../../file/entities/file.entity';

@Module({
  imports: [FileModule, TypeOrmModule.forFeature([File])],
  providers: [FileGeneratorService],
  exports: [FileGeneratorService],
})
export class FileGeneratorModule {}
