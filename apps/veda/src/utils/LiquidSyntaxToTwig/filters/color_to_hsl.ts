import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import Color from '../libraries/color';
import { toString } from '../utils/toString';

window.Twig.extendFilter('color_to_hsl', value => {
  if (typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_to_hsl.value', { error_signal: toString(value) }));
  }
  const color = Color(value);
  try {
    return color.hsl().toString();
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_to_hsl.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.dev/api/liquid/filters/color-filters#color_to_hsl
 */
export const color_to_hsl = (liquid: string) => {
  return liquid;
};
