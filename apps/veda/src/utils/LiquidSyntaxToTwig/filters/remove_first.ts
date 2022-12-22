import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

window.Twig.extendFilter('remove_first', (value, args) => {
  if (!args) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.remove_first.params', { error_signal: toString(args) }));
  }
  const [substr] = args;
  if (typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.remove_first.value', { error_signal: toString(value) }));
  }
  try {
    return value.replace(substr, '');
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.remove_first.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.github.io/liquid/filters/remove_first/
 */
export const remove_first = (liquid: string) =>
  liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'remove_first', twigFilterName: 'remove_first' });
