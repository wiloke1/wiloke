import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { toString } from '../utils/toString';

window.Twig.extendFilter('compact', value => {
  if (!Array.isArray(value)) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.compact.value', { error_signal: toString(value) }));
  }
  const _value = value.filter(item => item !== null);
  try {
    return _value;
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.compact.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.github.io/liquid/filters/compact/
 */
export const compact = (liquid: string) => {
  return liquid;
};
