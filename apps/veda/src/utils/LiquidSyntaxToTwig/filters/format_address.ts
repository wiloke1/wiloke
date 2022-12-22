import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';

window.Twig.extendFilter('format_address', () => {
  throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.format_address'));
});

/**
 * TODO: Chưa làm được cái này
 * @link https://shopify.dev/api/liquid/filters/additional-filters#format_address
 */
export const format_address = (liquid: string) => liquid;
