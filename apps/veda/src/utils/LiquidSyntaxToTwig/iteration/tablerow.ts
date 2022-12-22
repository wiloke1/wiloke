import { i18n } from 'translation';

window.Twig.extend(Twig => {
  Twig.exports.extendTag({
    type: 'tablerow',
    regex: /tablerow/,
    next: ['endtablerow'],
    open: true,
    compile: function(token: any) {
      return token;
    },
    parse: function() {
      return {
        output: `<span style='color: red; font-size: 18px'>${i18n.t('twig_error.iteration.tablerow')}</span>`,
        chain: false,
      };
    },
  });

  Twig.exports.extendTag({
    type: 'endtablerow',
    regex: /^endtablerow$/,
    next: [],
    open: false,
  });
});

/**
 * @link https://shopify.github.io/liquid/tags/iteration/
 */
export const tablerow = (liquid: string) => liquid;
