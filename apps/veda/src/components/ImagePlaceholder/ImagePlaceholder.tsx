import { FC } from 'react';
import { FontAwesome, FontAwesomeName, View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

export interface ImagePlaceholderProps extends ViewProps {
  /** Chiều cao của placeholder. Nó sẽ không hoạt động nếu set aspectRatio */
  height?: number;
  /** Tỷ lệ của placeholder ví dụ: aspectRatio={16/9} */
  aspectRatio?: number;
  icon?: FontAwesomeName;
  size?: number;
}

const ImagePlaceholder: FC<ImagePlaceholderProps> = ({ height = 200, aspectRatio, icon = 'image', size = 40, ...rest }) => {
  return (
    <View {...rest} css={[styles.container(height, aspectRatio), rest.css]}>
      <View css={styles.inner}>
        <FontAwesome type="far" name={icon} size={size} color="gray4" />
      </View>
    </View>
  );
};

export default ImagePlaceholder;
