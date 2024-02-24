import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import * as DbMigrationsModule from './migrations';
import { CustomConfigService } from './custom-config.service';
import { File } from '../file/entities/file.entity';
import { Position } from '../position/entities/position.entity';
import { User } from '../user/entities/user.entity';

const dbMigrations = Object.values(DbMigrationsModule);

@Injectable()
export class ConnectionConfigService {
  private readonly postgresConnectionOptions: TypeOrmModuleOptions;

  private readonly redisConnectionUrl: string;

  constructor(private readonly configService: CustomConfigService) {
    this.redisConnectionUrl = this.configService.get<string>('REDIS_URL');
    this.postgresConnectionOptions = {
      type: 'postgres',
      url: this.configService.get<string>('POSTGRES_URL'),
      entities: [File, Position, User],
      migrations: dbMigrations,
      migrationsRun: true,
      migrationsTableName: 'migrations',
      synchronize: false,
      logging: true,
    };
  }

  public getDbConnectionOption(): TypeOrmModuleOptions {
    return this.postgresConnectionOptions;
  }

  public getRedisConnectionUrl(): string {
    return this.redisConnectionUrl;
  }
}
