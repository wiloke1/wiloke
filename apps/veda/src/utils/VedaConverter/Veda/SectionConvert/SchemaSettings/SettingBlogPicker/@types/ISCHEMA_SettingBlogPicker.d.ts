import { SettingBlockArray } from '../../../SchemaBlocks/SettingBlockArray/@types/SettingBlockArray';
import { SettingBlockObject } from '../../../SchemaBlocks/SettingBlockObject/@types/SettingBlockObject';
import { SettingBlogPicker } from './SettingBlogPicker';

export interface ISCHEMA_SettingBlogPicker {
  field: SettingBlogPicker;
  parentField: SettingBlockArray | SettingBlockObject | undefined;
}
