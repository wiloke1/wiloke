import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

window.Twig.extendFilter('sort_by', (value, args) => {
  if (!args) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.sort_by.params', { error_signal: toString(args) }));
  }
  const [sort_by] = args;
  if (typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.sort_by.value', { error_signal: toString(value) }));
  }

  try {
    return value.concat(`?sort_by=${sort_by}`);
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.sort_by.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.dev/api/liquid/filters/url-filters#sort_by
 */
export const sort_by = (liquid: string) => liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'sort_by', twigFilterName: 'sort_by' });
