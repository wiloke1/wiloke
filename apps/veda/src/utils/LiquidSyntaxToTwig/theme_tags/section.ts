import { i18n } from 'translation';

window.Twig.extend(Twig => {
  Twig.exports.extendTag({
    type: 'section',
    regex: /section/,
    next: [],
    open: true,
    compile: function(token: any) {
      return token;
    },
    parse: function() {
      return {
        output: `<span style='color: red; font-size: 18px'>${i18n.t('twig_error.theme_tags.section')}</span>`,
        chain: false,
      };
    },
  });
});
/**
 * TODO: Có thể làm được bằng cách lấy về content file r thế vào (lưu ý cần lưu lại những file đã request) nhưng liệu có cần thiết và vì phải đợi request nên lần đầu vào app sẽ lâu hơn
 * @link https://shopify.dev/api/liquid/tags/theme-tags#section
 */
export const section = (liquid: string) => liquid;
