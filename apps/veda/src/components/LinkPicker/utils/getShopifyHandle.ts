export function getShopifyHandle(value: string): string {
  const handle = value.replace(/.*\//gm, '');
  return handle;
}
