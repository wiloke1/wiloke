import { PresetStyle } from 'types/PresetStyles';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const getPresetStyles = createAsyncAction([
  '@PresetStyle/getPresetStyles/request',
  '@PresetStyle/getPresetStyles/success',
  '@PresetStyle/getPresetStyles/failure',
])<undefined, { data: PresetStyle[] }, undefined>();

export const installPresetStyle = createAsyncAction([
  '@PresetStyle/installPresetStyle/request',
  '@PresetStyle/installPresetStyle/success',
  '@PresetStyle/installPresetStyle/failure',
])<{ id: string }, { id: string }, { id: string }>();

export const useGetPresetStyles = createDispatchAsyncAction(getPresetStyles);
export const useInstallPresetStyle = createDispatchAsyncAction(installPresetStyle);
