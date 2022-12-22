import { FC } from 'react';
import { View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

export interface HotspotProps extends ViewProps {}

const Hotspot: FC<HotspotProps> = ({ css, ...rest }) => {
  return (
    <View {...rest} css={[styles.container, css]}>
      <View css={styles.inner} />
    </View>
  );
};

export default Hotspot;
