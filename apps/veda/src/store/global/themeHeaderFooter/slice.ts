import { PageSection } from 'types/Sections';
import { ActionTypes, createDispatchAction, createDispatchAsyncAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import { getThemeFooters, getThemeHeaders, SetThemeFooters, SetThemeHeaders } from './action';

type Actions = SetThemeFooters | SetThemeHeaders;

type ExtraActions = ActionTypes<typeof getThemeFooters | typeof getThemeHeaders>;

export interface ThemeHeaderFooterState {
  headers: PageSection[];
  footers: PageSection[];
  getHeadersStatus: Status;
  getFootersStatus: Status;
}

export const defaultThemeHeaderFooterState: ThemeHeaderFooterState = {
  footers: [],
  headers: [],
  getFootersStatus: 'idle',
  getHeadersStatus: 'idle',
};

const sliceThemeHeaderFooter = createSlice<ThemeHeaderFooterState, Actions, ExtraActions>({
  initialState: defaultThemeHeaderFooterState,
  name: '@Global',
  reducers: [
    handleAction('setThemeFooters', ({ state, action }) => {
      state.footers = action.payload.footers;
    }),
    handleAction('setThemeHeaders', ({ state, action }) => {
      state.headers = action.payload.headers;
    }),
  ],
  extraReducers: [
    handleAction('@Global/getThemeHeaders/request', ({ state }) => {
      state.getHeadersStatus = 'loading';
    }),
    handleAction('@Global/getThemeHeaders/success', ({ state, action }) => {
      state.getHeadersStatus = 'success';
      state.headers = action.payload.headers;
    }),
    handleAction('@Global/getThemeHeaders/failure', ({ state }) => {
      state.getHeadersStatus = 'failure';
    }),

    handleAction('@Global/getThemeFooters/request', ({ state }) => {
      state.getFootersStatus = 'loading';
    }),
    handleAction('@Global/getThemeFooters/success', ({ state, action }) => {
      state.getFootersStatus = 'success';
      state.footers = action.payload.footers;
    }),
    handleAction('@Global/getThemeFooters/failure', ({ state }) => {
      state.getFootersStatus = 'failure';
    }),
  ],
});

const { setThemeFooters, setThemeHeaders } = sliceThemeHeaderFooter.actions;
const useSetThemeFooters = createDispatchAction(setThemeFooters);
const useSetThemeHeaders = createDispatchAction(setThemeHeaders);
const useGetThemeHeaders = createDispatchAsyncAction(getThemeHeaders);
const useGetThemeFooters = createDispatchAsyncAction(getThemeFooters);

export {
  setThemeFooters,
  setThemeHeaders,
  sliceThemeHeaderFooter,
  useSetThemeFooters,
  useSetThemeHeaders,
  useGetThemeHeaders,
  useGetThemeFooters,
  getThemeHeaders,
  getThemeFooters,
};
