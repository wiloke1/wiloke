import { ReactNode, useEffect, useState } from 'react';
import { View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

export interface TabItem<T extends string> {
  label: string;
  value: T;
}

export interface SimpleTabsProps<T extends string> {
  data: TabItem<T>[];
  defaultValue: T;
  value?: T;
  containerCss?: ViewProps['css'];
  tabCss?: ViewProps['css'];
  tabItemCss?: (active: boolean) => ViewProps['css'];
  tabHide?: boolean;
  highlightIndex?: number;
  TabRight?: ReactNode;
  renderItem?: (tabItem: TabItem<T>, index: number) => ReactNode;
  children: ReactNode | ((value: T) => ReactNode);
  onChange?: (value: T) => void;
}

const SimpleTabs = <T extends string>({
  data,
  defaultValue,
  value,
  containerCss,
  tabCss,
  tabItemCss,
  tabHide = false,
  highlightIndex,
  renderItem,
  children,
  TabRight,
  onChange,
}: SimpleTabsProps<T>) => {
  const [tabActive, setTabActive] = useState<T>(defaultValue);

  useEffect(() => {
    if (!!value && value !== tabActive) {
      setTabActive(value);
      onChange?.(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, tabActive]);

  const renderDefaultItem = (item: TabItem<T>) => {
    return (
      <View className="SimpleTabs-default-item" key={item.value}>
        {item.label}
      </View>
    );
  };

  return (
    <View css={containerCss}>
      {!tabHide && (
        <View css={[styles.tab, tabCss]}>
          {data.map((item, index) => {
            return (
              <View
                key={item.value}
                css={[styles.item(tabActive === item.value, index === highlightIndex), tabItemCss?.(tabActive === item.value)]}
                onClick={() => {
                  setTabActive(item.value);
                  onChange?.(item.value);
                }}
              >
                {!!renderItem ? renderItem(item, index) : renderDefaultItem(item)}
              </View>
            );
          })}
          {TabRight}
        </View>
      )}
      {typeof children === 'function' ? children(tabActive) : children}
    </View>
  );
};

export default SimpleTabs;
