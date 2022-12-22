import React, { Children, FC } from 'react';
import { View, ViewProps } from 'wiloke-react-core';
import { SUBMENU_DISPLAY_NAME } from './constants';
import useContextMenuItem from './useContextMenuItem';
import { getDisplayName } from './utils';

interface ContextMenuItemProps extends Omit<ViewProps, 'onContextMenu' | 'onContextMenuCapture'> {}

const ContextMenuItem: FC<ContextMenuItemProps> = ({ children, ...rest }) => {
  const { childrenActive, clearState, setChildrenActive, removeChildrenActive, isSubMenu } = useContextMenuItem(children);
  const { css: _cssIgnore, ...propsIgnoreCss } = rest;

  const handleItemContextMenu = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    clearState();
  };

  const renderChildren = () => {
    if (isSubMenu) {
      return Children.map(children, child => {
        const displayName = getDisplayName(child);
        if (displayName === SUBMENU_DISPLAY_NAME) {
          return (
            <View onMouseEnter={setChildrenActive(children)} onMouseLeave={removeChildrenActive}>
              {childrenActive === children && child}
            </View>
          );
        }
        return (
          <View onMouseEnter={setChildrenActive(children)} onMouseLeave={removeChildrenActive}>
            {child}
          </View>
        );
      });
    }
    return Children.map(children, child => {
      return (
        <View onClick={clearState} onContextMenu={handleItemContextMenu}>
          {child}
        </View>
      );
    });
  };

  return (
    <View {...propsIgnoreCss} style={{ position: 'relative' }}>
      {renderChildren()}
    </View>
  );
};

export default ContextMenuItem;
