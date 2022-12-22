import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';

window.Twig.extendFilter('brightness_difference', () => {
  throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.brightness_difference'));
});

/**
 * TODO: Có thể làm cái này bằng https://www.npmjs.com/package/colorizr nhưng có lẽ là chưa cần thiết
 * @link https://shopify.dev/api/liquid/filters/color-filters#brightness_difference
 */
export const brightness_difference = (liquid: string) => liquid;
