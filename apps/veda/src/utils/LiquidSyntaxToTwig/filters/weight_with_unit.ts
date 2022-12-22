import { i18n } from 'translation';
import { getBuilderPageReduxStore } from 'utils/getParentStore';
import { LiquidSyntaxToTwigError } from '../Error';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

window.Twig.extendFilter('weight_with_unit', (value, args) => {
  try {
    const state = getBuilderPageReduxStore().getState();
    const [unit] = args ? args : [state.liquidVariables.data.weight_with_unit];
    const _unit = String(unit);
    const _value = value;
    return `${_value} ${_unit}`;
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.weight_with_unit.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.dev/api/liquid/filters/additional-filters#weight_with_unit
 */
export const weight_with_unit = (liquid: string) =>
  liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'weight_with_unit', twigFilterName: 'weight_with_unit' });
