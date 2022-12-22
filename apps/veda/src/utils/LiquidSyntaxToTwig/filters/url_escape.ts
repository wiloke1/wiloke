import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { toString } from '../utils/toString';

window.Twig.extendFilter('url_escape', value => {
  if (typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.url_escape.value', { error_signal: toString(value) }));
  }
  try {
    return window.encodeURIComponent(value);
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.url_escape.example', { message: toString(err) }));
  }
});

/**
 {{ '<hello> & <shopify>' | url_escape }}
 */

/**
 * @link https://shopify.dev/api/liquid/filters/string-filters#url_escape
 */
export const url_escape = (liquid: string) => liquid;
