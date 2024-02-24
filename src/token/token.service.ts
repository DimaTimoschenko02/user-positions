import { Injectable } from '@nestjs/common';
import { TokenJwtService } from '../token-jwt/token-jwt.service';
import { CacheService } from '../cache/cache.service';
import { GetRegistrationTokenResponseDto } from './dtos/get-registration-token-response.dto';

@Injectable()
export class TokenService {
  constructor(
    private readonly tokenJwtService: TokenJwtService,
    private readonly cacheService: CacheService,
  ) {}

  public async getRegistrationToken(): Promise<GetRegistrationTokenResponseDto> {
    const token = this.tokenJwtService.generateRegistrationToken();

    await this.cacheService.setRegistrationToken(token);

    return { token };
  }
}
