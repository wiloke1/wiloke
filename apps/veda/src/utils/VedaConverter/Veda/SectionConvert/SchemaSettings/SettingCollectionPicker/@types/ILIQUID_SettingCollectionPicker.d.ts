import { ISCHEMA_SettingCollectionPicker } from './ISCHEMA_SettingCollectionPicker';

export interface ILIQUID_SettingCollectionPicker extends ISCHEMA_SettingCollectionPicker {
  liquid: string;
  loopVariable: string | undefined;
}
