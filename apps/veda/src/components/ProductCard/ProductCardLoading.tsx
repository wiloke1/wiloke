import ImagePlaceholder from 'components/ImagePlaceholder';
import { View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

interface ProductCardLoadingProps {
  cssContainer?: ViewProps['css'];
}

export const ProductCardLoading: React.FC<ProductCardLoadingProps> = ({ cssContainer }) => {
  return (
    <View css={[styles.container, cssContainer]}>
      <ImagePlaceholder />
    </View>
  );
};
