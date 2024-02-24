import { Injectable } from '@nestjs/common';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { CustomConfigService } from '../custom-config/custom-config.service';

@Injectable()
export class TokenJwtService {
  private readonly jwtSecret: string;
  private readonly jwtExpireTime: string;

  public constructor(
    private readonly customConfigService: CustomConfigService,
  ) {
    this.jwtSecret = this.customConfigService.get<string>('JWT_SECRET_KEY');
    this.jwtExpireTime = this.customConfigService.get<string>(
      'JWT_TOKEN_EXPIRE_TIME',
    );
  }

  public generateRegistrationToken(): string {
    return sign({}, this.jwtSecret, {
      expiresIn: this.jwtExpireTime,
    });
  }

  public decodeToken(token: string): JwtPayload {
    try {
      return verify(token, this.jwtSecret) as JwtPayload;
    } catch (error) {
      return error;
    }
  }
}
