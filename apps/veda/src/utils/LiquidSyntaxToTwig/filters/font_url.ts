import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';

window.Twig.extendFilter('font_url', () => {
  throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.font_url'));
});

/**
 * TODO: Chưa làm được cái này
 * @link https://shopify.dev/api/liquid/filters/font-filters#font_url
 */
export const font_url = (liquid: string) => liquid;
