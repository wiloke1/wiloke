import { SettingBlockArray } from '../../../SchemaBlocks/SettingBlockArray/@types/SettingBlockArray';
import { SettingBlockObject } from '../../../SchemaBlocks/SettingBlockObject/@types/SettingBlockObject';
import { SettingFont } from './SettingFont';

export interface ISCHEMA_SettingFont {
  field: SettingFont;
  parentField: SettingBlockArray | SettingBlockObject | undefined;
}
