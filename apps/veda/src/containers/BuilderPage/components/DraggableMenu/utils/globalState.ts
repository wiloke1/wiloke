import { createGlobalState } from 'react-use';
import { DragMenuPath, SettingDragMenu, NavigationMode } from '../types';

export const useVisibleDrag = createGlobalState(false);
export const useCurrentNode = createGlobalState<SettingDragMenu>();
export const useCurrentPath = createGlobalState<DragMenuPath>();
export const useNavigationMode = createGlobalState<NavigationMode>('collapse');
