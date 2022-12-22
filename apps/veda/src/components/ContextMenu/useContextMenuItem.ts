import { ReactNode, useState } from 'react';
import { SUBMENU_DISPLAY_NAME } from './constants';
import useGlobalState from './useGlobalState';
import { getDisplayName } from './utils';

const useContextMenuItem = (children: ReactNode) => {
  const { clearState } = useGlobalState();
  const [childrenActive, setChildrenActiveState] = useState<ReactNode>(null);
  const subMenuReactNode = Array.isArray(children)
    ? children.filter(child => {
        const displayName = getDisplayName(child);
        return displayName === SUBMENU_DISPLAY_NAME;
      })
    : [];
  const isSubMenu = subMenuReactNode.length > 0;

  if (subMenuReactNode.length > 1) {
    throw new Error('Chỉ được sử dụng 1 submenu trong 1 item');
  }

  const setChildrenActive = (children: ReactNode) => () => {
    setChildrenActiveState(children);
  };

  const removeChildrenActive = () => {
    setChildrenActiveState(null);
  };

  return {
    clearState,
    isSubMenu,
    childrenActive,
    setChildrenActive,
    removeChildrenActive,
  };
};

export default useContextMenuItem;
