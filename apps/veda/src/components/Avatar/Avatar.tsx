import LazyImage from 'components/LazyImage';
import React, { FC } from 'react';
import { Text, View, ViewProps } from 'wiloke-react-core';
import { memoization } from 'wiloke-react-core/utils';
import avatarColors from './avatarColors';
import AvatarLoading from './AvatarLoading';
import * as styles from './styles';

export interface AvatarProps extends Pick<ViewProps, 'radius' | 'className' | 'css'> {
  /** Kích thước của avatar */
  size?: number;
  /** Tên user */
  name?: string;
  /** Avatar uri */
  uri?: string;
  /** Background icon */
  backgroundColor?: string;
}

interface AvatarStatic {
  Loading: typeof AvatarLoading;
}

const Avatar: FC<AvatarProps> & AvatarStatic = ({ uri, size = 30, name = '', backgroundColor = '', radius = 'pill', css, ...rest }) => {
  const textSize = size / 2 < 30 ? size / 2 : 30;
  const nameMatch = name.match(/^[^0-9]|\d/g);
  const text = !!name ? (!!nameMatch ? nameMatch[0].toUpperCase() : '') : '';
  const backgroundIndex = Math.floor(text.charCodeAt(0) % avatarColors.length);
  const bg = backgroundColor || avatarColors[backgroundIndex];

  if (!!uri) {
    return (
      <LazyImage
        src={uri}
        containerCss={{ borderRadius: `${radius}px`, width: `${size}px`, height: `${size}px`, maxHeight: `${size}px` }}
        imageCss={{ height: '100%' }}
        ratioPercent={0}
      />
    );
  }

  return (
    <View {...rest} radius={radius} css={[styles.container(size), styles.background(bg), css]}>
      <Text size={textSize} css={{ lineHeight: `${textSize * 2}px`, color: '#fff' }}>
        {text}
      </Text>
    </View>
  );
};

Avatar.Loading = AvatarLoading;

export default memoization(Avatar);
