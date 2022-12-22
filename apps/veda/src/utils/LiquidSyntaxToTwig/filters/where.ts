import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

window.Twig.extendFilter('where', (value, args) => {
  if (!args) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.where.params', { error_signal: toString(args) }));
  }
  const [property, objectPropertyValue] = args;
  if (!property) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.where.property', { error_signal: toString(property) }));
  }
  if (!Array.isArray(value)) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.where.value', { error_signal: toString(value) }));
  }
  if (!!property && typeof value[0] === 'object' && !value[0].hasOwnProperty(property)) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.where.property_non_exist', { error_signal: toString(property) }));
  }
  try {
    const _value = value.filter(item => (objectPropertyValue ? item[property] === objectPropertyValue : !!item[property]));
    return _value;
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.where.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.github.io/liquid/filters/where/
 */
export const where = (liquid: string) => liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'where', twigFilterName: 'where' });
