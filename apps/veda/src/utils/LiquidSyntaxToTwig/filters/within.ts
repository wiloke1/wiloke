import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { Collection } from '../objects';
import { NonEmptyValue } from '../objects/@utils';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

window.Twig.extendFilter('within', (value, args) => {
  if (!args || (args && !args[0])) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.within.params', { error_signal: toString(args) }));
  }
  if (typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.within.value', { error_signal: toString(value) }));
  }
  try {
    const [collection] = args as [NonEmptyValue<Collection>];
    return collection.url?.concat(value);
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.within.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.dev/api/liquid/filters/url-filters#within
 */
export const within = (liquid: string) => {
  return liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'within', twigFilterName: 'within' });
};
