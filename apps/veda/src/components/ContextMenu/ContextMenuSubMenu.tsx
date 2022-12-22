import { FC } from 'react';
import { View, ViewProps } from 'wiloke-react-core';
import { SUBMENU_DISPLAY_NAME } from './constants';
import * as css from './styles';

interface ContextMenuSubMenuProps extends ViewProps {
  innerCss?: ViewProps['css'];
}

const ContextMenuSubMenu: FC<ContextMenuSubMenuProps> = ({ children, innerCss, ...rest }) => {
  return (
    <View {...rest} css={[css.subMenu, rest.css]}>
      <View css={[css.subMenuInner, innerCss]}>{children}</View>
    </View>
  );
};

ContextMenuSubMenu.displayName = SUBMENU_DISPLAY_NAME;

export default ContextMenuSubMenu;
