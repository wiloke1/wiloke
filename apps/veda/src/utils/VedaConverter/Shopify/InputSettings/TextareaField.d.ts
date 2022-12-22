import { SettingDefault } from './@SettingDefault';

export interface TextareaField extends SettingDefault {
  type: 'textarea';
  default: undefined;
  placeholder: string | undefined;
}
