import React, { FC } from 'react';
import { i18n } from 'translation';
import { Text, View } from 'wiloke-react-core';
import * as styles from './styles';

export interface NotEnoughWidthProps {}

const NotEnoughWidth: FC<NotEnoughWidthProps> = () => {
  return (
    <View css={styles.container}>
      <Text fontFamily="primary" tagName="h2">
        {i18n.t('general.not_enough_width')}
      </Text>
    </View>
  );
};

export default NotEnoughWidth;
