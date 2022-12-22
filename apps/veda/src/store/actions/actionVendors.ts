import { Vendor } from 'types/Result';
import { createAction, createDispatchAction } from 'wiloke-react-core/utils';

export const setVendors = createAction('@Global/setVendors', (payload: { vendors: Vendor[]; pageId?: string }) => payload);
export const addVendor = createAction('@Global/addVendor');
export const updateVendorValue = createAction('@Global/updateVendorValue', (vendor: Partial<Vendor>) => vendor);
export const deleteVendor = createAction('@Global/deleteVendor', (id: string) => ({ id }));

export const useSetVendors = createDispatchAction(setVendors);
export const useAddVendor = createDispatchAction(addVendor);
export const useUpdateVendorValue = createDispatchAction(updateVendorValue);
export const useDeleteVendor = createDispatchAction(deleteVendor);
