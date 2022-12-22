import { desaturate } from 'polished';
import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

const domainValues = [0, 100];

window.Twig.extendFilter('color_desaturate', (value, args) => {
  if (!args) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_desaturate.params', { error_signal: toString(args) }));
  }
  const [desaturateValue] = args;
  const _desaturateValue = Number(desaturateValue);

  if (typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_desaturate.value', { error_signal: toString(value) }));
  }
  if (isNaN(_desaturateValue)) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_desaturate.desaturateValue', { error_signal: toString(desaturateValue) }));
  }

  if (_desaturateValue < domainValues[0] || _desaturateValue > domainValues[1]) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_desaturate.desaturateDomain', { error_signal: toString(desaturateValue) }));
  }
  try {
    return desaturate(_desaturateValue / 100, value);
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_desaturate.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.dev/api/liquid/filters/color-filters#color_desaturate
 */
export const color_desaturate = (liquid: string) =>
  liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'color_desaturate', twigFilterName: 'color_desaturate' });
