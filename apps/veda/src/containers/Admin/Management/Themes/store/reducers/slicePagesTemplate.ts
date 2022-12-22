import { AdminPageDatabase } from 'services/ResultService/atomTypes';
import { PageType } from 'types/Page';
import { ActionTypes, createSlice, handleAction } from 'wiloke-react-core/utils';
import { getPagesTemplate, loadMorePagesTemplate } from '../actions/actionPagesTemplate';

type ExtraActions = ActionTypes<typeof getPagesTemplate | typeof loadMorePagesTemplate>;

interface ItemState {
  items: AdminPageDatabase[];
  hasNextPage: boolean;
  getStatus: Status;
  loadmoreStatus: Status;
}

const defaultItemState: ItemState = {
  items: [],
  hasNextPage: false,
  getStatus: 'idle',
  loadmoreStatus: 'idle',
};

interface PagesTemplateState {
  data: Record<PageType, ItemState>;
}

export const slicePagesTemplate = createSlice<PagesTemplateState, any, ExtraActions>({
  name: '@PageManager',
  initialState: {
    data: {
      account: defaultItemState,
      activateAccount: defaultItemState,
      addresses: defaultItemState,
      article: defaultItemState,
      cart: defaultItemState,
      collection: defaultItemState,
      collections: defaultItemState,
      giftCard: defaultItemState,
      home: defaultItemState,
      login: defaultItemState,
      order: defaultItemState,
      page: defaultItemState,
      pageNotFound: defaultItemState,
      password: defaultItemState,
      product: defaultItemState,
      register: defaultItemState,
      resetPassword: defaultItemState,
      search: defaultItemState,
    },
  },
  reducers: [],
  extraReducers: [
    handleAction('@PageManager/getPagesTemplate/request', ({ state, action }) => {
      const { pageType } = action.payload;
      const state_ = state.data[pageType];
      state_.getStatus = 'loading';
    }),
    handleAction('@PageManager/getPagesTemplate/success', ({ state, action }) => {
      const { pageType, data, hasNextPage } = action.payload;
      const state_ = state.data[pageType];
      state_.getStatus = 'success';
      state_.items = data;
      state_.hasNextPage = hasNextPage;
    }),
    handleAction('@PageManager/getPagesTemplate/failure', ({ state, action }) => {
      const { pageType } = action.payload;
      const state_ = state.data[pageType];
      state_.getStatus = 'failure';
    }),

    handleAction('@PageManager/loadMorePagesTemplate/request', ({ state, action }) => {
      const { pageType } = action.payload;
      const state_ = state.data[pageType];
      state_.loadmoreStatus = 'loading';
    }),
    handleAction('@PageManager/loadMorePagesTemplate/success', ({ state, action }) => {
      const { pageType, data, hasNextPage } = action.payload;
      const state_ = state.data[pageType];
      state_.loadmoreStatus = 'success';
      state_.items.push(...data);
      state_.hasNextPage = hasNextPage;
    }),
    handleAction('@PageManager/loadMorePagesTemplate/failure', ({ state, action }) => {
      const { pageType } = action.payload;
      const state_ = state.data[pageType];
      state_.loadmoreStatus = 'failure';
    }),
  ],
});

export const pagesTemplateSelector = (state: AppState) => state.adminDashboard.pagesTemplate;
