import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';

window.Twig.extendFilter('highlight', () => {
  throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.highlight'));
});

/**
 * TODO: Chưa làm được cái này
 * @link https://shopify.dev/api/liquid/filters/additional-filters#highlight
 */
export const highlight = (liquid: string) => liquid;
