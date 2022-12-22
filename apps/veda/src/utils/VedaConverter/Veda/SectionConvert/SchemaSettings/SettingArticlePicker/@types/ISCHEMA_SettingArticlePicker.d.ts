import { SettingBlockArray } from '../../../SchemaBlocks/SettingBlockArray/@types/SettingBlockArray';
import { SettingBlockObject } from '../../../SchemaBlocks/SettingBlockObject/@types/SettingBlockObject';
import { SettingArticlePicker } from './SettingArticlePicker';

export interface ISCHEMA_SettingArticlePicker {
  field: SettingArticlePicker;
  parentField: SettingBlockArray | SettingBlockObject | undefined;
}
