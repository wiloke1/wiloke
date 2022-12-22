import { ISCHEMA_SettingSelect } from './ISCHEMA_SettingSelect';

export interface ILIQUID_SettingSelect extends ISCHEMA_SettingSelect {
  liquid: string;
  loopVariable: string | undefined;
}
