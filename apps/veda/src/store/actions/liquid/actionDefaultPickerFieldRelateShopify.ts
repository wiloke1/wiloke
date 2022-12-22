import { DefaultPickerFieldRelateShopifyData } from 'store/reducers/liquid/reducerDefaultPickerFieldRelateShopify';
import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const getDefaultPickerFieldRelateShopify = createAsyncAction([
  '@getDefaultPickerFieldRelateShopify/request',
  '@getDefaultPickerFieldRelateShopify/success',
  'getDefaultPickerFieldRelateShopify/failure',
])<undefined, DefaultPickerFieldRelateShopifyData, undefined>();

export const useGetDefaultPickerFieldRelateShopify = createDispatchAsyncAction(getDefaultPickerFieldRelateShopify);
