import ImagePlaceholder from 'components/ImagePlaceholder';
import LazyImage from 'components/LazyImage';
import { FontAwesome, Text, View, ViewProps } from 'wiloke-react-core';
import * as styles from './styles';

interface BadgeWithImageProps {
  css?: ViewProps['css'];
  image?: string;
  title: string;
  onDelete?: () => void;
}

export const BadgeWithImage: React.FC<BadgeWithImageProps> = ({ image, title, css, onDelete }) => {
  return (
    <View css={[styles.withImageContainer, css]}>
      <View css={styles.imageContainer}>
        {image ? (
          <LazyImage src={image} containerCss={{ width: `25px`, height: `25px`, maxHeight: `25px` }} imageCss={{ height: '100%' }} ratioPercent={0} />
        ) : (
          <ImagePlaceholder css={{ width: '25px !important' }} height={25} size={24} />
        )}
      </View>

      <Text numberOfLines={1} css={styles.withImageTitle}>
        {title}
      </Text>

      <FontAwesome type="far" name="times" onClick={onDelete} css={styles.deleteIcon} color="gray5" />
    </View>
  );
};
