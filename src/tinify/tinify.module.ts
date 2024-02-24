import { Module } from '@nestjs/common';
import { CustomConfigModule } from '../custom-config/custom-config.module';
import { TinifyService } from './tinify.service';

@Module({
  imports: [CustomConfigModule],
  providers: [TinifyService],
  exports: [TinifyService],
})
export class TinifyModule {}
