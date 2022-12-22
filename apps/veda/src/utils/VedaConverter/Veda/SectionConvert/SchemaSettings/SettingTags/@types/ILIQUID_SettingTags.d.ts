import { ISCHEMA_SettingTags } from './ISCHEMA_SettingTags';

export interface ILIQUID_SettingTags extends ISCHEMA_SettingTags {
  liquid: string;
  loopVariable: string | undefined;
}
