import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import Color from '../libraries/color';
import { toString } from '../utils/toString';

window.Twig.extendFilter('color_to_hex', value => {
  if (typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_to_hex.value', { error_signal: toString(value) }));
  }
  const color = Color(value);
  try {
    return color.hex();
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_to_hex.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.dev/api/liquid/filters/color-filters#color_to_hex
 */
export const color_to_hex = (liquid: string) => {
  return liquid;
};
