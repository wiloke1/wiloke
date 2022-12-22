import reorder from 'utils/functions/reorder';

export const swapPickedImage = (images: Array<{ url: string; [key: string]: any }>, currentUrl: string) => {
  const currentIdx = images.findIndex(image => image.url === currentUrl);

  if (currentIdx >= 0) {
    return reorder(images, currentIdx, 0);
  } else {
    return images;
  }
};
