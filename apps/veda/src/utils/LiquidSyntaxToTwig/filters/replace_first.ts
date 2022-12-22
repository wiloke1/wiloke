import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

window.Twig.extendFilter('replace_first', (value, args) => {
  if (!args) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.replace_first.params', { error_signal: toString(args) }));
  }
  const [substr, replacer] = args;
  if (typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.replace_first.value', { error_signal: toString(value) }));
  }
  try {
    return value.replace(substr, replacer);
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.replace_first.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.github.io/liquid/filters/replace_first/
 */
export const replace_first = (liquid: string) =>
  liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'replace_first', twigFilterName: 'replace_first' });
