import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

window.Twig.extendFilter('truncate', (value, args) => {
  if (typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.truncate.value', { error_signal: toString(value) }));
  }
  if (!args || (args && !args[0])) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.truncate.params', { error_signal: toString(args) }));
  }
  const [quantityWords, truncater] = args;
  const _quantityWords = Number(quantityWords);
  const _truncater = String(truncater ?? '...');
  try {
    return value.slice(0, _quantityWords).concat(_truncater);
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.truncate.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.github.io/liquid/filters/truncate/
 */
export const truncate = (liquid: string) => {
  // Xử lí trường hợp truncate là filters cuối cùng trước -> trường hợp này đc xử lí xong sẽ chỉ còn trường hợp truncate đứng vị trí bất kì không phải cuối cùng
  return liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'truncate', twigFilterName: 'truncate' });
};
