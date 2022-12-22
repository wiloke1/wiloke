import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';

window.Twig.extendFilter('global_asset_url', () => {
  throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.global_asset_url'));
});

/**
 * TODO: Chưa làm được cái này
 * @link https://shopify.dev/api/liquid/filters/url-filters#global_asset_url
 */
export const global_asset_url = (liquid: string) => liquid;
