import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { toString } from '../utils/toString';

window.Twig.extendFilter('rstrip', value => {
  if (typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.rstrip.value', { error_signal: toString(value) }));
  }
  try {
    return value.replace(/~+$/, '');
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.rstrip.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.github.io/liquid/filters/rstrip/
 */
export const rstrip = (liquid: string) => liquid;
