import { getLocale } from 'translation';
import { SettingHelpText, SettingLabel } from 'types/Schema';
import { schemaTranslation, schemaTranslationSummary } from './schemaTranslation';

export const getLabel = (label: SettingLabel) => {
  const locale = getLocale();
  return typeof label === 'object' ? label[locale] : schemaTranslation(label);
};

export const getSummary = (label: SettingLabel, summary?: SettingHelpText) => {
  if (summary) {
    return getLabel(summary);
  }
  return schemaTranslationSummary(getLabel(label));
};
