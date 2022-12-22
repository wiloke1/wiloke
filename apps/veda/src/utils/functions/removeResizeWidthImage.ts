export function removeResizeWidthImage(url: string) {
  return url.replace(/(&|\?)width=.*/, '');
}
