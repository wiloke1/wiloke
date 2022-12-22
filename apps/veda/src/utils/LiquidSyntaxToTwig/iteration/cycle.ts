import { i18n } from 'translation';

window.Twig.extend(Twig => {
  Twig.exports.extendTag({
    type: 'cycle',
    regex: /cycle/,
    next: [],
    open: true,
    compile: function(token: any) {
      return token;
    },
    parse: function() {
      return {
        output: `<span style='color: red; font-size: 18px'>${i18n.t('twig_error.iteration.cycle')}</span>`,
        chain: false,
      };
    },
  });
});

/**
 * @link https://shopify.github.io/liquid/tags/iteration/
 */
export const cycle = (liquid: string) => liquid;
