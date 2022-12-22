import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

window.Twig.extendFilter('plus', (value, args) => {
  if (!args) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.plus.params', { error_signal: toString(args) }));
  }
  const [number2] = args;
  const _number2 = Number(number2);
  const _number1 = Number(value);
  if (isNaN(_number1)) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.plus.value', { error_signal: toString(value) }));
  }
  if (isNaN(_number1)) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.plus.number2', { error_signal: toString(number2) }));
  }
  try {
    return _number1 + _number2;
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.plus.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.github.io/liquid/filters/plus/
 */
export const plus = (liquid: string) => liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'plus', twigFilterName: 'plus' });
