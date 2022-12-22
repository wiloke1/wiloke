import { createAction, createDispatchAction } from 'wiloke-react-core/utils';

export const setIdClickActive = createAction('@SectionToolbar/setIdClickActive', (payload: { idClickActive: string }) => payload);
export const setIdHoverActive = createAction('@SectionToolbar/setIdHoverActive', (payload: { idHoverActive: string }) => payload);

export const useSetIdClickActive = createDispatchAction(setIdClickActive);
export const useSetIdHoverActive = createDispatchAction(setIdHoverActive);
