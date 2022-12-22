import { PageId } from 'types/Page';
import getPageInfo from 'utils/functions/getInfo';
import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

interface GlobalScssAction {
  type: 'setGlobalScss';
  payload: {
    scss: string;
    pageId?: string;
  };
}

export type GlobalScssState = Record<PageId, string>;

export const defaultPageScss: GlobalScssState = {};

export const sliceGlobalScss = createSlice<GlobalScssState, GlobalScssAction>({
  name: '@Global',
  initialState: defaultPageScss,
  reducers: [
    handleAction('setGlobalScss', ({ state, action }) => {
      const pageId = action.payload.pageId ?? getPageInfo('id');
      state[pageId] = action.payload.scss;
    }),
  ],
});

export const { setGlobalScss } = sliceGlobalScss.actions;
export const useSetGlobalScss = createDispatchAction(setGlobalScss);
