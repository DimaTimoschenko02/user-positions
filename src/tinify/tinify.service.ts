import { Injectable } from '@nestjs/common';
import { CustomConfigService } from '../custom-config/custom-config.service';
import tinify from 'tinify';

@Injectable()
export class TinifyService {
  private readonly tinify: typeof tinify;

  constructor(private readonly customConfigService: CustomConfigService) {
    this.tinify = tinify;
    this.tinify.key = customConfigService.get<string>('TINIFY_API_KEY');
  }

  public async cropAndResizeImage(
    file: Express.Multer.File,
  ): Promise<Uint8Array> {
    const source = this.tinify.fromBuffer(file.buffer);

    return source
      .resize({
        method: 'cover',
        width: 70,
        height: 70,
      })
      .toBuffer();
  }
}
