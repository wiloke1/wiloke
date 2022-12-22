import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

window.Twig.extendFilter('divided_by', (value, args) => {
  if (!args) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.divided_by.params', { error_signal: toString(args) }));
  }
  const [divisor] = args;
  const _divisor = Number(divisor);
  const _dividend = Number(value);
  if (isNaN(_divisor)) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.divided_by.divisor', { error_signal: toString(divisor) }));
  }
  if (isNaN(_dividend)) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.divided_by.value', { error_signal: toString(value) }));
  }
  try {
    return _dividend / _divisor;
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.divided_by.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.github.io/liquid/filters/divided_by/
 */
export const divided_by = (liquid: string) =>
  liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'divided_by', twigFilterName: 'divided_by' });
