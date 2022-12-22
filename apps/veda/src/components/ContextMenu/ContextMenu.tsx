import { FC, ReactNode, useEffect } from 'react';
import { createPortal } from 'utils/functions/createPortal';
import { View, ViewProps } from 'wiloke-react-core';
import ContextMenuItem from './ContextMenuItem';
import ContextMenuSubMenu from './ContextMenuSubMenu';
import * as css from './styles';
import useContextMenu from './useContextMenu';

export interface ContextMenuProps {
  Trigger: ReactNode;
  triggerContainerClassName?: string;
  triggerContainerCss?: ViewProps['css'];
  root?: HTMLElement | null;
  portalClassName?: string;
  top?: number;
  left?: number;
}

interface ContextMenuStatic {
  Item: typeof ContextMenuItem;
  SubMenu: typeof ContextMenuSubMenu;
}

const ContextMenu: FC<ContextMenuProps> & ContextMenuStatic = ({
  Trigger,
  children,
  triggerContainerClassName = '',
  triggerContainerCss,
  root,
  portalClassName = '',
  top: topState = 0,
  left: leftState = 0,
}) => {
  const { triggerRef, portalRef, visible, top, left, onOpen, onClose } = useContextMenu();

  useEffect(() => {
    if (!!root) {
      root.addEventListener('contextmenu', onOpen);
      root.addEventListener('click', onClose);
      return () => {
        root.removeEventListener('contextmenu', onOpen);
        root.removeEventListener('click', onClose);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [root]);

  const portal = createPortal(
    <View ref={portalRef} className={portalClassName} css={css.contextMenu(top + topState, left + leftState)}>
      {children}
    </View>,
  );

  return (
    <>
      <View ref={triggerRef} className={triggerContainerClassName} css={triggerContainerCss} onContextMenu={onOpen} onClick={onClose}>
        {Trigger}
      </View>
      {visible && portal}
    </>
  );
};

ContextMenu.Item = ContextMenuItem;
ContextMenu.SubMenu = ContextMenuSubMenu;

export default ContextMenu;
