import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomConfigModule } from './custom-config/custom-config.module';
import { ConnectionConfigService } from './custom-config/connection-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PositionModule } from './position/position.module';
import { FileModule } from './file/file.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    CustomConfigModule,
    TokenModule,
    TypeOrmModule.forRootAsync({
      imports: [CustomConfigModule],
      inject: [ConnectionConfigService],
      useFactory: (configService: ConnectionConfigService) =>
        configService.getDbConnectionOption(),
    }),
    UserModule,
    PositionModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
