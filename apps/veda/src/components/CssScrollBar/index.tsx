import { FC } from 'react';
import { View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

export interface CssScrollBarProps extends ViewProps {
  innerRef?: (element: HTMLDivElement) => void;
}

export const CssScrollBar: FC<CssScrollBarProps> = ({ innerRef, css, children, ...rest }) => {
  return (
    <View {...rest} ref={innerRef} css={[styles.container, css]}>
      {children}
    </View>
  );
};
