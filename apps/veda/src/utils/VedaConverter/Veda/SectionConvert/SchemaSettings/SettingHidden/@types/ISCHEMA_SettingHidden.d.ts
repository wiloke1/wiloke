import { SettingBlockArray } from '../../../SchemaBlocks/SettingBlockArray/@types/SettingBlockArray';
import { SettingBlockObject } from '../../../SchemaBlocks/SettingBlockObject/@types/SettingBlockObject';
import { SettingHidden } from './SettingHidden';

export interface ISCHEMA_SettingHidden {
  field: SettingHidden;
  parentField: SettingBlockArray | SettingBlockObject | undefined;
}
