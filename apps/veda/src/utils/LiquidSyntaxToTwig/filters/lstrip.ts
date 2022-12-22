import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { toString } from '../utils/toString';

window.Twig.extendFilter('lstrip', value => {
  if (typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.lstrip.value', { error_signal: toString(value) }));
  }
  try {
    return value.replace(/^\s+/, '');
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.lstrip.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.github.io/liquid/filters/lstrip/
 */
export const lstrip = (liquid: string) => liquid;
