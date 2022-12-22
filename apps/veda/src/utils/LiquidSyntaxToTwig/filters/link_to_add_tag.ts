import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

const COLLECTION_HANDLE = 'frontpage';

window.Twig.extendFilter('link_to_add_tag', (value, args) => {
  if (!args) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.link_to_add_tag.params', { error_signal: toString(args) }));
  }
  if (typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.link_to_add_tag.value', { error_signal: toString(value) }));
  }
  try {
    const currentTag = location.pathname.includes(`/collections/${COLLECTION_HANDLE}/`)
      ? location.pathname.replace(`/collections/${COLLECTION_HANDLE}/`, '')
      : '';
    const [tag] = args;
    let attributes = {};
    for (let i = 1; i < args.length; i += 2) {
      const attributeName = args[i].key;
      const attributeValue = args[i + 1];
      if (!attributeName || !attributeValue) {
        throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.link_to_add_tag.params_invalid', { error_signal: toString(args) }));
      }
      attributes = { ...attributes, [attributeName]: attributeValue };
    }
    const aElement = document.createElement('a');
    Object.entries(attributes).forEach(([attributeName, attributeValue]) => aElement.setAttribute(attributeName, `${attributeValue}`));
    aElement.setAttribute('href', `/collections/${COLLECTION_HANDLE}/${currentTag ? [currentTag, tag].join('+') : tag}`.toLowerCase());
    aElement.setAttribute('title', `Show products matching tag ${tag}`);
    aElement.innerHTML = value;
    return aElement.outerHTML;
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.link_to_add_tag.example', { message: toString(err) }));
  }
});

/**
 * TODO: Chưa chính xác và có lẽ là không cần thiết
 * @link https://shopify.dev/api/liquid/filters/url-filters#link_to_add_tag
 */
export const link_to_add_tag = (liquid: string) =>
  liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'link_to_add_tag', twigFilterName: 'link_to_add_tag' });
