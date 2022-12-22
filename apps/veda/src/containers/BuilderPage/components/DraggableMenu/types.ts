import { IconValue } from 'components/IconUIField';
import { TreeItem } from 'react-sortable-tree';
import { ViewProps } from 'wiloke-react-core';

export interface DraggableMenuProps {
  /** mega menu chuyền vào */
  settings: SettingDragMenu[];
  /** có 2 mode cơ bản, 1 là collapse, 2 là drawer */
  mode?: NavigationMode;
  label: string;
  multiLevelEnabled: boolean;
  /** Sự kiện onChange, params trả về là 1 mảng menu */
  onChange?: (result: SettingDragMenu[]) => void;
  goBack?: () => void;
}

export type NavigationMode = 'collapse' | 'drawer';

export interface MyMenuItem extends TreeItem {
  id: string;
  href: string;
  icon: IconValue;
  iconEnabled: boolean;
  label: string;
  hotSpotEnabled?: boolean;
  hotSpotContent?: string;
  hasMegaMenu?: boolean;
  children?: SettingDragMenuChildren[];
}

export interface SettingDragMenu extends MyMenuItem {}

export interface SettingDragMenuChildren extends MyMenuItem {
  /** id frontend mega menu */
  megaMenuId: string;
  /** Bật/tắt mega menu */
  megaMenuEnabled: boolean;
}

export type DragMenuPath = Array<string | number>;

export interface MenuFormProps {
  data: SettingDragMenu | SettingDragMenuChildren;
  path: DragMenuPath;
  onChange?: (params: Partial<Record<keyof SettingDragMenu, any>> | Partial<Record<keyof SettingDragMenuChildren, any>>) => void;
}

export interface DraggableMenuButtonProps {
  css?: ViewProps['css'];
  settings?: SettingDragMenu[];
  onClick?: () => void;
}
