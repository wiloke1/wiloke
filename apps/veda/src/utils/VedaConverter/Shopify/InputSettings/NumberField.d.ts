import { SettingDefault } from './@SettingDefault';

export interface NumberField extends SettingDefault {
  default: undefined;
  type: 'number';
  placeholder?: number | undefined;
}
