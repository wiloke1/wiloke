import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

const PRIMITIVE_TYPE = ['string', 'number', 'boolean'];

window.Twig.extendFilter('sort', (value, args) => {
  const property = args ? args[0] : undefined;
  if (!Array.isArray(value)) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.sort.value', { error_signal: toString(value) }));
  }
  const isArrayPrimitive = value.every(item => PRIMITIVE_TYPE.includes(typeof item));
  const isArrayObject = value.every(item => typeof item === 'object');
  if (!isArrayObject && !isArrayPrimitive) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.sort.value', { error_signal: toString(value) }));
  }
  if (isArrayObject && !args) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.sort.value', { error_signal: toString(args) }));
  }
  if (!!property && typeof value[0] === 'object' && !value[0].hasOwnProperty(property)) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.sort.property_non_exist'));
  }
  try {
    if (property) {
      return value.sort((a, b) => {
        return a[property] - b[property];
      });
    }
    return value.sort((a, b) => a - b);
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.sort.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.github.io/liquid/filters/sort/
 */
export const sort = (liquid: string) => liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'sort', twigFilterName: 'sort' });
