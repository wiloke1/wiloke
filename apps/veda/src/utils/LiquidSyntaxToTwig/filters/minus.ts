import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

window.Twig.extendFilter('minus', (value, args) => {
  if (!args) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.minus.params', { error_signal: toString(args) }));
  }
  const [minus_number] = args;
  const _minus_number = Number(minus_number);
  const _subtrahend = Number(value);
  if (isNaN(_subtrahend)) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.minus.value', { error_signal: toString(value) }));
  }
  if (isNaN(_minus_number)) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.minus.minus_number', { error_signal: toString(minus_number) }));
  }
  try {
    return _subtrahend - _minus_number;
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.minus.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.github.io/liquid/filters/minus/
 */
export const minus = (liquid: string) => liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'minus', twigFilterName: 'minus' });
