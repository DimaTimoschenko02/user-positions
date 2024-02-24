import { BadRequestException } from '@nestjs/common';
import { ImageTypesEnum } from '../../file/enums/image-types.enum';

export const userPhotoFilter = (
  _req: Request,
  file: Express.Multer.File,
  callback: (error: Error, acceptFile: boolean) => void,
) => {
  return Object.values<string>(ImageTypesEnum).includes(file.mimetype)
    ? callback(null, true)
    : callback(
        new BadRequestException(`${file.mimetype} format is unsupported`),
        false,
      );
};
