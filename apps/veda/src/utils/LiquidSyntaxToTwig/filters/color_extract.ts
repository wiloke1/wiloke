import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import Color from '../libraries/color';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

const domainValues = ['alpha', 'red', 'green', 'blue', 'hue', 'saturation', 'lightness'];

window.Twig.extendFilter('color_extract', (value, args) => {
  if (!args) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_extract.params', { error_signal: toString(args) }));
  }
  const color = Color(value);
  const [extractValue] = args;
  const _extractValue = extractValue as typeof domainValues[number];
  if (typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_extract.value', { error_signal: toString(value) }));
  }
  if (domainValues.findIndex(item => item === _extractValue) === -1) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_extract.extractValue', { error_signal: toString(extractValue) }));
  }
  try {
    if (_extractValue === 'alpha') {
      return color.alpha();
    }
    if (_extractValue === 'red') {
      return color.red();
    }
    if (_extractValue === 'green') {
      return color.green();
    }
    if (_extractValue === 'blue') {
      return color.blue();
    }
    if (_extractValue === 'hue') {
      return color.hue();
    }
    if (_extractValue === 'saturation') {
      return color.saturationl() * 100;
    }
    if (_extractValue === 'lightness') {
      return color.lightness();
    }
    return i18n.t('twig_error.filters.color_extract.example', { message: '' });
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_extract.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.dev/api/liquid/filters/color-filters#color_extract
 */
export const color_extract = (liquid: string) =>
  liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'color_extract', twigFilterName: 'color_extract' });
