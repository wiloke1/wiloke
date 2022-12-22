import { i18n } from 'translation';

window.Twig.extend(Twig => {
  Twig.exports.extendTag({
    type: 'include',
    regex: /include/,
    next: [],
    open: true,
    compile: function(token: any) {
      return token;
    },
    parse: function() {
      return {
        output: `<span style='color: red; font-size: 18px'>${i18n.t('twig_error.deprecated_tags.include')}</span>`,
        chain: false,
      };
    },
  });
});

/**
 * TODO: Có thể làm được bằng cách server sẽ đọc file trên shopify và trả về content file để thế vào. NHỮNG cái này là không cần thiết và nó cũng không dễ dàng
 * @link https://shopify.dev/api/liquid/tags/deprecated-tags#include
 */
export const include = (liquid: string) => liquid;
