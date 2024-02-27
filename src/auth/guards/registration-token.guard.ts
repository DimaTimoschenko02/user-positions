import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CacheService } from '../../cache/cache.service';
import { TokenJwtService } from '../../token-jwt/token-jwt.service';

@Injectable()
export class RegistrationTokenGuard implements CanActivate {
  constructor(
    @Inject(CacheService) private readonly cacheService: CacheService,
    @Inject(TokenJwtService) private readonly tokenJwtService: TokenJwtService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const registrationToken = request.headers['registration-token'];

    if (!registrationToken) throw new ForbiddenException('Forbidden');

    const isExistsValidToken =
      await this.cacheService.getRegistrationToken(registrationToken);

    if (!isExistsValidToken) throw new BadRequestException('TokenNotFound');

    this.tokenJwtService.decodeToken(isExistsValidToken);

    return true;
  }
}
