import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';

window.Twig.extendFilter('metafield_tag', () => {
  throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.metafield_tag'));
});

/**
 * TODO: Trông có vẻ làm được nhưng có thực sự cần thiết???
 * @link https://shopify.dev/api/liquid/filters/metafield-filters#metafield_tag
 */
export const metafield_tag = (liquid: string) => liquid;
