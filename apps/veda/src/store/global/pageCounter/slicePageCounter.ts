import { PageType } from 'types/Page';
import { ActionTypes, createAsyncAction, createDispatchAsyncAction, createSlice, handleAction } from 'wiloke-react-core/utils';

export const getPageCounter = createAsyncAction([
  '@Global/getPageCounter/request',
  '@Global/getPageCounter/success',
  '@Global/getPageCounter/failure',
])<undefined, PageCounter, undefined>();

export type PageCounter = Record<PageType, number>;

type Actions = any;

type ExtraActions = ActionTypes<typeof getPageCounter>;

interface State {
  data: PageCounter;
  status: Status;
}

export const slicePageCounter = createSlice<State, Actions, ExtraActions>({
  name: 'Global',
  initialState: {
    data: {
      account: 0,
      activateAccount: 0,
      addresses: 0,
      article: 0,
      cart: 0,
      collection: 0,
      collections: 0,
      giftCard: 0,
      home: 0,
      login: 0,
      order: 0,
      page: 0,
      pageNotFound: 0,
      password: 0,
      product: 0,
      register: 0,
      resetPassword: 0,
      search: 0,
    },
    status: 'idle',
  },
  reducers: [],
  extraReducers: [
    handleAction('@Global/getPageCounter/request', ({ state }) => {
      state.status = 'loading';
    }),
    handleAction('@Global/getPageCounter/success', ({ state, action }) => {
      state.status = 'success';
      state.data = action.payload;
    }),
    handleAction('@Global/getPageCounter/failure', ({ state }) => {
      state.status = 'failure';
    }),
  ],
});

export const useGetPageCounter = createDispatchAsyncAction(getPageCounter);

export const pageCounterSelector = (state: AppState) => state.pageCounter;
