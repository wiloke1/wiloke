import { createGlobalState } from 'react-use';
import { DraggableMenuProps, SettingDragMenu } from './types';

export const useNavigationTree = createGlobalState<SettingDragMenu[]>([]);
export const useNavigationTreeOnChange = createGlobalState<{ fnc: DraggableMenuProps['onChange'] }>({ fnc: undefined });
