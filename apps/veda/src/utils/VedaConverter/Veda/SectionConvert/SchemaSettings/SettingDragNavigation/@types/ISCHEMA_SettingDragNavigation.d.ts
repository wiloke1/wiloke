import { SettingBlockArray } from '../../../SchemaBlocks/SettingBlockArray/@types/SettingBlockArray';
import { SettingBlockObject } from '../../../SchemaBlocks/SettingBlockObject/@types/SettingBlockObject';
import { SettingDragNavigation } from './SettingDragNavigation';

export interface ISCHEMA_SettingDragNavigation {
  field: SettingDragNavigation;
  parentField: SettingBlockArray | SettingBlockObject | undefined;
}
