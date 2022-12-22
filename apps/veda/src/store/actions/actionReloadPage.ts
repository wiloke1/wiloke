import delay from 'utils/functions/delay';
import { createAction, createDispatchAction } from 'wiloke-react-core/utils';

export const setReloadPage = createAction('@Global/setReloadPage', (value: boolean | undefined) => ({ value }));

type ThunkSetReloadPage = ThunkAction<typeof setReloadPage>;

const thunkSetReloadPage = (value: boolean | undefined): ThunkSetReloadPage => async dispatch => {
  if (value === undefined) {
    dispatch(setReloadPage(true));
    await delay(0);
    dispatch(setReloadPage(false));
  } else {
    dispatch(setReloadPage(value));
  }
};

export const useSetReloadPage = createDispatchAction(thunkSetReloadPage);
