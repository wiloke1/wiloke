import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import Color from '../libraries/color';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

const domainValues = {
  red: [0, 255],
  green: [0, 255],
  blue: [0, 255],
  hue: [0, 360],
  sarutation: [0, 100],
};

const domainKeys = Object.keys(domainValues) as Array<keyof typeof domainValues>;

window.Twig.extendFilter('color_modify', (value, args) => {
  if (!args) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_modify.params', { error_signal: toString(args) }));
  }
  const [key, newValue] = args;
  const _key = key as keyof typeof domainValues;
  const _newValue: any = Number(newValue);
  if (typeof value !== 'string') {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_modify.value', { error_signal: toString(value) }));
  }
  if (domainKeys.findIndex(item => item === _key) === -1) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_modify.key', { error_signal: toString(key) }));
  }
  if (isNaN(_newValue)) {
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_modify.newValue', { error_signal: toString(newValue) }));
  }

  try {
    const color = Color(value);
    if (_key === 'red') {
      if (_newValue < domainValues.red[0] || _newValue > domainValues.red[1]) {
        throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_modify.redDomain', { error_signal: toString(newValue) }));
      }
      try {
        return color.red(_newValue).toString();
      } catch (err) {
        if (err instanceof LiquidSyntaxToTwigError) {
          throw err;
        }
        throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_modify.example', { message: toString(err) }));
      }
    }
    if (_key === 'green') {
      if (_newValue < domainValues.green[0] || _newValue > domainValues.green[1]) {
        throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_modify.greenDomain', { error_signal: toString(newValue) }));
      }
      try {
        return color.green(_newValue).toString();
      } catch (err) {
        if (err instanceof LiquidSyntaxToTwigError) {
          throw err;
        }
        throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_modify.example', { message: toString(err) }));
      }
    }
    if (_key === 'blue') {
      if (_newValue < domainValues.blue[0] || _newValue > domainValues.blue[1]) {
        throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_modify.blueDomain', { error_signal: toString(newValue) }));
      }
      try {
        return color.blue(_newValue).toString();
      } catch (err) {
        if (err instanceof LiquidSyntaxToTwigError) {
          throw err;
        }
        throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_modify.example', { message: toString(err) }));
      }
    }
    if (_key === 'hue') {
      if (_newValue < domainValues.hue[0] || _newValue > domainValues.hue[1]) {
        throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_modify.hueDomain', { error_signal: toString(newValue) }));
      }
      try {
        return color.hue(_newValue).toString();
      } catch (err) {
        if (err instanceof LiquidSyntaxToTwigError) {
          throw err;
        }
        throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_modify.example', { message: toString(err) }));
      }
    }
    if (_key === 'sarutation') {
      if (_newValue < domainValues.sarutation[0] || _newValue > domainValues.sarutation[1]) {
        throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_modify.saturationDomain', { error_signal: toString(newValue) }));
      }
      try {
        return color.saturationl(_newValue / 100).toString();
      } catch (err) {
        if (err instanceof LiquidSyntaxToTwigError) {
          throw err;
        }
        throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_modify.example', { message: toString(err) }));
      }
    }
    return i18n.t('twig_error.filters.color_modify.example', { message: '' });
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.color_modify.example', { message: toString(err) }));
  }
});

/**
 * FIXME: Định dạng color đang không trả giống với shopify. Liệu điều này có ổn ?????
 * @link https://shopify.dev/api/liquid/filters/color-filters#color_modify
 */
export const color_modify = (liquid: string) =>
  liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'color_modify', twigFilterName: 'color_modify' });
