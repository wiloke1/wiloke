import { SettingBlockArray } from '../../../SchemaBlocks/SettingBlockArray/@types/SettingBlockArray';
import { SettingBlockObject } from '../../../SchemaBlocks/SettingBlockObject/@types/SettingBlockObject';
import { SettingSingleProductPicker } from './SettingSingleProductPicker';

export interface ISCHEMA_SettingSingleProductPicker {
  field: SettingSingleProductPicker;
  parentField: SettingBlockArray | SettingBlockObject | undefined;
}
