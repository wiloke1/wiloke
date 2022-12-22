import { SettingBlockArray } from '../../../SchemaBlocks/SettingBlockArray/@types/SettingBlockArray';
import { SettingBlockObject } from '../../../SchemaBlocks/SettingBlockObject/@types/SettingBlockObject';
import { SettingSwitch } from './SettingSwitch';

export interface ISCHEMA_SettingSwitch {
  field: SettingSwitch;
  parentField: SettingBlockArray | SettingBlockObject | undefined;
}
