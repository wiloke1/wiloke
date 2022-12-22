import { createAction, createDispatchAction } from 'wiloke-react-core/utils';

export const setSectionArrFieldIndexActive = createAction('@Global/setSectionArrFieldIndexActive', (index: number) => ({
  index,
}));

export const useSetSectionArrFieldIndexActive = createDispatchAction(setSectionArrFieldIndexActive);
