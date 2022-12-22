import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { toString } from '../utils/toString';

window.Twig.extendFilter('base64_url_safe_encode', value => {
  if (typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.base64_url_safe_encode.value', { error_signal: toString(value) }));
  }
  try {
    return btoa(value)
      .replace(/\+/g, '-') // Convert '+' to '-'
      .replace(/\//g, '_') // Convert '/' to '_'
      .replace(/=+$/, ''); // Remove ending '=';
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.base64_url_safe_encode.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.dev/api/liquid/filters/string-filters#base64_url_safe_encode
 */
export const base64_url_safe_encode = (liquid: string) => liquid;
