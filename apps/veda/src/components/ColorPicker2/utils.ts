import { i18n } from 'translation';
import strToCapitalize from 'utils/functions/strToCapitalize';

export const removeVar = (str: string) => {
  return str
    .replace(/var\(|\)/g, '')
    .replace(/-freeze/g, '')
    .replace(/rgba\(|,.*$/g, '')
    .replace(/--rgb-/g, '--');
};

export const getColorTitle = (colorVariable: string) => {
  if (!colorVariable) {
    return i18n.t('general.no_color');
  }
  if (!colorVariable.includes('--')) {
    return colorVariable;
  }
  return strToCapitalize(
    removeVar(colorVariable)
      .replace(/--/g, '')
      .replace(/-/g, ' '),
  );
};
