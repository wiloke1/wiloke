import Box from 'components/FieldBox';
import ImagePlaceholder from 'components/ImagePlaceholder';
import LazyImage from 'components/LazyImage';
import Tooltip from 'components/Tooltip';
import { FC } from 'react';
import { ActivityIndicator, FontAwesome, Text, View } from 'wiloke-react-core';
import { PageCardProps } from './PageCard';
import * as styles from './styles';

export interface PageCardStyle3 extends Omit<PageCardProps, 'icon'> {
  isFailed?: boolean;
}

export const PageCardStyle3: FC<PageCardStyle3> = ({
  title,
  css,
  borderColor = 'gray3',
  borderStyle,
  borderWidth,
  className,
  isActive = false,
  loading = false,
  isFailed = false,
  image,
  onClick,
}) => {
  const renderIcon = () => {
    if (loading) {
      return <ActivityIndicator size={15} />;
    }
    //
    if (isFailed) {
      return (
        <Tooltip portal text="Click the item again to request data">
          <View backgroundColor="warning" css={styles.activeStyle3}>
            <FontAwesome type="fas" name="exclamation" size={13} color="light" />
          </View>
        </Tooltip>
      );
    }
    if (isActive) {
      return (
        <View backgroundColor="primary" css={styles.activeStyle3}>
          <FontAwesome type="far" name="check" size={13} color="light" />
        </View>
      );
    }

    return null;
  };

  return (
    <Box
      className={className}
      radius={6}
      borderColor={borderColor}
      borderStyle={borderStyle}
      borderWidth={borderWidth}
      css={[styles.containerStyle3, css]}
      onClick={e => {
        if (loading) {
          return;
        } else {
          onClick?.(e);
        }
      }}
    >
      <View css={styles.bodyStyle3}>
        <View css={styles.iconStyle3} backgroundColor="gray1" borderColor="gray3" borderStyle="solid" borderWidth={1}>
          {image ? (
            <LazyImage src={image} containerCss={styles.iconStyle3} imageCss={{ height: '100%' }} ratioPercent={0} />
          ) : (
            <ImagePlaceholder height={30} size={20} radius={4} />
          )}
        </View>
        <View css={styles.titleStyle3}>
          <Text tagName="h4" size={14} numberOfLines={1}>
            {title}
          </Text>
        </View>
      </View>

      {renderIcon()}
    </Box>
  );
};
