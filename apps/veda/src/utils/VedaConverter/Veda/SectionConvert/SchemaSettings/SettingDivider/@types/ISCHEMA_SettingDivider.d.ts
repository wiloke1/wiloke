import { SettingBlockArray } from '../../../SchemaBlocks/SettingBlockArray/@types/SettingBlockArray';
import { SettingBlockObject } from '../../../SchemaBlocks/SettingBlockObject/@types/SettingBlockObject';
import { SettingDivider } from './SettingDivider';

export interface ISCHEMA_SettingDivider {
  field: SettingDivider;
  parentField: SettingBlockArray | SettingBlockObject | undefined;
}
