import { createGlobalState } from 'react-use/lib/factory/createGlobalState';

export type ChooseImageMode = 'drawer' | 'popup';

export const useVisible = createGlobalState(false);
export const useImageInput = createGlobalState('');
export const useChooseImageMode = createGlobalState<ChooseImageMode>('drawer');
export const useNumberOfColumn = createGlobalState<number>(2);
