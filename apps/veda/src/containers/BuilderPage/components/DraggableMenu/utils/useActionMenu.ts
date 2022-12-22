import { DragMenuPath, SettingDragMenu, SettingDragMenuChildren } from 'containers/BuilderPage/components/DraggableMenu/types';
import { insert } from 'ramda';
import { addNodeUnderParent, changeNodeAtPath, getNodeAtPath, removeNodeAtPath } from 'react-sortable-tree';
import { useDeleteSection } from 'store/actions/actionPages';
import { useDeleteMegaMenuOfHeaderFooter } from 'store/global/megaMenusOfHeaderFooter';
import { v4 } from 'uuid';
import { useNavigationTree, useNavigationTreeOnChange } from '../globalState';
import { flatDataOnChange } from './flatDataOnChange';
import { getNodeIndex } from './getNodeKey';
import { useCurrentNode, useCurrentPath, useVisibleDrag } from './globalState';
const count: Record<string, number> = {};

export const useActionMenu = () => {
  // const { settings } = useSelector(megaMenuSelector);

  const [, setNode] = useCurrentNode();
  const [, setPath] = useCurrentPath();
  const [, setVisible] = useVisibleDrag();

  const [settings, setSettings] = useNavigationTree();
  const [{ fnc: onChange }] = useNavigationTreeOnChange();
  const deleteSection = useDeleteSection();
  const deleteMegaMenuOfHeaderFooter = useDeleteMegaMenuOfHeaderFooter();

  const handleUpdate_ = (data: SettingDragMenu[]) => {
    const flatData = flatDataOnChange(data);
    setSettings(flatData);
    onChange?.(flatData);
  };

  const _duplicate = (path: DragMenuPath) => () => {
    const currentItem = getNodeAtPath({
      getNodeKey: getNodeIndex,
      path,
      treeData: settings,
      ignoreCollapsed: true,
    });
    const _currentNode = currentItem?.node as SettingDragMenu;
    count[_currentNode.label as string] = count[_currentNode.label as string] ? count[_currentNode.label as string] + 1 : 1;

    const newNode = {
      ..._currentNode,
      id: `id_${v4()}`,
      label: (_currentNode.label as string).concat(count[_currentNode.label as string].toString()),
      children:
        Array.isArray(_currentNode?.children) && _currentNode?.children.length > 0
          ? (_currentNode?.children).map(child => {
              return {
                ...child,
                id: `id_${v4()}`,
                children:
                  Array.isArray(child?.children) && child?.children.length > 0
                    ? child.children.map(innerChild => {
                        return {
                          ...innerChild,
                          id: `id_${v4()}`,
                        };
                      })
                    : [],
              };
            })
          : [],
    } as SettingDragMenu;

    const siblingIndex = settings.findIndex(item => item.id === _currentNode.id);

    if (siblingIndex > -1) {
      const newSettings = insert(siblingIndex + 1, newNode, settings);
      handleUpdate_(newSettings as SettingDragMenu[]);
    } else {
      const duplicateData = addNodeUnderParent({
        getNodeKey: getNodeIndex,
        treeData: settings,
        parentKey: path[path.length - 2],
        newNode,
      }).treeData;

      handleUpdate_(duplicateData as SettingDragMenu[]);
    }
  };

  const _deleteItem = (path: DragMenuPath, node: SettingDragMenu) => () => {
    const newState = removeNodeAtPath({
      treeData: settings,
      // getNodeKey: getNodeKey,
      getNodeKey: getNodeIndex,
      path,
      ignoreCollapsed: true,
    });

    handleUpdate_(newState as SettingDragMenu[]);

    if (!!(node as SettingDragMenuChildren).megaMenuId) {
      deleteSection((node as SettingDragMenuChildren).megaMenuId);
      deleteMegaMenuOfHeaderFooter({ sectionId: (node as SettingDragMenuChildren).megaMenuId });
    }
  };

  const _handleEdit = (node: SettingDragMenu, path: DragMenuPath) => () => {
    setNode(node);
    setVisible(true);
    setPath(path);
  };

  const _onChangeForm = (
    data: Partial<Record<keyof SettingDragMenu | keyof SettingDragMenuChildren, any>>,
    currentNode: SettingDragMenu,
    path: DragMenuPath,
  ) => {
    const updateData = changeNodeAtPath({
      getNodeKey: getNodeIndex,
      treeData: settings,
      path: path,
      newNode: {
        ...currentNode,
        ...data,
      },
      ignoreCollapsed: true,
    });

    handleUpdate_(updateData as SettingDragMenu[]);
  };

  const _createItem = () => {
    const newItem: SettingDragMenu = {
      id: `id_${v4()}`,
      href: '#',
      label: 'New Item',
      icon: '<i class="far fa-home"></i>',
      iconEnabled: false,
      expanded: true,
      children: [],
    };
    const newSettings = [...settings, newItem];
    handleUpdate_(newSettings as SettingDragMenu[]);
  };

  return {
    handleDuplicate: _duplicate,
    handleDelete: _deleteItem,
    handleEdit: _handleEdit,
    handleChangeForm: _onChangeForm,
    handleCreate: _createItem,
  };
};
