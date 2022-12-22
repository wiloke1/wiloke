export function getWidthHeightImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = function() {
      resolve(image);
    };
    image.onerror = function(err) {
      reject(err);
    };
    image.src = url;
  });
}
