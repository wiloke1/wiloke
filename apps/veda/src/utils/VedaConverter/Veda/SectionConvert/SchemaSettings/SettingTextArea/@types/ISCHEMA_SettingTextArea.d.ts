import { SettingBlockArray } from '../../../SchemaBlocks/SettingBlockArray/@types/SettingBlockArray';
import { SettingBlockObject } from '../../../SchemaBlocks/SettingBlockObject/@types/SettingBlockObject';
import { SettingTextArea } from './SettingTextArea';

export interface ISCHEMA_SettingTextArea {
  field: SettingTextArea;
  parentField: SettingBlockArray | SettingBlockObject | undefined;
}
