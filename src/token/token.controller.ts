import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TokenService } from './token.service';
import { GetRegistrationTokenResponseDto } from './dtos/get-registration-token-response.dto';

@ApiTags('Token')
@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get()
  @ApiOkResponse({ type: GetRegistrationTokenResponseDto })
  public async getRegistrationToken(): Promise<GetRegistrationTokenResponseDto> {
    return this.tokenService.getRegistrationToken();
  }
}
