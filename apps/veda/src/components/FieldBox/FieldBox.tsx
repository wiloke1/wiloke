import React, { CSSProperties, FC } from 'react';
import { View, ViewProps } from 'wiloke-react-core';
import { BoxWithTitle } from './BoxWithTitle';
import * as styles from './styles';

export interface BoxProps extends ViewProps {
  style?: CSSProperties;
}

const Box: FC<BoxProps> = ({
  borderColor = 'gray3',
  borderStyle = 'solid',
  borderWidth = 1,
  backgroundColor = 'light',
  radius = 5,
  style,
  children,
  css,
  ...rest
}) => {
  return (
    <View
      {...rest}
      style={style}
      css={[styles.container, css]}
      radius={radius}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderStyle={borderStyle}
      borderWidth={borderWidth}
    >
      {children}
    </View>
  );
};

export default Object.assign(Box, {
  WithTitle: BoxWithTitle,
});
