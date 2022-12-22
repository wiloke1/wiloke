import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { toString } from '../utils/toString';

const PRIMITIVE_TYPE = ['string', 'number', 'boolean'];

window.Twig.extendFilter('uniq', value => {
  if (!Array.isArray(value) || (Array.isArray(value) && !value.every(item => PRIMITIVE_TYPE.includes(typeof item)))) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.uniq.value', { error_signal: toString(value) }));
  }
  try {
    const _value = Array.from(new Set(value));
    return _value;
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.uniq.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.github.io/liquid/filters/uniq/
 */
export const uniq = (liquid: string) => {
  return liquid;
};
