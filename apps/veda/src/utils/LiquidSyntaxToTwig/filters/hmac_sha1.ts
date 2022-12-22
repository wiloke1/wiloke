import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';

window.Twig.extendFilter('hmac_sha1', () => {
  throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.hmac_sha1'));
});

/**
 * TODO: Chưa làm cái này vì nom có vẻ không cần thiết và nếu làm thì phải cài thêm thư viện
 * @link https://shopify.dev/api/liquid/filters/string-filters#hmac_sha1
 */
export const hmac_sha1 = (liquid: string) => liquid;
