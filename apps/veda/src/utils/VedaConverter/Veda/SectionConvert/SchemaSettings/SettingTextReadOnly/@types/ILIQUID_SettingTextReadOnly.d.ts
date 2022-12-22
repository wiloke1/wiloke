import { ISCHEMA_SettingTextReadOnly } from './ISCHEMA_SettingTextReadOnly';

export interface ILIQUID_SettingTextReadOnly extends ISCHEMA_SettingTextReadOnly {
  liquid: string;
  loopVariable: string | undefined;
}
