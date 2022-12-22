import { SettingBlockArray } from '../../../SchemaBlocks/SettingBlockArray/@types/SettingBlockArray';
import { SettingBlockObject } from '../../../SchemaBlocks/SettingBlockObject/@types/SettingBlockObject';
import { SettingFlexOrder } from './SettingFlexOrder';

export interface ISCHEMA_SettingFlexOrder {
  field: SettingFlexOrder;
  parentField: SettingBlockArray | SettingBlockObject | undefined;
}
