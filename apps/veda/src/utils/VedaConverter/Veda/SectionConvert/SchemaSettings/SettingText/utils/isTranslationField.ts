import { SettingText } from '../@types/SettingText';

export const isTranslationField = (field: SettingText) => {
  const REGEX = /({\s*)(veda\.[\w.]*)(\s*})/g;
  return REGEX.test(field.children);
};
