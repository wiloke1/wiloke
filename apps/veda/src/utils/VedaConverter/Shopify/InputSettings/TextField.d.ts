import { SettingDefault } from './@SettingDefault';

export interface TextField extends SettingDefault {
  type: 'text';
  default: undefined;
  placeholder: string | undefined;
}
