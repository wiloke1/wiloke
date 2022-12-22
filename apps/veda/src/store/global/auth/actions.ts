import { Role } from 'routes/types';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export interface LoginResponseSuccess {
  id: number;
  email: string;
  role: Role;
  shopName?: string;
  username: string;
  password: string;
}

export const verifyUser = createAsyncAction(['@Global/verifyUser/request', '@Global/verifyUser/success', '@Global/verifyUser/failure'])<
  { callback?: () => void },
  LoginResponseSuccess,
  undefined
>();

export const useVerifyUser = createDispatchAsyncAction(verifyUser);
