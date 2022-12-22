import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';

window.Twig.extendFilter('stylesheet_tag', () => {
  throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.stylesheet_tag'));
});

/**
 * @link https://shopify.dev/api/liquid/filters/html-filters#stylesheet_tag
 */
// TODO: Chưa làm được cái này vì:
// 1. server không trả về được vì không có cái gì để bắn lên cho server biết
// 2. với FE thì không thể tự sinh đường dẫn vì version của file được sinh ngẫu nhiên chứ không theo 1 quy luật nào cả
export const stylesheet_tag = (liquid: string) => liquid;
