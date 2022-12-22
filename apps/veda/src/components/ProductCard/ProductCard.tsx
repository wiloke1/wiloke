import ImagePlaceholder from 'components/ImagePlaceholder';
import LazyImage from 'components/LazyImage';
import { FC } from 'react';
import { Text, View } from 'wiloke-react-core';
import { ProductCardLoading } from './ProductCardLoading';
import * as styles from './styles';

export interface ProductCardProps {
  /** Đường dẫn của feature image */
  imageSrc?: string;
  /** Tỷ lệ của placeholder ví dụ: aspectRatio={16/9} */
  imageAspectRatio: number;
  backgroundSize?: 'cover' | 'contain';
  /** Tiêu đề sản phẩm */
  title: string;
  /** Hiển thị sale ở góc */
  saleText?: string;
  /** Hiển thị giá tiền */
  price?: string;
  /** Hiển thị giá tiền ban đầu khi chưa sale */
  prevPrice?: string;
  /** Hiển thị image placeholder */
  aspectRatioPlaceHolder?: number;
}

const ProductCard: FC<ProductCardProps> & {
  Loading: typeof ProductCardLoading;
} = ({ imageSrc, imageAspectRatio, title, price, saleText, prevPrice, backgroundSize = 'cover', aspectRatioPlaceHolder = 16 / 9 }) => {
  return (
    <View css={styles.container}>
      <View css={styles.imageWrap}>
        {imageSrc ? (
          <LazyImage src={imageSrc} backgroundSize={backgroundSize} ratioPercent={(1 / imageAspectRatio) * 100} />
        ) : (
          <ImagePlaceholder aspectRatio={aspectRatioPlaceHolder} />
        )}

        {!!saleText && <View css={styles.sale}>{saleText}</View>}
      </View>
      <View css={styles.body}>
        <Text tagName="h3" numberOfLines={1} css={styles.title}>
          {title}
        </Text>
        {!!price && <View css={styles.price}>{price}</View>}
        {!!prevPrice && <View css={[styles.price, { textDecoration: 'line-through' }]}>{prevPrice}</View>}
      </View>
    </View>
  );
};
ProductCard.Loading = ProductCardLoading;

export default ProductCard;
