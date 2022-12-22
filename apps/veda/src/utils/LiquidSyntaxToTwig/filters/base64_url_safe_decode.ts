import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { toString } from '../utils/toString';

window.Twig.extendFilter('base64_url_safe_decode', value => {
  if (typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.base64_url_safe_decode.value', { error_signal: toString(value) }));
  }
  try {
    return atob(value)
      .replace(/\-/g, '+') // Convert '-' to '+'
      .replace(/\_/g, '/'); // Convert '_' to '/'
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.base64_url_safe_decode.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.dev/api/liquid/filters/string-filters#base64_url_safe_decode
 */
export const base64_url_safe_decode = (liquid: string) => liquid;
