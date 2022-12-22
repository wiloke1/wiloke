import { SettingDefault } from './@SettingDefault';

interface SelectField extends SettingDefault {
  type: 'select';
  options: Array<{ label: string; value: string }>;
  default: undefined;
  group?: any;
}
