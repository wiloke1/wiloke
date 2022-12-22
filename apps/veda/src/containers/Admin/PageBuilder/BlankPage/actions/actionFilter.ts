import { FilterTypePage } from 'containers/Admin/types';
import { createAction, createDispatchAction } from 'wiloke-react-core/utils';

export const actionSelectManyItems = createAction('@BlankPage/selectIds', (ids: string[]) => ({ ids }));
export const useSelectManyItems = createDispatchAction(actionSelectManyItems);

export const actionFilterPageType = createAction('@BlankPage/FilterPageType', (pageType: FilterTypePage) => ({ pageType }));
export const useFilterPageType = createDispatchAction(actionFilterPageType);

export const actionIsSelectAll = createAction('@BlankPage/isSelectAll', (isSelectAll: boolean) => ({ isSelectAll }));
export const useIsSelectAll = createDispatchAction(actionIsSelectAll);

export const changSearchKey = createAction('@BlankPage/changSearchKey', (search: string) => ({ search }));
export const useChangeSearchKey = createDispatchAction(changSearchKey);
