import strftime from 'strftime';
import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { liquidFilterParamsToTwigFilterParams } from '../utils/liquidFilterParamsToTwigFilterParams';
import { toString } from '../utils/toString';

const isValidDate = function(date: any) {
  if (date === 'now') {
    return true;
  }
  return new Date(date).toString() !== 'Invalid Date' && !isNaN(new Date(date).getTime());
};

window.Twig.extendFilter('date', (value, args) => {
  if (value !== undefined && value !== null && !isValidDate(value)) {
    return value;
  }
  if (value === undefined || value === null) {
    return '';
  }
  const format = Array.isArray(args) && args[0] ? args[0] : '%A, %B %e, %Y at %l:%M %P %z';
  try {
    return strftime(format, value === 'now' ? new Date() : new Date(value));
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.date.example', { message: toString(err) }));
  }
});

/**
 * @link https://shopify.dev/api/liquid/filters/additional-filters#date
 */
export const date = (liquid: string) => liquidFilterParamsToTwigFilterParams({ liquid, liquidFilterName: 'date', twigFilterName: 'date' });
