import { darken } from 'polished';
import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

const domainValues = [0, 100];

window.Twig.extendFilter('color_darken', (value, args) => {
  if (!args) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_darken.params', { error_signal: toString(args) }));
  }
  const [darkenValue] = args;
  const _darkenValue = Number(darkenValue);

  if (typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_darken.value', { error_signal: toString(value) }));
  }
  if (isNaN(_darkenValue)) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_darken.darkenValue', { error_signal: toString(darkenValue) }));
  }
  if (_darkenValue < domainValues[0] || _darkenValue > domainValues[1]) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_darken.darkenDomain', { error_signal: toString(darkenValue) }));
  }
  try {
    return darken(_darkenValue / 100, value);
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_darken.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.dev/api/liquid/filters/color-filters#color_darken
 */
export const color_darken = (liquid: string) =>
  liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'color_darken', twigFilterName: 'color_darken' });
