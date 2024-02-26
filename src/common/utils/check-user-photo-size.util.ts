import sizeOf from 'image-size';
import { allowedUserPhotoSize } from '../../user/consts/allowed-user-photo-size.const';

export const checkUserPhotoSize = (value: Express.Multer.File) => {
  const { height, width } = sizeOf(value.buffer);

  return (
    height > allowedUserPhotoSize.height && width > allowedUserPhotoSize.width
  );
};
