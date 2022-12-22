import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';

window.Twig.extendFilter('font_modify', () => {
  throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.font_modify'));
});

/**
 * TODO: Chưa làm được cái này
 * @link https://shopify.dev/api/liquid/filters/font-filters#font_modify
 */
export const font_modify = (liquid: string) => liquid;
