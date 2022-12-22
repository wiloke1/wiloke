import { SettingDefault } from './@SettingDefault';

export interface ProductListField extends SettingDefault {
  type: 'product_list';
  limit: number | undefined;
}
