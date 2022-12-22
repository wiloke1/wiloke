import { SettingBlockArray } from '../../../SchemaBlocks/SettingBlockArray/@types/SettingBlockArray';
import { SettingBlockObject } from '../../../SchemaBlocks/SettingBlockObject/@types/SettingBlockObject';
import { SettingSpace } from './SettingSpace';

export interface ISCHEMA_SettingSpace {
  field: SettingSpace;
  parentField: SettingBlockArray | SettingBlockObject | undefined;
}
