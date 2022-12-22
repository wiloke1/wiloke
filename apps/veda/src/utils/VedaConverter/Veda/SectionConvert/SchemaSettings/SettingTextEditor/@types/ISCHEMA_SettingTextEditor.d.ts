import { SettingBlockArray } from '../../../SchemaBlocks/SettingBlockArray/@types/SettingBlockArray';
import { SettingBlockObject } from '../../../SchemaBlocks/SettingBlockObject/@types/SettingBlockObject';
import { SettingTextEditor } from './SettingTextEditor';

export interface ISCHEMA_SettingTextEditor {
  field: SettingTextEditor;
  parentField: SettingBlockArray | SettingBlockObject | undefined;
}
