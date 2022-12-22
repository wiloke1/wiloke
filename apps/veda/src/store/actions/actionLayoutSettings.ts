import { LayoutSettings } from 'types/Result';
import { createAction, createDispatchAction } from 'wiloke-react-core/utils';

export const setLayoutSettings = createAction('@Global/setLayoutSettings', (args: Partial<LayoutSettings>) => args);

export const useSetLayoutSettings = createDispatchAction(setLayoutSettings);
