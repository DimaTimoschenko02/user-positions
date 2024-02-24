import { Inject, Injectable } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { CacheExpireTimeEnum } from './enums/cache-expire-time.enum';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  public async setRegistrationToken(token: string): Promise<void> {
    await this.saveData(token, token, CacheExpireTimeEnum['40_MINUTE']);
  }

  public async getRegistrationToken(token: string): Promise<string> {
    return await this.getDataByKey(token);
  }

  public async deleteRegistrationToken(token: string): Promise<void> {
    await this.deleteDataByKey(token);
  }

  private async saveData<Value>(
    key: string,
    value: Value,
    ttl: number,
  ): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
  }

  private async getDataByKey<Response>(
    key: string,
  ): Promise<Response | undefined> {
    return await this.cacheManager.get<Response>(key);
  }

  private async deleteDataByKey(key: string): Promise<void> {
    return await this.cacheManager.del(key);
  }
}
