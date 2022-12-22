import { SettingBlockArray } from '../../../SchemaBlocks/SettingBlockArray/@types/SettingBlockArray';
import { SettingBlockObject } from '../../../SchemaBlocks/SettingBlockObject/@types/SettingBlockObject';
import { SettingChooseImage } from './SettingChooseImage';

export interface ISCHEMA_SettingChooseImage {
  field: SettingChooseImage;
  parentField: SettingBlockArray | SettingBlockObject | undefined;
}
