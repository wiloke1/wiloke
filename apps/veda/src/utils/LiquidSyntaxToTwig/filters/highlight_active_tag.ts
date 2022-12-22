import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';

window.Twig.extendFilter('highlight_active_tag', () => {
  throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.highlight_active_tag'));
});

/**
 * TODO: Chưa làm được cái này
 * @link https://shopify.dev/api/liquid/filters/additional-filters#highlight_active_tag
 */
export const highlight_active_tag = (liquid: string) => liquid;
