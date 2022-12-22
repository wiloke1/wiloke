import { createAction, createDispatchAction } from 'wiloke-react-core/utils';

export const setModalSettingsOk = createAction('@Global/setModalSettingsOk', (value: boolean) => ({ value }));

export const useSetModalSettingsOk = createDispatchAction(setModalSettingsOk);
