import { lighten } from 'polished';
import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

window.Twig.extendFilter('color_lighten', (value, args) => {
  if (!args) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_lighten.params', { error_signal: toString(args) }));
  }
  const [lightenValue] = args;
  const _lightenValue = Number(lightenValue);

  if (typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_lighten.value', { error_signal: toString(value) }));
  }
  if (isNaN(_lightenValue)) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_lighten.lightenValue', { error_signal: toString(lightenValue) }));
  }
  try {
    return lighten(_lightenValue / 100, value);
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_lighten.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.dev/api/liquid/filters/color-filters#color_lighten
 */
export const color_lighten = (liquid: string) =>
  liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'color_lighten', twigFilterName: 'color_lighten' });
