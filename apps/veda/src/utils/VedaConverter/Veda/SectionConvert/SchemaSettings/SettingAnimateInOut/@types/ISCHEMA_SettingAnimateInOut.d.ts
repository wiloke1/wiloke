import { SettingBlockArray } from '../../../SchemaBlocks/SettingBlockArray/@types/SettingBlockArray';
import { SettingBlockObject } from '../../../SchemaBlocks/SettingBlockObject/@types/SettingBlockObject';
import { SettingAnimateInOut } from './SettingAnimateInOut';

export interface ISCHEMA_SettingAnimateInOut {
  field: SettingAnimateInOut;
  parentField: SettingBlockArray | SettingBlockObject | undefined;
}
