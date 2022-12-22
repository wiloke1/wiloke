import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';

window.Twig.extendFilter('shopify_asset_url', () => {
  throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.shopify_asset_url'));
});

/**
 * TODO: Chưa làm được cái này
 * @link https://shopify.dev/api/liquid/filters/url-filters#shopify_asset_url
 */
export const shopify_asset_url = (liquid: string) => liquid;
