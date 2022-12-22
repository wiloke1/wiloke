import Button from 'components/Button';
import LazyImage from 'components/LazyImage';
import { FC } from 'react';
import { View } from 'wiloke-react-core';
import { ImageTextCardProps } from '.';
import * as styles from './styles';

interface ImageTextCard3Props extends Omit<ImageTextCardProps, 'onSave' | 'saved' | 'placeholderAspectRatio' | 'buttonText' | 'src'> {
  src: {
    src: string;
    width: number;
    height: number;
  };
}

export const ImageTextCard3: FC<ImageTextCard3Props> = ({ label, disabled = false, loading, onAdd, src }) => {
  const _handleClick = () => {
    if (!!disabled) {
      return;
    }
    onAdd?.();
  };

  return (
    <View borderColor="gray3" borderStyle="solid" borderWidth={1} css={styles.container3(disabled)} onClick={_handleClick}>
      <LazyImage
        src={src.src}
        widthImage={src.width && src.width > 0 ? src.width : undefined}
        heightImage={src.height && src.height > 0 ? src.height : undefined}
      />
      <Button loading={loading} size="extra-small" backgroundColor="light" color="dark" css={styles.buttonAdd3} radius={6}>
        {label}
      </Button>
    </View>
  );
};
