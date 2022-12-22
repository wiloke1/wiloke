import { i18n } from 'translation';
import { LiquidSyntaxToTwigError } from '../Error';
import { ErrorType } from '../objects';
import { toString } from '../utils/toString';

window.Twig.extendFilter('default_errors', value => {
  try {
    const value_ = value ?? [];
    const errors = value_ as ErrorType;
    if (Array.isArray(errors)) {
      const messages = errors.map(error => {
        if (error === 'author') {
          return i18n.t('twig_error.filters.default_errors.fake_message');
        }
        if (error === 'body') {
          return i18n.t('twig_error.filters.default_errors.fake_message');
        }
        if (error === 'email') {
          return i18n.t('twig_error.filters.default_errors.fake_message');
        }
        if (error === 'form') {
          return i18n.t('twig_error.filters.default_errors.fake_message');
        }
        if (error === 'password') {
          return i18n.t('twig_error.filters.default_errors.fake_message');
        }
        if (error === 'country') {
          return i18n.t('twig_error.filters.default_errors.fake_message');
        }
        return i18n.t('twig_error.filters.default_errors.fake_message');
      });
      return messages.join('\n');
    } else {
      throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.default_errors.value', { error_signal: toString(value_) }));
    }
  } catch (err) {
    if (err instanceof LiquidSyntaxToTwigError) {
      throw err;
    }
    throw new LiquidSyntaxToTwigError(i18n.t('twig_error.filters.default_errors.example', { error_signal: toString(err) }));
  }
});

/**
 * @link https://shopify.dev/api/liquid/filters/additional-filters#default_errors
 */
export const default_errors = (liquid: string) => liquid;
