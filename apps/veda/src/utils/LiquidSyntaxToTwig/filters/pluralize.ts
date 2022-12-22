import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

window.Twig.extendFilter('pluralize', (value, args) => {
  if (!args) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.pluralize.params', { error_signal: toString(args) }));
  }
  const _value = Number(value);
  const [singular, plural] = args;
  if (isNaN(_value)) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.pluralize.value', { error_signal: toString(value) }));
  }
  if (!singular) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.pluralize.singular', { error_signal: toString(singular) }));
  }
  if (!plural) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.pluralize.plural', { error_signal: toString(plural) }));
  }
  try {
    return _value >= 2 ? plural : singular;
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.pluralize.example', { message: toString(err) }));
  }
});

/**
 ```
 ts{{ cart.item_count }}
 {{ cart.item_count | pluralize: 'item', 'items' }}
 ```
 */

/**
 * @link https://shopify.dev/api/liquid/filters/string-filters#pluralize
 */
export const pluralize = (liquid: string) =>
  liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'pluralize', twigFilterName: 'pluralize' });
