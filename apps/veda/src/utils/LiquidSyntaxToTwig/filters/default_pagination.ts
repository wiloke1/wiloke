import { i18n } from 'translation';
import { _Paginate, _Part } from '../objects';
import { LiquidSyntaxToTwigError } from '../Error';
import { toString } from '../utils/toString';

window.Twig.extendFilter('default_pagination', value => {
  try {
    if (!value || typeof value !== 'object') {
      return '';
    }

    const { parts, page_size } = value as _Paginate;

    const result = parts.map(part => {
      const { is_link, title, url } = part as _Part;
      if (is_link) {
        return `<span class="page"><a href="${url}" title="">${title}</a></span>`;
      }
      if (typeof title === 'number') {
        return `<span class="page current">${title}</span>`;
      }
      return `<span class="deco">${title}</span>`;
    });
    if (page_size > 1) {
      result.push(`<span class="next"><a href="/services/liquid_rendering/resource?page=2" title="">Next &raquo;</a></span>`);
    }

    return result.join(' ');
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.default_pagination.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.dev/api/liquid/filters/additional-filters#default_pagination
 */
export const default_pagination = (liquid: string) => liquid;
