import { SettingDefault } from './@SettingDefault';

interface RadioField extends SettingDefault {
  type: 'radio';
  options: Array<{ label: string; value: string }>;
  default: undefined;
}
