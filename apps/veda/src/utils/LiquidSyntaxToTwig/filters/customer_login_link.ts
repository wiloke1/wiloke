import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { toString } from '../utils/toString';

window.Twig.extendFilter('customer_login_link', value => {
  if (typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.customer_login_link.value', { error_signal: toString(value) }));
  }
  try {
    return `<a href="/account/login" id="customer_login_link">${value}</a>`;
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.customer_login_link.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.dev/api/liquid/filters/url-filters#customer_login_link
 */
export const customer_login_link = (liquid: string) => {
  return liquid;
};
