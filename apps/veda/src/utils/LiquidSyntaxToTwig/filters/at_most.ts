import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

window.Twig.extendFilter('at_most', (value, args) => {
  if (!args) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.at_most.params', { error_signal: toString(args) }));
  }
  const [max] = args;
  let max_ = Number(max);
  let value_ = Number(value);
  if (isNaN(max_)) {
    max_ = 0;
  }
  if (isNaN(value_)) {
    value_ = 0;
  }
  try {
    return value_ > max_ ? max_ : value_;
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.at_most.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.github.io/liquid/filters/at_most/
 */
export const at_most = (liquid: string) => liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'at_most', twigFilterName: 'at_most' });
