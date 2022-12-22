import ScrollBars from 'components/ScrollBars';
import { useEffect } from 'react';
import { Children, FC, ReactElement, ReactNode, useState } from 'react';
import { View, ViewProps } from 'wiloke-react-core';
import { InlineMenuProvider } from './context';
import InlineMenuItem, { InlineMenuItemProps } from './InlineMenuItem';
import InlineMenuSubMenu, { InlineMenuSubMenuProps } from './InlineMenuSubMenu';
import * as styles from './styles';

export interface InlineMenuProps {
  containerCss?: ViewProps['css'];
  children: ReactNode;
  defaultItemIds?: string[];
  width?: number;
  disabledScroll?: boolean;
  onChange?: (ids: string[]) => void;
}

export type InlineMenuFC = FC<InlineMenuProps> & {
  Item: FC<Omit<InlineMenuItemProps, 'parentId'>>;
  SubMenu: FC<Omit<InlineMenuSubMenuProps, 'childId'>>;
};

const InlineMenu: InlineMenuFC = ({ children, containerCss, defaultItemIds = [], width, disabledScroll = false, onChange }) => {
  const [ids, setIds] = useState(defaultItemIds);

  useEffect(() => {
    onChange?.(ids);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids]);

  const renderChild = (child: ReactNode) => {
    const reactElement = child as ReactElement;
    if (reactElement.type === InlineMenuSubMenu) {
      const subMenuProps = reactElement.props as InlineMenuSubMenuProps;
      return (
        <InlineMenuSubMenu
          title={subMenuProps.title}
          itemId={subMenuProps.itemId}
          childId={
            typeof subMenuProps.children === 'object'
              ? Array.isArray(subMenuProps.children)
                ? (subMenuProps.children as ReactElement[])[0]?.props.itemId
                : (subMenuProps.children as any)?.props.itemId
              : ''
          }
          width={subMenuProps.width}
          titleWidth={subMenuProps.titleWidth}
        >
          {subMenuProps.Header}
          {Children.map(subMenuProps.children, child => {
            const reactElement = child as ReactElement;
            const itemProps = reactElement.props as InlineMenuItemProps;
            return (
              <InlineMenuItem itemId={itemProps.itemId} parentId={subMenuProps.itemId} width={itemProps.width}>
                {itemProps.children}
              </InlineMenuItem>
            );
          })}
        </InlineMenuSubMenu>
      );
    }
    return child;
  };

  return (
    <InlineMenuProvider
      value={{
        ids,
        setIds: ids => {
          setIds(ids);
        },
      }}
    >
      <View css={[styles.container, containerCss]}>
        <View css={styles.inner(width)}>
          {disabledScroll ? (
            Children.map(children, renderChild)
          ) : (
            <ScrollBars css={{ height: '100%' }}>{Children.map(children, renderChild)}</ScrollBars>
          )}
        </View>
      </View>
    </InlineMenuProvider>
  );
};

InlineMenu.Item = InlineMenuItem;
InlineMenu.SubMenu = InlineMenuSubMenu;

export default InlineMenu;
