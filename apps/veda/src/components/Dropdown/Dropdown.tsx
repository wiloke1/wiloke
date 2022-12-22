import { Dropdown as DropDownAntd, DropDownProps as DropDownAntdProps } from 'antd';
import useOuterClick from 'hooks/useOuterClick';
import { FC, useRef, useState } from 'react';
import { useKey } from 'react-use';
import { FontAwesome, FontAwesomeName, Text, View, ViewProps, withStyles } from 'wiloke-react-core';
import * as styles from './styles';

export interface DataItem {
  label: string;
  value: string;
  icon?: FontAwesomeName;
  topDivider?: boolean;
  bottomDivider?: boolean;
}

const DropdownWithStyles = withStyles<any, any>(DropDownAntd as any, {}, 'overlayClassName');

export interface DropdownProps extends Omit<DropDownAntdProps, 'overlay' | 'trigger'> {
  data: DataItem[];
  overlayCss?: ViewProps['css'];
  onClick?: (value: string) => void;
}

const Dropdown: FC<DropdownProps> = ({ children, data, overlayCss, onClick, placement = 'bottomRight', ...rest }) => {
  const [visibleState, setVisibleState] = useState(rest.visible);
  const childRef = useRef<HTMLDivElement | null>(null);

  useOuterClick(childRef.current, () => {
    setVisibleState(false);
  });

  useKey('Escape', () => setVisibleState(false));

  const renderItem = (item: DataItem) => {
    return (
      <View key={item.value}>
        {!!item.topDivider && <View css={styles.divider} />}
        <View
          css={styles.item}
          onClick={event => {
            event.stopPropagation();
            onClick?.(item.value);
            setVisibleState(false);
          }}
        >
          {!!item.icon && <FontAwesome type="far" name={item.icon} size={12} color="gray7" css={styles.icon} />}
          <Text>{item.label}</Text>
        </View>
        {!!item.bottomDivider && <View css={styles.divider} />}
      </View>
    );
  };

  return (
    <>
      <DropdownWithStyles
        {...rest}
        visible={visibleState}
        placement={placement}
        trigger={['click']}
        overlay={<div>{data.map(renderItem)}</div>}
        css={[styles.overlay, overlayCss]}
      >
        <View
          ref={childRef}
          onClick={() => {
            setVisibleState(state => !state);
          }}
        >
          {children}
        </View>
      </DropdownWithStyles>
    </>
  );
};

export default Dropdown;
