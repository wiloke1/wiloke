import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { toString } from '../utils/toString';

window.Twig.extendFilter('strip_newlines', value => {
  if (typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.strip_newlines.value', { error_signal: toString(value) }));
  }
  try {
    return value.replaceAll('\n', '');
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.strip_newlines.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.github.io/liquid/filters/strip_newlines/
 */
export const strip_newlines = (liquid: string) => liquid;
