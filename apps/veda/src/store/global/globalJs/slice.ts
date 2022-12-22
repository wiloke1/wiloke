import { PageId } from 'types/Page';
import getPageInfo from 'utils/functions/getInfo';
import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

interface GlobalJsAction {
  type: 'setGlobalJs';
  payload: {
    js: string;
    pageId?: string;
  };
}

export type GlobalJsState = Record<PageId, string>;

export const defaultPageJs: GlobalJsState = {};

export const sliceGlobalJs = createSlice<GlobalJsState, GlobalJsAction>({
  name: '@Global',
  initialState: defaultPageJs,
  reducers: [
    handleAction('setGlobalJs', ({ state, action }) => {
      const pageId = action.payload.pageId ?? getPageInfo('id');
      state[pageId] = action.payload.js;
    }),
  ],
});

export const { setGlobalJs } = sliceGlobalJs.actions;
export const useSetGlobalJs = createDispatchAction(setGlobalJs);
