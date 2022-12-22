import React, { FC, memo } from 'react';
import { View, Text, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

export interface IconTextProps {
  iconName: string;
  title: string;
  text: string;
  active?: boolean;
  css?: ViewProps['css'];
}

const IconText: FC<IconTextProps> = ({ iconName, title, text, active = false, css }) => {
  return (
    <View radius={16} backgroundColor="light" css={[styles.container(active), css]}>
      <View tagName="img" src={iconName} css={styles.icon} />
      <Text tagName="h2" size={16} css={{ marginBottom: '8px' }}>
        {title}
      </Text>
      <Text>{text}</Text>
    </View>
  );
};

export default memo(IconText);
