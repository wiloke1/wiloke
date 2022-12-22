import Box from 'components/FieldBox';
import LazyImage from 'components/LazyImage';
import { FC } from 'react';
import { ActivityIndicator, FontAwesome, FontAwesomeName, Text, View, ViewProps } from 'wiloke-react-core';
import { PageCardLoading } from './Loading';
import { PageCardStyle2 } from './Style2';
import { PageCardStyle3 } from './Style3';
import * as styles from './styles';

type PickedProps = Pick<ViewProps, 'onClick' | 'css' | 'className' | 'borderColor' | 'borderStyle' | 'borderWidth'>;

export interface PageCardProps extends PickedProps {
  title: string;
  icon?: FontAwesomeName;
  isActive?: boolean;
  image?: string;
  loading?: boolean;
}

interface PageCardVariants {
  Style2: typeof PageCardStyle2;
  Style3: typeof PageCardStyle3;
  Loading: typeof PageCardLoading;
}

const PageCard: FC<PageCardProps> & PageCardVariants = ({
  icon = 'file',
  title,
  css,
  borderColor = 'gray3',
  borderStyle,
  borderWidth,
  className,
  isActive = false,
  loading = false,
  image,
  onClick,
}) => {
  const renderLoading = loading ? (
    <View css={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}>
      <View css={styles.overlay} />
      <View css={styles.loading}>
        <ActivityIndicator />
      </View>
    </View>
  ) : null;

  return (
    <Box
      className={className}
      radius={6}
      borderColor={borderColor}
      borderStyle={borderStyle}
      borderWidth={borderWidth}
      borderColorHover="primary"
      css={[styles.container, styles.isActive(isActive), css]}
      onClick={e => {
        if (loading) {
          return;
        } else {
          onClick?.(e);
        }
      }}
    >
      <View css={styles.iconContainer}>{image ? <LazyImage src={image} /> : <FontAwesome size={18} type="far" name={icon} css={styles.icon} />}</View>
      <Text css={styles.title(isActive)}>{title}</Text>
      {renderLoading}
    </Box>
  );
};

PageCard.Style2 = PageCardStyle2;
PageCard.Style3 = PageCardStyle3;
PageCard.Loading = PageCardLoading;

export default PageCard;
