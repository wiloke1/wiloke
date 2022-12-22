import { createAction, createDispatchAction } from 'wiloke-react-core/utils';

export const setSectionEdittingId = createAction('@Global/setSectionEdittingId', (id: string) => ({
  id,
}));

const thunkSetSectionEdittingId = (id: string): ThunkAction<typeof setSectionEdittingId> => async dispatch => {
  return new Promise(resolve => {
    dispatch(setSectionEdittingId(id));
    resolve();
  });
};

export const useSetSectionEdittingId = createDispatchAction(thunkSetSectionEdittingId);
