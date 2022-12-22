import { VedaLoadingItem } from 'components/VedaLoadingItem';
import { FC } from 'react';
import { css, Theme, View } from 'wiloke-react-core';

const styles = {
  container: ({ colors }: Theme) => css`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999999;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${colors.light};
  `,
};

const LoadingFullScreen: FC = () => {
  return (
    <View css={styles.container}>
      <VedaLoadingItem />
    </View>
  );
};

export default LoadingFullScreen;
