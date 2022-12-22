import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const renewData = createAsyncAction([
  '@RenewData/Gồm liquidVariables và default cho các field picker/request',
  '@RenewData/Gồm liquidVariables và default cho các field picker/success',
  '@RenewData/Gồm liquidVariables và default cho các field picker/failure',
])<undefined, undefined, undefined>();

export const useRenewData = createDispatchAsyncAction(renewData);
