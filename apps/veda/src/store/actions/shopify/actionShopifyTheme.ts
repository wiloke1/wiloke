import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const getThemeActive = createAsyncAction([
  '@Shopify/getThemeActive/request',
  '@Shopify/getThemeActive/success',
  '@Shopify/getThemeActive/failure',
])<undefined, { themeId: number; themeName: string }, undefined>();

export const useGetThemeActive = createDispatchAsyncAction(getThemeActive);
