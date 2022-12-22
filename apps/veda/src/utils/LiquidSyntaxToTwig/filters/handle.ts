import { i18n } from 'translation';
import strToRegexpPattern from 'utils/functions/strToRegexpPattern';
import { LiquidSyntaxToTwigError } from '../Error';
import { toString } from '../utils/toString';

const hyphen = '-'; // Sv sẽ trả về

window.Twig.extendFilter('handle', value => {
  if (typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.handle.value', { error_signal: toString(value) }));
  }
  try {
    return value
      .toLowerCase()
      .replace(/[^A-Z0-9]/gi, hyphen)
      .replace(new RegExp(`${strToRegexpPattern(hyphen)}+`, 'g'), hyphen)
      .replace(/-$/, '');
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.handle.example', { message: toString(err) }));
  }
});
window.Twig.extendFilter('handleize', value => {
  if (typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.handle.value', { error_signal: toString(value) }));
  }
  try {
    return value
      .toLowerCase()
      .replace(/[^A-Z0-9]/gi, hyphen)
      .replace(new RegExp(`${strToRegexpPattern(hyphen)}+`, 'g'), hyphen)
      .replace(/-$/, '');
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.handle.example', { message: toString(err) }));
  }
});

export const handle = (liquid: string) => {
  return liquid;
};

/**
 * TODO: Chưa hoàn thiện
 * @link https://shopify.dev/api/liquid/filters/string-filters#handle-handleize
 */
export const handleize = (liquid: string) => {
  return liquid;
};
