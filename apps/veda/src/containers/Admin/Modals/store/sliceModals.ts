import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

export interface ChangeModalAdminSettings {
  type: 'changeModalAdminSettings';
  payload: Partial<ModalAdminState>;
}

type ModalActions = ChangeModalAdminSettings;

export interface ModalAdminState {
  createTheme: boolean;
  createProduct: boolean;
  createCollection: boolean;
  createArticle: boolean;
  createNormalPage: boolean;

  deleteBlank: boolean;
  deleteProduct: boolean;
  deleteCollection: boolean;
  deleteArticle: boolean;
  deleteHome: boolean;
  deleteCart: boolean;
  deleteSearch: boolean;
  deletePassword: boolean;
  deleteNotFound: boolean;
  deleteCustomersLogin: boolean;
  deleteCustomersResetPassword: boolean;
  deleteCustomersActivateAccount: boolean;
  deleteCustomersRegister: boolean;
  deleteCustomersAccount: boolean;
  deleteCustomersOrder: boolean;
  deleteCustomersAddresses: boolean;
  deleteGiftCard: boolean;
  deleteCollectionListing: boolean;

  isCreate: boolean;
}

const sliceAdminModals = createSlice<ModalAdminState, ModalActions>({
  initialState: {
    createTheme: false,
    createProduct: false,
    createCollection: false,
    createArticle: false,
    createNormalPage: false,

    deleteBlank: false,
    deleteHome: false,
    deleteProduct: false,
    deleteCollection: false,
    deleteArticle: false,
    deleteCart: false,
    deleteSearch: false,
    deletePassword: false,
    deleteNotFound: false,
    deleteCustomersLogin: false,
    deleteCustomersResetPassword: false,
    deleteCustomersActivateAccount: false,
    deleteCustomersRegister: false,
    deleteCustomersAccount: false,
    deleteCustomersOrder: false,
    deleteCustomersAddresses: false,
    deleteGiftCard: false,
    deleteCollectionListing: false,

    isCreate: false,
  },
  name: '@Modal',
  reducers: [
    handleAction('changeModalAdminSettings', ({ state, action }) => {
      return {
        ...state,
        ...action.payload,
      };
    }),
  ],
});

export const { changeModalAdminSettings } = sliceAdminModals.actions;
export const reducerModals = sliceAdminModals.reducer;

export const useChangeModalAdminSettings = createDispatchAction(changeModalAdminSettings);
