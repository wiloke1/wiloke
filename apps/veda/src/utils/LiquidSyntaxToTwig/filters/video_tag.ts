import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';

window.Twig.extendFilter('video_tag', () => {
  throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.video_tag'));
});
/**
 * TODO: Chưa làm được cái này nhưng nhìn có lẽ là khả thi để làm được
 * @link https://shopify.dev/api/liquid/filters/media-filters#video_tag
 */
export const video_tag = (liquid: string) => liquid;
