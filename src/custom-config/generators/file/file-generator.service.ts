import { Injectable, Logger } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { Axios } from 'axios';
import { FileService } from '../../../file/file.service';
import { File } from '../../../file/entities/file.entity';
import { v4 } from 'uuid';

@Injectable()
export class FileGeneratorService {
  private readonly faker = faker;
  private readonly defaultPhotoHeight = 70;
  private readonly defaultPhotoWidth = 70;
  private readonly photoGenerationApiHost = 'https://picsum.photos/';
  private readonly _axios: Axios;
  private readonly logger = new Logger();

  constructor(private readonly fileService: FileService) {
    this._axios = new Axios({
      baseURL: this.photoGenerationApiHost,
      responseType: 'arraybuffer',
    });
  }

  public async generateFile(): Promise<File> {
    const fileName = v4() + '.jpg';

    const filePath = this.fileService.getUserPhotoPath() + `/${fileName}`;

    const photo = await this.getRandomPhoto();

    await this.fileService.saveFile(photo, filePath, fileName);
    this.logger.log(`file saved path - ${filePath} , name - ${fileName}`);

    return this.fileService.saveUserPhoto({ key: fileName });
  }

  private async getRandomPhoto() {
    const { data } = await this._axios.get(
      `/${this.defaultPhotoHeight}/${this.defaultPhotoWidth}`,
    );

    return data;
  }
}
