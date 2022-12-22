import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

const PRIMITIVE_TYPE = ['string', 'number', 'boolean'];

window.Twig.extendFilter('sort_natural', (value, args) => {
  if (!Array.isArray(value)) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.sort_natural.value', { error_signal: toString(value) }));
  }
  const isArrayPrimitive = value.every(item => PRIMITIVE_TYPE.includes(typeof item));
  const isArrayObject = value.every(item => typeof item === 'object');
  if (!isArrayObject && !isArrayPrimitive) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.sort_natural.value', { error_signal: toString(value) }));
  }
  if (isArrayObject && !args) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.sort_natural.value', { error_signal: toString(args) }));
  }
  try {
    if (isArrayObject && args) {
      const [fieldName] = args;
      return value.sort((item1, item2) => {
        const item1FieldValue: any = item1[fieldName];
        const item2FieldValue: any = item2[fieldName];
        if (typeof item1FieldValue !== 'string' || typeof item2FieldValue !== 'string') {
          return 0;
        }
        return item1FieldValue.toLowerCase().localeCompare(item2FieldValue.toLowerCase());
      });
    }
    return value.sort();
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.sort_natural.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.github.io/liquid/filters/sort_natural/
 */
export const sort_natural = (liquid: string) => {
  return liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'sort_natural', twigFilterName: 'sort_natural' });
};
