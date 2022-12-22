import { isEmpty, path } from 'ramda';
import { getLocale, i18n } from 'translation';
import strToRegexpPattern from 'utils/functions/strToRegexpPattern';
import { getBuilderPageReduxStore } from 'utils/getParentStore';
import { LiquidSyntaxToTwigError } from '../Error';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

const number_string: string[] = ['number', 'string'];

window.Twig.extendFilter('t', (value, args) => {
  const locale = getLocale();
  const state = getBuilderPageReduxStore().getState();
  const data = state.liquidVariables.data.translations;
  const t: string | undefined = path(value.split('.'), data[locale]);
  if (!t && !isEmpty(data[locale])) {
    return `translation missing ${value}`;
  }
  try {
    if (t && Array.isArray(args)) {
      let result = t;
      while (args.length) {
        const signal = args.shift()?.key;
        const target = args.shift();
        if (t && number_string.includes(typeof signal) && number_string.includes(typeof target)) {
          result = result.replace(new RegExp(`{{\\s*${strToRegexpPattern(signal)}\\s*}}`, 'gm'), target);
        } else {
          throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.t.format_invalid', { error_signal: toString(args) }));
        }
      }
      return result;
    }
    return t as string;
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.t.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.dev/api/liquid/filters#translate
 */
export const t = (liquid: string) => liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 't', twigFilterName: 't' });
