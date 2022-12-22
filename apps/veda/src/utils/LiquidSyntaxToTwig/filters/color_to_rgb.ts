import { parseToRgb } from 'polished';
import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { toString } from '../utils/toString';

window.Twig.extendFilter('color_to_rgb', value => {
  if (typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_to_rgb.value', { error_signal: toString(value) }));
  }
  const { red, green, blue } = parseToRgb(value);
  try {
    return `rgb(${red}, ${green}, ${blue})`;
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_to_rgb.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.dev/api/liquid/filters/color-filters#color_to_rgb
 */
export const color_to_rgb = (liquid: string) => {
  return liquid;
};
