import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

window.Twig.extendFilter('map', (value, args) => {
  if (!args) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.map.params', { error_signal: toString(args) }));
  }
  const [property] = args;
  if (!property) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.map.property', { error_signal: toString(property) }));
  }
  if (!Array.isArray(value)) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.map.value', { error_signal: toString(value) }));
  }
  if (!!property && typeof value[0] === 'object' && !value[0].hasOwnProperty(property)) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.map.property_non_exist', { error_signal: toString(property) }));
  }
  try {
    const _value = value.filter(item => !!item[property]).map(item => item[property]);
    return _value as any;
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.map.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.github.io/liquid/filters/map/
 */
export const map = (liquid: string) => liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'map', twigFilterName: 'map' });
