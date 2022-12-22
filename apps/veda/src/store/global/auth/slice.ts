import { Role } from 'routes/types';
import { ResponseUserPlan, SiteStatus } from 'services/AuthService';
import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

interface SetAccessToken {
  type: 'setAccessToken';
  payload: string;
}

interface SetRoleForDev {
  type: 'setRoleForDev';
  payload: Role;
}

export interface VerifyUserRequest {
  type: 'verifyUser/request';
  payload: {
    callback: () => void;
  };
}
interface VerifyUserSuccess {
  type: 'verifyUser/success';
  payload: {
    id: number;
    email: string;
    role: Role;
    shopName?: string;
    username: string;
    siteStatus: null | SiteStatus;
    plan?: ResponseUserPlan;
    themeId: string;
  };
}

interface VerifyUserFailure {
  type: 'verifyUser/failure';
  payload: undefined;
}

type AuthAction = SetAccessToken | SetRoleForDev | VerifyUserRequest | VerifyUserSuccess | VerifyUserFailure;

interface AuthState {
  status: Status;
  id: number;
  accessToken: string;
  refreshToken: string;
  role: Role;
  username: string;
  email: string;
  plan?: ResponseUserPlan;
  message: string;
  shopName: string;
  siteStatus: SiteStatus | null;
  themeVedaId: string;
}

const initialState: AuthState = {
  status: 'success',
  id: 1,
  accessToken: '',
  refreshToken: 'refreshToken',
  role: 'admin',
  username: '',
  email: '',
  plan: undefined,
  message: '',
  shopName: 'magicbadgesdev.myshopify.com',
  siteStatus: null,
  themeVedaId: '',
};

export const sliceAuth = createSlice<AuthState, AuthAction>({
  name: '@Global',
  initialState,
  reducers: [
    handleAction('setAccessToken', ({ state, action }) => ({ ...state, accessToken: action.payload })),
    handleAction('setRoleForDev', ({ state, action }) => ({
      ...state,
      role: action.payload,
    })),
    handleAction('verifyUser/request', ({ state }) => ({ ...state, status: 'loading' })),
    handleAction('verifyUser/success', ({ state, action: { payload: { email, role, id, username, shopName, siteStatus, plan, themeId } } }) => ({
      ...state,
      status: 'success',
      email,
      id,
      role,
      username,
      plan,
      shopName: shopName ?? state.shopName,
      siteStatus,
      themeVedaId: themeId,
    })),
    handleAction('verifyUser/failure', ({ state }) => ({ ...state, status: 'failure' })),
  ],
});

export const { setAccessToken, setRoleForDev } = sliceAuth.actions;
export const useSetAccessToken = createDispatchAction(setAccessToken);
export const useSetRoleForDev = createDispatchAction(setRoleForDev);
export const useVerifyUser = () => ({
  request: createDispatchAction(sliceAuth.actions['verifyUser/request'])(),
  success: createDispatchAction(sliceAuth.actions['verifyUser/success'])(),
  failure: createDispatchAction(sliceAuth.actions['verifyUser/failure'])(),
});

export const verifyUser = {
  request: sliceAuth.actions['verifyUser/request'],
  success: sliceAuth.actions['verifyUser/success'],
  failure: sliceAuth.actions['verifyUser/failure'],
};
