import Title from 'components/Title';
import { FC } from 'react';
import { View } from 'wiloke-react-core';
import { BoxProps } from '.';
import * as styles from './styles';

interface BoxWithTitleProps extends BoxProps {
  title?: string;
  description?: string;
}

export const BoxWithTitle: FC<BoxWithTitleProps> = ({
  title = 'Title',
  description,
  borderColor = 'gray5',
  borderStyle = 'solid',
  borderWidth = 1,
  backgroundColor = 'light',
  radius = 5,
  style,
  children,
  css,
  ...rest
}) => {
  const combineProps = { style, css: [styles.container, css], ...rest };
  return (
    <View
      {...combineProps}
      radius={radius}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderStyle={borderStyle}
      borderWidth={borderWidth}
    >
      <Title text={description} title={title} titleCss={{ fontSize: '24px' }} css={{ marginBottom: '15px' }} />

      {children}
    </View>
  );
};
