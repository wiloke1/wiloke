import Avatar from 'components/Avatar';
import Box from 'components/FieldBox';
import { FC } from 'react';
import { ActivityIndicator, Text, useTheme, View } from 'wiloke-react-core';
import { PageCardProps } from './PageCard';
import * as styles from './styles';

export const PageCardStyle2: FC<Omit<PageCardProps, 'icon'>> = ({
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
  const { colors } = useTheme();

  return (
    <Box
      className={className}
      radius={6}
      borderColor={borderColor}
      borderStyle={borderStyle}
      borderWidth={borderWidth}
      css={[styles.isActive(isActive), styles.containerStyle2, css]}
      onClick={e => {
        if (loading) {
          return;
        } else {
          onClick?.(e);
        }
      }}
    >
      <View css={styles.title(isActive)}>
        <Text tagName="h4" size={14}>
          {title}
        </Text>
        {loading ? (
          <View css={{ marginLeft: '4px' }}>
            <ActivityIndicator size={13} />
          </View>
        ) : null}
      </View>
      <Avatar name={title} uri={image} radius={4} backgroundColor={colors.gray3} />
    </Box>
  );
};
