import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { FileService } from './file.service';
import { FileRepository } from './repositories/file.repository';
import { TinifyModule } from '../tinify/tinify.module';

@Module({
  imports: [TypeOrmModule.forFeature([File]), TinifyModule],
  providers: [FileService, FileRepository],
  exports: [FileService, FileRepository],
})
export class FileModule {}
