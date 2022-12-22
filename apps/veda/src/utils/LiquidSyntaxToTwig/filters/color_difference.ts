import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';

window.Twig.extendFilter('color_difference', () => {
  throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_difference'));
});

/**
 * TODO: Có thể làm cái này bằng https://www.npmjs.com/package/colorizr hoặc https://www.npmjs.com/package/color-difference nhưng có lẽ là chưa cần thiết
 * @link https://shopify.dev/api/liquid/filters/color-filters#color_difference
 */
export const color_difference = (liquid: string) => liquid;
