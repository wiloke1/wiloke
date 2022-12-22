import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

window.Twig.extendFilter('modulo', (value, args) => {
  if (!args) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.modulo.params', { error_signal: toString(args) }));
  }
  const [modulo_number] = args;
  const _modulo_number = Number(modulo_number);
  const _dividend = Number(value);
  if (isNaN(_dividend)) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.modulo.value', { error_signal: toString(value) }));
  }
  if (isNaN(_modulo_number)) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.modulo.modulo_number', { error_signal: toString(modulo_number) }));
  }
  try {
    return _dividend % _modulo_number;
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.modulo.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.github.io/liquid/filters/modulo/
 */
export const modulo = (liquid: string) => liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'modulo', twigFilterName: 'modulo' });
