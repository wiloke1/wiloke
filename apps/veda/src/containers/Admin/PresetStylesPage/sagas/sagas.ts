import { watchGetPresetStyles } from './watchGetPresetStyles';
import { watchInstallPresetStyle } from './watchInstallPresetStyle';

export const sagasPresetStyle = [watchGetPresetStyles, watchInstallPresetStyle];
