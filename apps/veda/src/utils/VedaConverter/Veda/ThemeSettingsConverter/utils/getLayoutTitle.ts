import { ThemeSettings } from '../@types/ThemeSettings';

export const getLayoutTitle = (name: keyof ThemeSettings['layoutSettings']) => {
  if (name === 'columnGapX') {
    return 'Column gap horizontal (px)';
  }
  if (name === 'columnGapY') {
    return 'Column gap vertical (px)';
  }
  if (name === 'containerGap') {
    return 'Container gap (px)';
  }
  if (name === 'containerWidth') {
    return 'Container width (px)';
  }
  return 'Không tồn tại';
};
