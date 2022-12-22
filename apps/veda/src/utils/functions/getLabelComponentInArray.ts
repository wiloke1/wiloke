import { SettingArrayValue, SettingSelect } from 'types/Schema';

export const getFirstSelectField = (settingChild: SettingArrayValue) => {
  if (!Array.isArray(settingChild.children)) {
    return null;
  }
  return settingChild.children[0] as SettingSelect;
};

export const isComponent = (settingChild: SettingArrayValue) => {
  const firstChild = getFirstSelectField(settingChild);
  if (!firstChild) {
    return false;
  }
  return firstChild.type === 'select' && firstChild.name === 'component';
};

export const getLabelComponent = (settingChild: SettingArrayValue) => {
  const firstChild = getFirstSelectField(settingChild);
  if (!firstChild) {
    return '';
  }
  return (firstChild.options.find(item => item.value === firstChild.children)?.label as string) ?? '';
};

export const getNameComponent = (settingChild: SettingArrayValue) => {
  const firstChild = getFirstSelectField(settingChild);
  if (!firstChild) {
    return '';
  }
  return (firstChild.options.find(item => item.value === firstChild.children)?.value as string) ?? '';
};
