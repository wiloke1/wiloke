import createI18n from 'utils/functions/createI18n';
import { translation } from './translation';

const _i18n = createI18n(translation);

export const i18n = {
  t: _i18n.t,
};

export const getLocale = _i18n.getLocale;

export const setLocale = (locale?: string) => {
  _i18n.setLocale(locale || navigator.language);
};
