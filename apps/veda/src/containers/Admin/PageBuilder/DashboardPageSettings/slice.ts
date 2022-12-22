import { AdminPageData } from 'containers/Admin/types';
import { GetAdditionalDataRelateToShopify_BEExpectResponse } from 'services/ShopifyConnection';
import { PageType } from 'types/Page';
import { ActionTypes, createAsyncAction, createDispatchAction, createDispatchAsyncAction, createSlice, handleAction } from 'wiloke-react-core/utils';

export const checkSlugExist = createAsyncAction([
  '@Dashboard/checkSlugExist/request',
  '@Dashboard/checkSlugExist/success',
  '@Dashboard/checkSlugExist/failure',
])<{ commandId: string; handle: string; pageType: PageType; callback?: Callback }, undefined, undefined>();

export const updatePageSettings = createAsyncAction([
  '@Dashboard/updatePageSettings/request',
  '@Dashboard/updatePageSettings/success',
  '@Dashboard/updatePageSettings/failure',
])<
  {
    page: AdminPageData;
    originPage: AdminPageData;
    isOverrideIndividualPages: GetAdditionalDataRelateToShopify_BEExpectResponse['info']['isOverrideIndividualPages'];
    variant: 'Update page settings' | 'Update shopify pages';
    callback?: () => void;
    onFulfill: () => void;
  },
  AdminPageData,
  { commandId: string }
>();

type ExtraActions = ActionTypes<typeof updatePageSettings | typeof checkSlugExist>;

interface DashboardPageSettingsActions {
  type: 'changeSettingsDashboardPage';
  payload: Partial<DashboardPageSettingsState>;
}

interface DashboardPageSettingsState {
  visible: boolean;
  page: AdminPageData | undefined;
  originPage: AdminPageData | undefined;
  updateStatus: Status;
  checkSlugStatus: Status;
  isChangingHandle: boolean;

  visibleListProduct: boolean;
  visibleListCollection: boolean;
  visibleListBlog: boolean;
}

export const dashboardPageSettingsSlice = createSlice<DashboardPageSettingsState, DashboardPageSettingsActions, ExtraActions>({
  initialState: {
    visible: false,
    page: undefined,
    originPage: undefined,
    updateStatus: 'idle',
    checkSlugStatus: 'idle',
    isChangingHandle: false,
    visibleListProduct: false,
    visibleListCollection: false,
    visibleListBlog: false,
  },
  name: '@Dashboard',
  reducers: [
    handleAction('changeSettingsDashboardPage', ({ state, action }) => {
      return {
        ...state,
        visible: action.payload.visible ?? state.visible,
        page: action.payload.page ?? state.page,
        originPage: action.payload.originPage ?? state.originPage,
        isChangingHandle: action.payload.isChangingHandle ?? state.isChangingHandle,
        visibleListProduct: action.payload.visibleListProduct ?? state.visibleListProduct,
        visibleListCollection: action.payload.visibleListCollection ?? state.visibleListCollection,
        visibleListBlog: action.payload.visibleListBlog ?? state.visibleListBlog,
      };
    }),
  ],
  extraReducers: [
    handleAction('@Dashboard/updatePageSettings/request', ({ state }) => ({ ...state, updateStatus: 'loading' })),
    handleAction('@Dashboard/updatePageSettings/success', ({ state }) => ({ ...state, updateStatus: 'success' })),
    handleAction('@Dashboard/updatePageSettings/failure', ({ state }) => ({ ...state, updateStatus: 'failure' })),

    handleAction('@Dashboard/checkSlugExist/request', ({ state }) => ({ ...state, checkSlugStatus: 'loading' })),
    handleAction('@Dashboard/checkSlugExist/success', ({ state }) => ({ ...state, checkSlugStatus: 'success' })),
    handleAction('@Dashboard/checkSlugExist/failure', ({ state }) => ({ ...state, checkSlugStatus: 'failure' })),
  ],
});

export const { changeSettingsDashboardPage } = dashboardPageSettingsSlice.actions;
export const useChangeSettingsDashboardPage = createDispatchAction(changeSettingsDashboardPage);

export const useUpdatePageSettings = createDispatchAsyncAction(updatePageSettings);
export const useCheckSlugExist = createDispatchAsyncAction(checkSlugExist);

export const dashboardPageSettingsSelector = (state: AppState) => state.adminDashboard.pageBuilder.dashboardPageSettings;
