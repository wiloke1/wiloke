import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

window.Twig.extendFilter('link_to_vendor', (value, args) => {
  if (args && (!Array.isArray(args) || args.length <= 1)) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.link_to_vendor.params', { error_signal: toString(args) }));
  }
  if (typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.link_to_vendor.value', { error_signal: toString(value) }));
  }
  try {
    let attributes = {};
    const _args = Array.isArray(args) ? args : [];
    for (let i = 1; i < _args.length; i += 2) {
      const attributeName = _args[i].key;
      const attributeValue = _args[i + 1];
      if (!attributeName || !attributeValue) {
        throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.link_to_vendor.params_invalid', { error_signal: toString(args) }));
      }
      attributes = { ...attributes, [attributeName]: attributeValue };
    }
    const aElement = document.createElement('a');
    Object.entries(attributes).forEach(([attributeName, attributeValue]) => aElement.setAttribute(attributeName, `${attributeValue}`));
    aElement.setAttribute('href', `/collections/vendors?q=${value}`);
    aElement.innerHTML = value;
    aElement.setAttribute('title', value);
    return aElement.outerHTML;
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.link_to_vendor.example', { message: toString(err) }));
  }
});

/**
 * TODO: Không chắc chắn chính xác và có lẽ là không cần thiết
 * @link https://shopify.dev/api/liquid/filters/url-filters#link_to_vendor
 */
export const link_to_vendor = (liquid: string) =>
  liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'link_to_vendor', twigFilterName: 'link_to_vendor' });
