import { FC } from 'react';
import { FontAwesome, FontAwesomeName, View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';
import { BadgeWithImage } from './WithImage';

export interface BadgeProps {
  text: string;
  iconName?: FontAwesomeName;
  active?: boolean;
  onClick?: ViewProps['onClick'];
  containerCss?: ViewProps['css'];
}

interface Variants {
  WithImage: typeof BadgeWithImage;
}

export const Badge: FC<BadgeProps> & Variants = ({ text, iconName, active = false, containerCss, onClick }) => {
  return (
    <View css={[styles.container, containerCss]} onClick={onClick}>
      {iconName ? <FontAwesome type="far" name={iconName} color={active ? 'primary' : 'gray8'} /> : null}
      <View fontFamily="secondary" css={styles.text(active)}>
        {text}
      </View>
    </View>
  );
};

Badge.WithImage = BadgeWithImage;
