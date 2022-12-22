import { ISCHEMA_SettingDateTime } from './ISCHEMA_SettingDateTime';

export interface ILIQUID_SettingDateTime extends ISCHEMA_SettingDateTime {
  liquid: string;
  loopVariable: string | undefined;
}
