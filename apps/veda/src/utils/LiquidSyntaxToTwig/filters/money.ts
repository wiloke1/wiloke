import { i18n } from 'translation';
import { getBuilderPageReduxStore } from 'utils/getParentStore';
import { LiquidSyntaxToTwigError } from '../Error';
import { toString } from '../utils/toString';

window.Twig.extendFilter('money', value => {
  const _value = Number(value);
  if (isNaN(_value)) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.money.value', { error_signal: toString(value) }));
  }
  const state = getBuilderPageReduxStore().getState();
  const moneyFormat = state.liquidVariables.data.shop?.money_format ?? '';
  try {
    return moneyFormat.replace(/{{.*}}/, (_value / 100).toString());
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.money.example_money', { message: toString(err) }));
  }
});
window.Twig.extendFilter('money_with_currency', value => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { store } = require('store/configureStore');
  const _state = store.getState() as AppState;
  const _value = Number(value);
  if (isNaN(_value)) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.money.value', { error_signal: toString(value) }));
  }
  const state = getBuilderPageReduxStore().getState();
  const moneyFormat = state.liquidVariables.data.shop?.money_with_currency_format ?? '';
  try {
    return moneyFormat.replace(/{{.*}}/, (_value / 100).toString());
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.money.example_money_with_currency', { message: toString(err) }));
  }
});
window.Twig.extendFilter('money_without_trailing_zeros', value => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { store } = require('store/configureStore');
  const _state = store.getState() as AppState;
  const _value = Number(value);
  if (isNaN(_value)) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.money.value', { error_signal: toString(value) }));
  }
  const state = getBuilderPageReduxStore().getState();
  const moneyFormat = state.liquidVariables.data.shop?.money_format ?? '';
  try {
    return moneyFormat.replace(/{{.*}}/, (_value / 100).toString());
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.money.example_money_without_trailing_zeros', { message: toString(err) }));
  }
});
window.Twig.extendFilter('money_without_currency', value => {
  const _value = Number(value);
  if (isNaN(_value)) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.money.value', { error_signal: toString(value) }));
  }
  try {
    return (_value / 100).toString();
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.money.money_without_currency', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.dev/api/liquid/filters/money-filters#money
 */
export const money = (liquid: string) => {
  return liquid;
};
