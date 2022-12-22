import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

/**
 * @link https://shopify.github.io/liquid/filters/truncatewords/
 */
window.Twig.extendFilter('truncatewords', (value, args) => {
  if (!args) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.truncatewords.params', { error_signal: toString(args) }));
  }
  const [quantityWords, truncater] = args;
  const _quantityWords = Number(quantityWords);
  const _truncater = String(truncater ?? '...');
  const _value = value;
  if (typeof _value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.truncatewords.value', { error_signal: toString(value) }));
  }
  if (isNaN(_quantityWords)) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.truncatewords.quantity_words', { error_signal: toString(quantityWords) }));
  }
  try {
    return _value
      .split(' ')
      .slice(0, _quantityWords - 1)
      .join(' ')
      .concat(_truncater);
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.truncatewords.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.github.io/liquid/filters/truncatewords/
 */
export const truncatewords = (liquid: string) =>
  liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'truncatewords', twigFilterName: 'truncatewords' });
