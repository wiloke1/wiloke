import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import Color from '../libraries/color';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

const domainValues = [0, 100];

window.Twig.extendFilter('color_mix', (value, args) => {
  if (!args) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_mix.params', { error_signal: toString(args) }));
  }
  const [_colorValue, weightValue] = args;
  const _weightValue = Number(weightValue);

  if (typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_mix.value', { error_signal: toString(value) }));
  }
  if (typeof _colorValue !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_mix.colorValue', { error_signal: toString(_colorValue) }));
  }
  if (isNaN(_weightValue)) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_mix.weightValue', { error_signal: toString(weightValue) }));
  }

  const color = Color(value);
  if (_weightValue < domainValues[0] || _weightValue > domainValues[1]) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_mix.weightDomain', { error_signal: toString(weightValue) }));
  }
  try {
    return color.mix(Color(_colorValue), _weightValue / 100).toString();
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_mix.example', { message: toString(err) }));
  }
});

/**
 * FIXME: Định dạng color đang không trả giống với shopify. Liệu điều này có ổn ?????
 * @link https://shopify.dev/api/liquid/filters/color-filters#color_mix
 */
export const color_mix = (liquid: string) =>
  liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'color_mix', twigFilterName: 'color_mix' });
