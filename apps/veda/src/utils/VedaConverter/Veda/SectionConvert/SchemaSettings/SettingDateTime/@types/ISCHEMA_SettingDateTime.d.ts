import { SettingBlockArray } from '../../../SchemaBlocks/SettingBlockArray/@types/SettingBlockArray';
import { SettingBlockObject } from '../../../SchemaBlocks/SettingBlockObject/@types/SettingBlockObject';
import { SettingDateTime } from './SettingDateTime';

export interface ISCHEMA_SettingDateTime {
  field: SettingDateTime;
  parentField: SettingBlockArray | SettingBlockObject | undefined;
}
