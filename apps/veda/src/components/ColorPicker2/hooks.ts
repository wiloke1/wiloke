import hexToRgb from 'utils/functions/hexToRgb';
import { useTheme } from 'wiloke-react-core';

export const useIconCheckColor = () => {
  const { colors } = useTheme();

  const getIconCheckColor = (color: string) => {
    if (color.includes('rgba')) {
      const [, r, g, b] = color.match(/rgba\((\d+), (\d+), (\d+), .*\)/) || [];
      if (Number(r) > 150 && Number(g) > 150 && Number(b) > 150) {
        return colors.dark;
      }
      return colors.light;
    }
    const { r, g, b } = hexToRgb(color);
    if (r > 150 && g > 150 && b > 150) {
      return colors.dark;
    }
    return colors.light;
  };

  return getIconCheckColor;
};
