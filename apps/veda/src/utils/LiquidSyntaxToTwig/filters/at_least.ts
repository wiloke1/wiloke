import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

window.Twig.extendFilter('at_least', (value, args) => {
  if (!args) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.at_least.params', { error_signal: toString(args) }));
  }
  const [min] = args;
  let min_ = Number(min);
  let value_ = Number(value);
  if (isNaN(min_)) {
    min_ = 0;
  }
  if (isNaN(value_)) {
    value_ = 0;
  }
  try {
    return value_ < min_ ? min_ : value_;
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.at_least.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.github.io/liquid/filters/at_least/
 */
export const at_least = (liquid: string) =>
  liquidFilterParamsToTwigFilterParams({
    liquid,
    liquidFilterName: 'at_least',
    twigFilterName: 'at_least',
  });
