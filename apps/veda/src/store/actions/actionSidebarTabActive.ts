import { createAction, createDispatchAction } from 'wiloke-react-core/utils';

export type SidebarTabActiveInput = 'sections' | 'add-ons';

export const setSidebarTabActive = createAction('@Global/setSidebarTabActive', (tabActive: SidebarTabActiveInput) => ({ tabActive }));

export const useSetSidebarTabActive = createDispatchAction(setSidebarTabActive);
