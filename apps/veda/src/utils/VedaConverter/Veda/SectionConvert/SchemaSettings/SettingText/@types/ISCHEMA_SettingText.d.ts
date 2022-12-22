import { SettingBlockArray } from '../../../SchemaBlocks/SettingBlockArray/@types/SettingBlockArray';
import { SettingBlockObject } from '../../../SchemaBlocks/SettingBlockObject/@types/SettingBlockObject';
import { SettingText } from './SettingText';

export interface ISCHEMA_SettingText {
  field: SettingText;
  parentField: SettingBlockArray | SettingBlockObject | undefined;
}
