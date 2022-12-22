import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';

window.Twig.extendFilter('metafield_text', () => {
  throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.metafield_text'));
});

/**
 * TODO: Chưa làm được cái này nhưng nhìn có lẽ là khả thi để làm được
 * @link https://shopify.dev/api/liquid/filters/media-filters#media_text
 */
export const metafield_text = (liquid: string) => liquid;
