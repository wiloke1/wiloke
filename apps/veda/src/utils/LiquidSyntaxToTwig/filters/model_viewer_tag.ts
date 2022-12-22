import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';

window.Twig.extendFilter('model_viewer_tag', () => {
  throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.model_viewer_tag'));
});

/**
 * TODO: Chưa làm được cái này nhưng nhìn có lẽ là khả thi để làm được
 * @link https://shopify.dev/api/liquid/filters/media-filters#model_viewer_tag
 */
export const model_viewer_tag = (liquid: string) => liquid;
