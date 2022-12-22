import { SettingBlockArray } from '../../../SchemaBlocks/SettingBlockArray/@types/SettingBlockArray';
import { SettingBlockObject } from '../../../SchemaBlocks/SettingBlockObject/@types/SettingBlockObject';
import { SettingAnimate } from './SettingAnimate';

export interface ISCHEMA_SettingAnimate {
  field: SettingAnimate;
  parentField: SettingBlockArray | SettingBlockObject | undefined;
}
