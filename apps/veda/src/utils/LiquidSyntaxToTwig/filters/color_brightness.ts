import { parseToRgb } from 'polished';
import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { toString } from '../utils/toString';

window.Twig.extendFilter('color_brightness', value => {
  if (typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_brightness.value', { error_signal: toString(value) }));
  }
  try {
    const { red, green, blue } = parseToRgb(value);
    const brightness = (red * 299 + green * 587 + blue * 114) / 1000;
    return brightness;
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_brightness.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.dev/api/liquid/filters/color-filters#color_brightness
 */
export const color_brightness = (liquid: string) => {
  return liquid;
};
