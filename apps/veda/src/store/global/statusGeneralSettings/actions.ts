import { createAsyncAction } from 'wiloke-react-core/utils';

export const getGeneralThemeSettings = createAsyncAction([
  '@Global/getGeneralThemeSettings/request',
  '@Global/getGeneralThemeSettings/success',
  '@Global/getGeneralThemeSettings/failure',
])<undefined, undefined, undefined>();

export const getGeneralSettingsPage = createAsyncAction([
  '@Global/getGeneralSettingsPage/request',
  '@Global/getGeneralSettingsPage/success',
  '@Global/getGeneralSettingsPage/failure',
])<{ id: string }, undefined, undefined>();
