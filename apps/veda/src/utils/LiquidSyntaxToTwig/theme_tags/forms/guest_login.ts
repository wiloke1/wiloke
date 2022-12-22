import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../../Error';
import { toString } from '../../utils/toString';
import { handleFormAttributes, handlePreprocess } from './.utils';

/**
 * @link https://shopify.dev/api/liquid/tags/theme-tags#form
 * @requires Với liquid đầu vào các tag form: {% form ... %} bắt buộc phải nằm trên 1 dòng mới có thể regex được
 */
export const guest_login = (liquid: string) => {
  return liquid.replace(/{%\s*form.*guest_login.*%}/gm, BOC => {
    const _BOC = handlePreprocess(BOC);
    return _BOC.replace(/{%\s*form.*guest_login.*%}/, value => {
      const form = handleFormAttributes({
        onException: err => {
          return new LiquidSyntaxToTwigError(i18n.t('twig_error.theme_tags.forms.guest_login', { error_signal: toString(err) }));
        },
        lineOfCodeOpenTagForm: value,
        additionAttributes: {
          method: 'post',
          action: '/account/login',
          'accept-charset': 'UTF-8',
          id: 'customer_login_guest',
        },
      });
      return `
      ${form.outerHTML.replace('</form>', '')}
      <input type="hidden" value="guest_login" name="form_type">
      <input type="hidden" name="utf8" value="✓">
      <input type="hidden" name="guest" value="true">
      <input type="hidden" name="checkout_url" value="https://checkout.shopify.com/store-id/checkouts/session-id?step=contact_information">
      `;
    });
  });
};
