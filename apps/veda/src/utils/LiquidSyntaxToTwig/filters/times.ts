import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

window.Twig.extendFilter('times', (value, args) => {
  if (!args) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.times.params', { error_signal: toString(args) }));
  }
  const [factor2] = args;
  const _factor2 = Number(factor2);
  const _factor1 = Number(value);
  if (isNaN(_factor1)) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.times.value', { error_signal: toString(value) }));
  }
  if (isNaN(_factor2)) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.times.factor', { error_signal: toString(factor2) }));
  }
  try {
    return _factor1 * _factor2;
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.times.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.github.io/liquid/filters/times/
 */
export const times = (liquid: string) => liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'times', twigFilterName: 'times' });
