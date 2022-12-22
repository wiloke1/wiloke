import React, { CSSProperties, FC } from 'react';
import { View } from 'wiloke-react-core';
import * as css from './styles';

interface ChooseCardLoadingProps {
  imgHeight?: number;
  imgWidth?: number;
  containerStyle?: CSSProperties;
}

const ChooseCardLoading: FC<ChooseCardLoadingProps> = ({ imgHeight, imgWidth, containerStyle }) => {
  const aspectRatioStyle = !imgHeight || !imgWidth ? { paddingTop: `${Math.random() * 125}%`, width: '100%', height: 0 } : {};
  return (
    <View style={containerStyle} css={css.container(true)}>
      <View css={css.blank}>
        <View style={aspectRatioStyle} width={imgWidth} height={imgHeight} backgroundColor="gray4" />
      </View>
    </View>
  );
};

export default ChooseCardLoading;
