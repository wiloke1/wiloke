import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';

window.Twig.extendFilter('media_tag', () => {
  throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.media_tag'));
});

/**
 * TODO: Chưa làm được cái này nhưng nhìn có lẽ là khả thi để làm được
 * @link https://shopify.dev/api/liquid/filters/media-filters#media_tag
 */
export const media_tag = (liquid: string) => liquid;
