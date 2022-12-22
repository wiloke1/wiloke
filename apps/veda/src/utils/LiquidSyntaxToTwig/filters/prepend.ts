import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

window.Twig.extendFilter('prepend', (value, args) => {
  if (!args) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.prepend.params', { error_signal: toString(args) }));
  }
  if (typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.prepend.value', { error_signal: toString(value) }));
  }
  const [str] = args;
  try {
    return str + value;
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.prepend.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.github.io/liquid/filters/prepend/
 */
export const prepend = (liquid: string) => liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'prepend', twigFilterName: 'prepend' });
