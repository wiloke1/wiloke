import { ThemeGeneralSettings } from 'types/Result';

export interface SetThemeGeneralSettings {
  type: 'setThemeGeneralSettings';
  payload: Partial<ThemeGeneralSettings>;
}
