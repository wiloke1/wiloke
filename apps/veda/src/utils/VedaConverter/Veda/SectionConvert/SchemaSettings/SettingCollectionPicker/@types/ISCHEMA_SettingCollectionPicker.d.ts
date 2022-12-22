import { SettingBlockArray } from '../../../SchemaBlocks/SettingBlockArray/@types/SettingBlockArray';
import { SettingBlockObject } from '../../../SchemaBlocks/SettingBlockObject/@types/SettingBlockObject';
import { SettingCollectionPicker } from './SettingCollectionPicker';

export interface ISCHEMA_SettingCollectionPicker {
  field: SettingCollectionPicker;
  parentField: SettingBlockArray | SettingBlockObject | undefined;
}
