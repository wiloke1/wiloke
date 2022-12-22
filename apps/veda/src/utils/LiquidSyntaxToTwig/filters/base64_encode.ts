import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { toString } from '../utils/toString';

window.Twig.extendFilter('base64_encode', value => {
  if (typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.base64_encode.value', { error_signal: toString(value) }));
  }
  try {
    return btoa(value);
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.base64_encode.example', { message: toString(err) }));
  }
});
/**
 * @link https://shopify.dev/api/liquid/filters/string-filters#base64_encode
 * @example
 * {{ 'one two three' | base64_encode }} -> Expect: b25lIHR3byB0aHJlZQ==
 */
export const base64_encode = (liquid: string) => liquid;
