import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { toString } from '../utils/toString';

window.Twig.extendFilter('newline_to_br', value => {
  if (typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.newline_to_br.value', { error_signal: toString(value) }));
  }
  try {
    return value.replaceAll('\n', '<br>');
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.newline_to_br.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.github.io/liquid/filters/newline_to_br/
 */
export const newline_to_br = (liquid: string) => liquid;
