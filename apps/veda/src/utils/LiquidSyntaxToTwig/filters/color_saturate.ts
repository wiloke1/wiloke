import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import Color from '../libraries/color';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

const domainValues = [0, 100];

window.Twig.extendFilter('color_saturate', (value, args) => {
  if (!args) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_saturate.params', { error_signal: toString(args) }));
  }
  const [saturateValue] = args;
  const _saturateValue = Number(saturateValue);

  if (typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_saturate.value', { error_signal: toString(value) }));
  }
  if (isNaN(_saturateValue)) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_saturate.saturateValue', { error_signal: toString(value) }));
  }

  const color = Color(value);
  if (_saturateValue < domainValues[0] || _saturateValue > domainValues[1]) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_saturate.saturateValueDomain', { error_signal: toString(saturateValue) }));
  }
  try {
    return color.saturate(_saturateValue / 100).toString();
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_saturate.example', { message: toString(err) }));
  }
});

/**
 * FIXME: Kết quả đang không giống với shopify -> Result: #76C24F, Expect: #6ed938
 * @link https://shopify.dev/api/liquid/filters/color-filters#color_saturate
 */
export const color_saturate = (liquid: string) =>
  liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'color_saturate', twigFilterName: 'color_saturate' });
