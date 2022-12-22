import { FC } from 'react';
import { View } from 'wiloke-react-core';
import * as styles from './styles';

export interface PreloaderProps {
  variant: number;
  backgroundColor?: string;
  color?: string;
}

const Preloader: FC<PreloaderProps> = ({ variant, backgroundColor = '#43eba6', color = '#fff' }) => {
  return (
    <View css={styles.container(backgroundColor)}>
      <View aspectRatioInPercent={75} />
      <View className="veda-preloader" css={styles.preloader(backgroundColor, color)}>
        <View className={`veda-preloader__item--${variant}`} />
      </View>
    </View>
  );
};

export default Preloader;
