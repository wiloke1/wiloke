import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

export type Device = 'desktop' | 'tablet' | 'mobile';

interface ResponsiveAction {
  type: 'setResponsive';
  payload: Device;
}

type ResponsiveState = Device;

export const sliceResponsive = createSlice<ResponsiveState, ResponsiveAction>({
  name: '@BuilderPage',
  initialState: 'desktop',
  reducers: [handleAction('setResponsive', ({ action }) => action.payload)],
});

export const { setResponsive } = sliceResponsive.actions;
export const useSetResponsive = createDispatchAction(setResponsive);
