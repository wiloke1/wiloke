import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

const PRIMITIVE_TYPE = ['string', 'number', 'boolean'];

window.Twig.extendFilter('my_slice', (value, args) => {
  if (!args) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.slice.params', { error_signal: toString(args) }));
  }
  const [from, to = from + 1] = args;
  const _from = Number(from);
  const _to = Number(to);
  if (isNaN(_from)) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.slice.from', { error_signal: toString(from) }));
  }
  if (isNaN(_to)) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.slice.to', { error_signal: toString(to) }));
  }
  if (!Array.isArray(value) && typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.slice.value', { error_signal: toString(value) }));
  }
  if (Array.isArray(value) && !value.every(item => PRIMITIVE_TYPE.includes(typeof item))) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.slice.value', { error_signal: toString(value) }));
  }
  try {
    return value.slice(from, to);
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.slice.example', { message: toString(err) }));
  }
});
/**
 */

/**
 *  @link https://shopify.github.io/liquid/filters/slice/
 */
export const slice = (liquid: string) => liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'slice', twigFilterName: 'my_slice' });
