import { SettingStyleBox as SettingStyleBox_ } from 'types/Schema';

export type SettingStyleBox = Omit<SettingStyleBox_, 'children'> & {
  children: Exclude<SettingStyleBox_['children'], string>;
};

export type Key = keyof SettingStyleBox['children'];
