import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';

window.Twig.extendFilter('external_video_tag', () => {
  throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.external_video_tag'));
});

/**
 * TODO: Chưa làm được cái này nhưng nhìn có lẽ là khả thi để làm được
 * @link https://shopify.dev/api/liquid/filters/media-filters#external_video_tag
 */
export const external_video_tag = (liquid: string) => liquid;
