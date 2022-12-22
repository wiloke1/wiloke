import { i18n } from 'translation';

window.Twig.extend(Twig => {
  Twig.exports.extendTag({
    type: 'layout',
    regex: /layout/,
    next: [],
    open: true,
    compile: function(token: any) {
      return token;
    },
    parse: function() {
      return {
        output: `<span style='color: red; font-size: 18px'>${i18n.t('twig_error.theme_tags.layout')}</span>`,
        chain: false,
      };
    },
  });
});

/**
 * TODO: có thể làm được KHI VÀ CHỈ KHI
 * 1. BE trả về được file theme đó và file theme đó thoả mãn builder (về syntax)
 * HOẶC chấp nhận lỗi
 * @link https://shopify.dev/api/liquid/tags/theme-tags#layout
 */
export const layout = (liquid: string) => liquid;
