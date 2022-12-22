import { ISCHEMA_SettingTextArea } from './ISCHEMA_SettingTextArea';

export interface ILIQUID_SettingTextArea extends ISCHEMA_SettingTextArea {
  liquid: string;
  loopVariable: string | undefined;
}
