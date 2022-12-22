import React, { CSSProperties, FC } from 'react';
import { View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

export interface LazyImageProps {
  /** src của ảnh */
  src?: string;
  /** title của ảnh */
  alt?: string;
  /** width của ảnh */
  widthImage?: number;
  /** height của ảnh */
  heightImage?: number;
  /** css của container */
  containerCss?: ViewProps['css'];
  /** css của ảnh */
  imageCss?: CSSProperties;
  /**
   * Tỉ lệ của ảnh,vd: 56.25.
   * Dùng khi ảnh không có width + height */
  ratioPercent?: number;
  /** Dùng khi ảnh không có width + height */
  backgroundSize?: 'cover' | 'contain';
  backgroundColor?: ViewProps['backgroundColor'];
  previewUrl?: string;
}

const LazyImage: FC<LazyImageProps> = ({
  src = '',
  heightImage,
  widthImage,
  alt,
  containerCss,
  imageCss,
  ratioPercent = 56.25,
  backgroundSize = 'cover',
  backgroundColor = 'light',
  previewUrl,
}) => {
  const ratio = widthImage && heightImage ? `${100 * (heightImage / widthImage)}%` : `${ratioPercent}%`;
  const hasWidthHeight = widthImage && heightImage;

  if (hasWidthHeight) {
    return (
      <View backgroundColor={backgroundColor} css={[{ paddingTop: ratio }, styles.container, containerCss]}>
        <img
          className="veda-lazyload"
          data-intrinsic-width={widthImage}
          data-intrinsic-height={heightImage}
          alt={alt}
          src={src}
          style={{ marginTop: `-${ratio}`, ...imageCss }}
        />
      </View>
    );
  }

  return (
    <View css={[styles.container, containerCss]}>
      <View
        data-veda-lazyloaded={false}
        css={[styles.image, { paddingTop: `${ratioPercent}%`, backgroundSize }]}
        style={{ backgroundImage: `url('${previewUrl ?? src}')`, ...imageCss }}
        backgroundColor={backgroundColor}
      />
    </View>
  );
};

export default LazyImage;
