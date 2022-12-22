import { ProductSection } from 'types/Sections';
import { createAction, createAsyncAction, createDispatchAction } from 'wiloke-react-core/utils';
import { DragMenuPath, SettingDragMenu, SettingDragMenuChildren } from '../types';

export interface SetVisibleModalStyles {
  type: 'setVisibleModalStyles';
  payload: boolean;
}

export interface SetDragMenu {
  type: 'setMegaMenu';
  payload: {
    data: SettingDragMenu[];
  };
}

export interface AddDragItem {
  type: 'createMegaMenu';
  payload: {
    newItem: SettingDragMenu;
  };
}

export interface DeleteDragItem {
  type: 'deleteMegaMenu';
  payload: {
    path: DragMenuPath;
  };
}

export interface DuplicateDragItem {
  type: 'duplicateMegaMenu';
  payload: {
    newData: SettingDragMenu[];
  };
}

export interface EditSettingMenu {
  type: 'editSettingMegaMenu';
  payload: {
    newData: Partial<SettingDragMenu | SettingDragMenuChildren>;
    path: DragMenuPath;
    currentNode: SettingDragMenu | SettingDragMenuChildren;
  };
}

export const getSectionsMegaMenu = createAsyncAction([
  '@Global/getSectionsMegaMenu/request',
  '@Global/getSectionsMegaMenu/success',
  '@Global/getSectionsMegaMenu/failure',
])<undefined, { data: ProductSection[] }, undefined>();

export const installUserMegaMenu = createAsyncAction([
  '@Global/installUserMegaMenu/request',
  '@Global/installUserMegaMenu/success',
  '@Global/installUserMegaMenu/failure',
])<{ commandId: string; onFulFill?: (responseMegaMenu: ProductSection) => void }, { commandId: string }, { commandId: string }>();

export const addUserMegaMenuFlow = createAction(
  '@Global/addUserMegaMenuFlow',
  ({
    megaMenu,
    node,
    sectionParentId,
    onDone,
  }: {
    megaMenu: ProductSection;
    node: SettingDragMenuChildren;
    sectionParentId: string;
    onDone?: () => void;
  }) => ({
    megaMenu,
    node,
    sectionParentId,
    onDone,
  }),
);
export const useAddUserMegaMenuFlow = createDispatchAction(addUserMegaMenuFlow);
