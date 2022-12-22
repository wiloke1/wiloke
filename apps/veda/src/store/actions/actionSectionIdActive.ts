import { createAction, createDispatchAction } from 'wiloke-react-core/utils';

export const setSectionIdActive = createAction('@Global/setSectionIdActive', (id: string) => ({
  id,
}));

export const useSetSectionIdActive = createDispatchAction(setSectionIdActive);
