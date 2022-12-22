import { AppSettings } from 'types/AppSettings';
import { createAsyncAction } from 'wiloke-react-core/utils';

export interface AppSettingsVisibleAction {
  type: 'setAppSettingsVisible';
  payload: boolean;
}

export interface ChangeAppSettings {
  type: 'changeAppSettings';
  payload: Partial<AppSettings>;
}

export const getAppSettings = createAsyncAction([
  '@BuilderPage/getAppSettings/request',
  '@BuilderPage/getAppSettings/success',
  '@BuilderPage/getAppSettings/failure',
])<undefined, { data: AppSettings }, { message: '' }>();
