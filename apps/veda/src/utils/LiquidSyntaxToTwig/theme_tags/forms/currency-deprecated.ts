import { i18n } from 'translation';

window.Twig.extend(Twig => {
  Twig.exports.extendTag({
    type: 'currency_form',
    regex: /^form\s(\'|\")currency(\'|\")\s+(.+)$/,
    next: ['endform'],
    open: true,
    compile: function(token: any) {
      return token;
    },
    parse: function() {
      return {
        output: `<span style='color: red; font-size: 18px'>${i18n.t('twig_error.deprecated_tags.currency_form')}</span>`,
        chain: false,
      };
    },
  });
  Twig.exports.extendTag({
    type: 'endform',
    regex: /^endform$/,
    next: [],
    open: false,
  });
});

/**
 * @deprecated
 * @link https://shopify.dev/api/liquid/tags/deprecated-tags#the-currency-form
 */
export const currency = (liquid: string) => liquid;
