import { FC } from 'react';
import { View } from 'wiloke-react-core';
import Box from 'components/FieldBox';
import * as styles from './styles';

interface PageCardLoadingProps {}

export const PageCardLoading: FC<PageCardLoadingProps> = () => {
  return (
    <Box radius={6} css={{ ...styles.containerStyle3, marginBottom: '5px' }} backgroundColor="gray1">
      <View backgroundColor="gray3" width={30} height={30} radius={4} css={{ marginRight: '8px' }} />
      <View backgroundColor="gray3" height={10} radius={4} css={{ flex: '1' }} />
    </Box>
  );
};
