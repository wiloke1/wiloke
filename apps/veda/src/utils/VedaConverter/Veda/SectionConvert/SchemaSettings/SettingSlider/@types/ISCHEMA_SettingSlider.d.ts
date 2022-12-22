import { SettingBlockArray } from '../../../SchemaBlocks/SettingBlockArray/@types/SettingBlockArray';
import { SettingBlockObject } from '../../../SchemaBlocks/SettingBlockObject/@types/SettingBlockObject';
import { SettingSlider } from './SettingSlider';

export interface ISCHEMA_SettingSlider {
  field: SettingSlider;
  parentField: SettingBlockArray | SettingBlockObject | undefined;
}
