import TabCore, { TabsProps } from 'rc-tabs';
import 'rc-tabs/assets/index.css';
import { RenderTabBar } from 'rc-tabs/lib/interface';
import React, { FC, KeyboardEvent, MouseEvent, ReactNode } from 'react';
import { useTheme, View, ViewProps } from 'wiloke-react-core';
import { classNames } from 'wiloke-react-core/utils';
import * as styles from './styles';
import { TabPaneBase } from './TabPane';

export type TabPosition = 'left' | 'right' | 'top' | 'bottom';
export type ScrollDirection = 'top' | 'bottom' | 'left' | 'right';

type PickTabsProp = Pick<
  TabsProps,
  | 'activeKey'
  | 'className'
  | 'children'
  | 'onChange'
  | 'onTabClick'
  | 'onTabScroll'
  | 'renderTabBar'
  | 'moreIcon'
  | 'tabPosition'
  | 'defaultActiveKey'
>;

export interface TabProps extends PickTabsProp {
  /** key của tabPanel đang active hiện tại */
  activeKey?: string;
  /** Default active tab */
  defaultActiveKey?: string;
  /** Vị trí của tab */
  tabPosition?: TabPosition;
  /** Hiệu ứng khi chuyển tiêu đề tab */
  navBarAnimated?: boolean;
  /** Hiệu ứng khi chuyển nội dung tab */
  tabPaneAnimated?: boolean;
  /** Khoảng cách giữa mỗi tab title */
  tabTitleGutter?: number;
  /** More Icon */
  moreIcon?: ReactNode;
  /** className */
  className?: string;
  css?: ViewProps['css'];
  variants?: 'style1' | 'style2';
  /** render navbar */
  renderTabBar?: RenderTabBar;
  /** Sự kiện onChange */
  onChange?: (activeKey: string) => void;
  /** Sự kiện scroll tab */
  onTabScroll?: (info: { direction: ScrollDirection }) => void;
  /** Sự kiện được gọi khi click vào tab */
  onTabClick?: (activeKey: string, e: KeyboardEvent | MouseEvent) => void;
  onValueChange?: (args: any) => void;
}

interface TabsStatic {
  Pane: typeof TabPaneBase;
}

const Tabs: FC<TabProps> & TabsStatic = ({
  children,
  className,
  defaultActiveKey = '1',
  navBarAnimated = false,
  tabPaneAnimated = false,
  tabPosition = 'top',
  tabTitleGutter = 10,
  variants = 'style1',
  moreIcon = '...',
  activeKey,
  css,
  onTabScroll,
  onChange,
  onTabClick,
  renderTabBar,
  onValueChange,
}) => {
  const { direction } = useTheme();

  const handleOnChange = (args: string) => {
    onChange?.(args);
    onValueChange?.(args);
  };

  return (
    <View css={[variants === 'style1' ? styles.container : styles.container2, css]}>
      <TabCore
        activeKey={activeKey}
        direction={direction}
        defaultActiveKey={defaultActiveKey}
        tabPosition={tabPosition}
        animated={{ inkBar: navBarAnimated, tabPane: tabPaneAnimated }}
        tabBarGutter={tabTitleGutter}
        moreIcon={moreIcon}
        className={classNames('Tabs', className)}
        onChange={handleOnChange}
        onTabClick={onTabClick}
        onTabScroll={onTabScroll}
        renderTabBar={renderTabBar}
      >
        {children}
      </TabCore>
    </View>
  );
};

Tabs.Pane = TabPaneBase;

export { Tabs };
