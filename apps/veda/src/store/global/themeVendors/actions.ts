import { Vendor } from 'types/Result';

export interface SetThemeVendorsAction {
  type: 'setThemeVendors';
  payload: {
    vendors: Vendor[];
  };
}

export interface AddThemeVendorAction {
  type: 'addThemeVendor';
  payload: undefined;
}

export interface UpdateThemeVendorAction {
  type: 'updateThemeVendorValue';
  payload: Partial<Vendor>;
}

export interface DeleteThemeVendorAction {
  type: 'deleteThemeVendor';
  payload: {
    id: string;
  };
}
