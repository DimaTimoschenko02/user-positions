import { Injectable, NotFoundException } from '@nestjs/common';
import { FileRepository } from './repositories/file.repository';
import { createWriteStream } from 'fs';
import { File } from './entities/file.entity';
import { TinifyService } from '../tinify/tinify.service';

@Injectable()
export class FileService {
  private readonly userPhotoPath: string;

  constructor(
    private readonly fileRepository: FileRepository,
    private readonly tinifyService: TinifyService,
  ) {
    this.userPhotoPath = './src/public/images/user-photo';
  }

  public async createUserPhoto(file: Express.Multer.File): Promise<File> {
    const fileName = `${Date.now()}-${file.originalname}`;
    const path = `${this.userPhotoPath}/${fileName}`;

    const userPhoto = await this.tinifyService.cropAndResizeImage(file);

    await this.saveFile(userPhoto, path, fileName);

    return this.saveUserPhoto({ key: fileName });
  }

  public async saveUserPhoto({ key }: { key: string }) {
    return this.fileRepository.save({
      key,
    });
  }

  public async getFileById(fileId: number) {
    return this.isExistsFile(fileId);
  }

  public getUserPhotoPath(): string {
    return this.userPhotoPath;
  }

  public async saveFile(buffer: Uint8Array, path: string, fileName: string) {
    return new Promise((resolve, reject) =>
      createWriteStream(path)
        .on('finish', () => resolve(fileName))
        .on('error', (error) => reject(error))
        .end(buffer),
    );
  }

  private async isExistsFile(fileId: number) {
    const file = await this.fileRepository.findOne({
      where: { id: fileId },
    });

    if (!file) throw new NotFoundException('FileNotFound');

    return file;
  }
}
