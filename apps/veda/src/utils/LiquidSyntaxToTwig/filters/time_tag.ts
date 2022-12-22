import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';

window.Twig.extendFilter('time_tag', () => {
  throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.time_tag'));
});

/**
 * TODO: Trông có vẻ làm được nhưng có thực sự cần thiết???
 * @link https://shopify.dev/api/liquid/filters/html-filters#time_tag
 */
export const time_tag = (liquid: string) => liquid;
