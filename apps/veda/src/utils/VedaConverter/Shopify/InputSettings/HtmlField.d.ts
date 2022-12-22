import { SettingDefault } from './@SettingDefault';

export interface HtmlField extends SettingDefault {
  type: 'html';
  default: undefined;
  placeholder: string | undefined;
}
