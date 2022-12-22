import { SettingBlockArray } from '../../../SchemaBlocks/SettingBlockArray/@types/SettingBlockArray';
import { SettingBlockObject } from '../../../SchemaBlocks/SettingBlockObject/@types/SettingBlockObject';
import { SettingColor } from './SettingColor';

export interface ISCHEMA_SettingColor {
  field: SettingColor;
  parentField: SettingBlockArray | SettingBlockObject | undefined;
}
