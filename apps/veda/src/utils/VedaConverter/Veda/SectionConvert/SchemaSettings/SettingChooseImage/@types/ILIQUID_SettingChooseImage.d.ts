import { ISCHEMA_SettingChooseImage } from './ISCHEMA_SettingChooseImage';

export interface ILIQUID_SettingChooseImage extends ISCHEMA_SettingChooseImage {
  liquid: string;
  loopVariable: string | undefined;
}
