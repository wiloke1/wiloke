import { ISCHEMA_SettingTextEditor } from './ISCHEMA_SettingTextEditor';

export interface ILIQUID_SettingTextEditor extends ISCHEMA_SettingTextEditor {
  liquid: string;
  loopVariable: string | undefined;
}
