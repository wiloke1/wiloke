import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { toString } from '../utils/toString';

window.Twig.extendFilter('url_for_type', value => {
  if (typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.url_for_type.value', { error_signal: toString(value) }));
  }
  try {
    return '/collections/types?q='.concat(value);
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.url_for_type.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.dev/api/liquid/filters/url-filters#url_for_type
 */
export const url_for_type = (liquid: string) => liquid;
