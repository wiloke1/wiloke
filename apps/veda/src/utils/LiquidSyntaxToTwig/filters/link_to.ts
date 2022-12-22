import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

window.Twig.extendFilter('link_to', (value, args) => {
  if (!args) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.link_to.params', { error_signal: toString(args) }));
  }
  if (typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.link_to.value', { error_signal: toString(value) }));
  }
  try {
    const [link_to] = args;
    let attributes = {};
    for (let i = 1; i < args.length; i += 2) {
      const attributeName = args[i].key;
      const attributeValue = args[i + 1];
      if (!attributeName || !attributeValue) {
        throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.link_to.params_invalid', { error_signal: toString(args) }));
      }
      attributes = { ...attributes, [attributeName]: attributeValue };
    }
    const aElement = document.createElement('a');
    Object.entries(attributes).forEach(([attributeName, attributeValue]) => aElement.setAttribute(attributeName, `${attributeValue}`));
    aElement.setAttribute('href', link_to);
    aElement.innerHTML = value;
    return aElement.outerHTML;
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.link_to.example', { message: toString(err) }));
  }
});

/**
 * TODO: Không chắc chắn chính xác và có lẽ là không cần thiết
 * @link https://shopify.dev/api/liquid/filters/url-filters#link_to
 */
export const link_to = (liquid: string) => liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'link_to', twigFilterName: 'link_to' });
