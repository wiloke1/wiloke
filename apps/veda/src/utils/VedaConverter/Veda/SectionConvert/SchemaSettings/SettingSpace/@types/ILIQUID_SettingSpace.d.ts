import { ISCHEMA_SettingSpace } from './ISCHEMA_SettingSpace';

export interface ILIQUID_SettingSpace extends ISCHEMA_SettingSpace {
  liquid: string;
  loopVariable: string | undefined;
}
