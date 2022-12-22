import { addVendor, setVendors, updateVendorValue, deleteVendor } from 'store/actions/actionVendors';
import { PageId } from 'types/Page';
import { Vendor } from 'types/Result';
import getPageInfo from 'utils/functions/getInfo';
import { v4 } from 'uuid';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';

type VendorsAction = ActionTypes<typeof setVendors | typeof addVendor | typeof updateVendorValue | typeof deleteVendor>;

export type VendorsState = Record<PageId, Vendor[]>;

export const defaultVendors: Vendor[] = [
  {
    id: v4(),
    css: '',
    js: '',
  },
];

export const defaultPageVendors: VendorsState = {};

export const reducerVendors = createReducer<VendorsState, VendorsAction>(defaultPageVendors, [
  handleAction('@Global/setVendors', ({ state, action }) => {
    const pageId = action.payload.pageId ?? getPageInfo('id');
    if (action.payload.vendors.length > 0) {
      state[pageId] = action.payload.vendors;
    }
  }),
  handleAction('@Global/addVendor', ({ state }) => {
    const pageId = getPageInfo('id');
    const vendors = state[pageId] ?? defaultVendors;
    state[pageId] = [...vendors, { id: v4(), css: '', js: '' }];
  }),
  handleAction('@Global/updateVendorValue', ({ state, action }) => {
    const pageId = getPageInfo('id');
    const vendors = state[pageId] ?? defaultVendors;
    vendors.forEach(item => {
      if (item.id === action.payload.id) {
        item.css = action.payload.css ?? item.css;
        item.js = action.payload.js ?? item.js;
      }
    });
    state[pageId] = vendors;
  }),
  handleAction('@Global/deleteVendor', ({ state, action }) => {
    const pageId = getPageInfo('id');
    state[pageId] = state[pageId].filter(item => item.id !== action.payload.id);
  }),
]);
