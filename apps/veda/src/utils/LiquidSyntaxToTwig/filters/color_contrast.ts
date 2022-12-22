import { getContrast } from 'polished';
import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

window.Twig.extendFilter('color_contrast', (value, args) => {
  if (!args) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_contrast.params', { error_signal: toString(args) }));
  }
  const [_color] = args;
  if (typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_contrast.value', { error_signal: toString(value) }));
  }
  if (typeof _color !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_contrast.color', { error_signal: toString(_color) }));
  }
  try {
    return getContrast(value, _color);
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_contrast.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.dev/api/liquid/filters/color-filters#color_contrast
 * @example {{ '#495859' | color_contrast: '#fffffb' }}
 */
export const color_contrast = (liquid: string) =>
  liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'color_contrast', twigFilterName: 'color_contrast' });
