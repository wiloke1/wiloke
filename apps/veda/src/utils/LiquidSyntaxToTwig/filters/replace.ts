import { i18n } from 'translation';
import strToRegexpPattern from 'utils/functions/strToRegexpPattern';
import { LiquidSyntaxToTwigError } from '../Error';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

window.Twig.extendFilter('my_replace', (value, args) => {
  if (!args) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.replace.params', { error_signal: toString(args) }));
  }
  const [substr, replacer] = args;
  if (typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.replace.value', { error_signal: toString(value) }));
  }
  try {
    return value.replace(new RegExp(strToRegexpPattern(substr), 'g'), replacer);
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.replace.example', { message: toString(err) }));
  }
});
/**
 * @link https://shopify.github.io/liquid/filters/replace/
 */
export const replace = (liquid: string) =>
  liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'replace', twigFilterName: 'my_replace' });
