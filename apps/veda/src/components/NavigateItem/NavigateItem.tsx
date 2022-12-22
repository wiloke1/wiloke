import { FC, ReactNode, useState } from 'react';
import { FontAwesome, Text, View, ViewProps } from 'wiloke-react-core';
import offset from 'utils/functions/offset';
import { createPortal } from 'utils/functions/createPortal';
import * as styles from './styles';

export interface NavigateItemProps {
  label: string;
  labelSize?: number;
  onHover?: (value: boolean) => void;
  onClick?: () => void;
  iconCss?: ViewProps['css'];
  containerCss?: ViewProps['css'];
  summary?: string;
  AfterLabel?: ReactNode;
}

const NavigateItem: FC<NavigateItemProps> = ({ label, AfterLabel = null, labelSize = 14, iconCss, containerCss, summary, onHover, onClick }) => {
  const [visibleNote, setVisibleNote] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const el = event.currentTarget as HTMLElement;
    const { top, left } = offset(el);
    setVisibleNote(true);
    setTop(top);
    setLeft(left);
  };

  const handleMouseLeave = () => {
    setVisibleNote(false);
  };

  return (
    <View css={[styles.container, containerCss]} onMouseEnter={() => onHover?.(true)} onMouseLeave={() => onHover?.(false)} onClick={onClick}>
      <View css={{ flex: 1, display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
        <View css={{ display: 'flex', alignItems: 'center' }}>
          <Text tagName="h5" numberOfLines={1} size={labelSize}>
            {label}
          </Text>
          {AfterLabel}
        </View>
        {!!summary && (
          <View css={styles.note} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <View>
              <FontAwesome type="fas" name="info-circle" size={13} color="gray4" colorHover="primary" />
            </View>
            {visibleNote && createPortal(<View css={styles.popover(top, left)}>{summary}</View>)}
          </View>
        )}
      </View>
      <View css={styles.toggle}>
        <FontAwesome css={iconCss} type="far" name="angle-right" size={16} color="gray9" colorHover="primary" />
      </View>
    </View>
  );
};

export default NavigateItem;
