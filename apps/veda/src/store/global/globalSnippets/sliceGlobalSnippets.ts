import { omit } from 'lodash';
import { ActionTypes, createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import {
  createLiquidSnippet,
  getLiquidSnippets,
  deleteLiquidSnippet,
  loadMoreLiquidSnippets,
  updateLiquidSnippetFileName,
  updateLiquidSnippet,
} from './action';

export type FileName = string;
export type SnippetContent = string;

type ExtraActions = ActionTypes<
  | typeof getLiquidSnippets
  | typeof createLiquidSnippet
  | typeof deleteLiquidSnippet
  | typeof loadMoreLiquidSnippets
  | typeof updateLiquidSnippetFileName
  | typeof updateLiquidSnippet
>;

export type LiquidSnippet = Record<FileName, SnippetContent>;

interface SetSnippets {
  type: 'setLiquidSnippets';
  payload: LiquidSnippet;
}

interface UpdateSnippetContent {
  type: 'updateLiquidSnippetContent';
  payload: {
    fileName: FileName;
    liquidContent: SnippetContent;
  };
}

type Actions = SetSnippets | UpdateSnippetContent;

interface State {
  data: LiquidSnippet;
  status: Status;
}

export const sliceLiquidSnippets = createSlice<State, Actions, ExtraActions>({
  name: 'Global',
  initialState: { data: {}, status: 'idle' },
  reducers: [
    handleAction('setLiquidSnippets', ({ state, action }) => {
      state.data = action.payload;
    }),
    handleAction('updateLiquidSnippetContent', ({ state, action }) => {
      state.data[action.payload.fileName] = action.payload.liquidContent;
    }),
  ],
  extraReducers: [
    handleAction('@Global/createLiquidSnippet/request', ({ state }) => {
      state.status = 'loading';
    }),
    handleAction('@Global/createLiquidSnippet/success', ({ state, action }) => {
      return {
        ...state,
        status: 'success',
        data: {
          ...action.payload,
          ...state.data,
        },
      };
    }),
    handleAction('@Global/createLiquidSnippet/failure', ({ state }) => {
      state.status = 'failure';
    }),
    handleAction('@Global/deleteLiquidSnippet/request', ({ state }) => {
      state.status = 'loading';
    }),
    handleAction('@Global/deleteLiquidSnippet/success', ({ state, action }) => {
      return {
        ...state,
        status: 'success',
        data: omit(state.data, action.payload.fileName),
      };
    }),
    handleAction('@Global/deleteLiquidSnippet/failure', ({ state }) => {
      state.status = 'failure';
    }),
    handleAction('@Global/getLiquidSnippets/request', ({ state }) => {
      state.status = 'loading';
    }),
    handleAction('@Global/getLiquidSnippets/success', ({ state, action }) => {
      state.status = 'success';
      state.data = action.payload;
    }),
    handleAction('@Global/getLiquidSnippets/failure', ({ state }) => {
      state.status = 'failure';
    }),
    handleAction('@Global/loadMoreLiquidSnippets/request', ({ state }) => {
      state.status = 'loading';
    }),
    handleAction('@Global/loadMoreLiquidSnippets/success', ({ state, action }) => {
      return {
        ...state,
        status: 'success',
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    }),
    handleAction('@Global/loadMoreLiquidSnippets/failure', ({ state }) => {
      state.status = 'failure';
    }),
    handleAction('@Global/updateLiquidSnippetFileName/success', ({ state, action }) => {
      state.status = 'loading';
      if (action.payload.newFileName !== action.payload.oldFileName) {
        state.data[action.payload.newFileName] = state.data[action.payload.oldFileName];
        delete state.data[action.payload.oldFileName];
      }
    }),
    handleAction('@Global/updateLiquidSnippetFileName/failure', ({ state }) => {
      state.status = 'failure';
    }),
    handleAction('@Global/updateLiquidSnippet/request', ({ state }) => {
      state.status = 'loading';
    }),
    handleAction('@Global/updateLiquidSnippet/success', ({ state, action }) => {
      state.status = 'success';
      state.data[action.payload.fileName] = action.payload.liquidContent;
    }),
    handleAction('@Global/updateLiquidSnippet/failure', ({ state }) => {
      state.status = 'failure';
    }),
  ],
});

export const { updateLiquidSnippetContent, setLiquidSnippets } = sliceLiquidSnippets.actions;

export const useUpdateLiquidSnippetContent = createDispatchAction(updateLiquidSnippetContent);
export const useSetLiquidSnippets = createDispatchAction(setLiquidSnippets);

export const liquidSnippetsSelector = (state: AppState) => state.global.appSettings.liquidSnippets;
