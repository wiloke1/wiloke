import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const globalMount = createAsyncAction(['@Root/globalMount/request', '@Root/globalMount/success', '@Root/globalMount/failure'])<
  undefined,
  undefined,
  undefined
>();

export const useGlobalMount = createDispatchAsyncAction(globalMount);
