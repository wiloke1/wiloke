import { PickerType } from '../types';

export function getLinkType(value: string): PickerType {
  const shopifyType =
    value.includes('pages/') ||
    value.includes('collections/') ||
    value.includes('products/') ||
    value.includes('articles/') ||
    value.includes('blogs/');

  const mailType = value.includes('mailto:');
  const phoneType = value.includes('tel:');

  if (shopifyType) {
    return 'shopify';
  }

  if (mailType) {
    return 'email';
  }

  if (phoneType) {
    return 'phone';
  }

  return 'custom';
}

export function removeTel(value: string) {
  const reg = value.replace(/tel:/gm, '');
  return reg;
}
