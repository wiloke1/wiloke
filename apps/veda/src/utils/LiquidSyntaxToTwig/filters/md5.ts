import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';

window.Twig.extendFilter('md5', () => {
  throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.md5'));
});

/**
 * TODO: Chưa làm cái này vì nom có vẻ không cần thiết và nếu làm thì phải cài thêm thư viện
 * @link https://shopify.dev/api/liquid/filters/string-filters#md5
 */
export const md5 = (liquid: string) => liquid;
