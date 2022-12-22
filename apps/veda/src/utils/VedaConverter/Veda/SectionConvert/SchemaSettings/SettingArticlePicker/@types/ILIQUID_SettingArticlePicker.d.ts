import { ISCHEMA_SettingArticlePicker } from './ISCHEMA_SettingArticlePicker';

export interface ILIQUID_SettingArticlePicker extends ISCHEMA_SettingArticlePicker {
  liquid: string;
  loopVariable: string | undefined;
}
