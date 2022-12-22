import { SettingBlockArray } from '../../../SchemaBlocks/SettingBlockArray/@types/SettingBlockArray';
import { SettingBlockObject } from '../../../SchemaBlocks/SettingBlockObject/@types/SettingBlockObject';
import { SettingLinkPicker } from './SettingLinkPicker';

export interface ISCHEMA_SettingLinkPicker {
  field: SettingLinkPicker;
  parentField: SettingBlockArray | SettingBlockObject | undefined;
}
