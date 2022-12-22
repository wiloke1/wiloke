import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';

window.Twig.extendFilter('font_face', () => {
  throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.font_face'));
});

/**
 * TODO: Chưa làm được cái này
 * @link https://shopify.dev/api/liquid/filters/font-filters#font_face
 */
export const font_face = (liquid: string) => liquid;
