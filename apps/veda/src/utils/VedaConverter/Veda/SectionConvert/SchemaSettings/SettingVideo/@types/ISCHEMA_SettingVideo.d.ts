import { SettingBlockArray } from '../../../SchemaBlocks/SettingBlockArray/@types/SettingBlockArray';
import { SettingBlockObject } from '../../../SchemaBlocks/SettingBlockObject/@types/SettingBlockObject';
import { SettingVideo } from './SettingVideo';

export interface ISCHEMA_SettingVideo {
  field: SettingVideo;
  parentField: SettingBlockArray | SettingBlockObject | undefined;
}
