import { Vendor } from 'types/Result';
import { v4 } from 'uuid';
import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';
import { AddThemeVendorAction, DeleteThemeVendorAction, SetThemeVendorsAction, UpdateThemeVendorAction } from './actions';

type ThemeVendorsAction = SetThemeVendorsAction | AddThemeVendorAction | DeleteThemeVendorAction | UpdateThemeVendorAction;

export type ThemeVendorsState = Vendor[];

export const sliceThemeVendors = createSlice<ThemeVendorsState, ThemeVendorsAction>({
  name: '@Global',
  initialState: [
    {
      id: v4(),
      css: '',
      js: '',
    },
  ],
  reducers: [
    handleAction('setThemeVendors', ({ action, state }) => {
      if (action.payload.vendors.length > 0) {
        return action.payload.vendors;
      }
      return state;
    }),
    handleAction('addThemeVendor', ({ state }) => {
      state.push({ id: v4(), css: '', js: '' });
    }),
    handleAction('updateThemeVendorValue', ({ state, action }) => {
      const { payload } = action;
      state.forEach(item => {
        if (item.id === payload.id) {
          item.css = payload.css ?? item.css;
          item.js = payload.js ?? item.js;
        }
      });
    }),
    handleAction('deleteThemeVendor', ({ state, action }) => state.filter(item => item.id !== action.payload.id)),
  ],
});

export const { setThemeVendors, addThemeVendor, updateThemeVendorValue, deleteThemeVendor } = sliceThemeVendors.actions;
export const useSetThemeVendors = createDispatchAction(setThemeVendors);
export const useAddThemeVendor = createDispatchAction(addThemeVendor);
export const useUpdateThemeVendorValue = createDispatchAction(updateThemeVendorValue);
export const useDeleteThemeVendor = createDispatchAction(deleteThemeVendor);
export const themeVendorsSelector = (state: AppState) => state.global.themeSettings.vendors;
