import Button from 'components/Button';
import LazyImage from 'components/LazyImage';
import Tooltip from 'components/Tooltip';
import { FC } from 'react';
import { i18n } from 'translation';
import { FontAwesome, Text, View } from 'wiloke-react-core';
import { ImageTextCardProps } from '.';
import * as styles from './styles';

interface ImageTextCard4Props extends Omit<ImageTextCardProps, 'buttonText' | 'onSave' | 'saved'> {
  loadingAdd?: boolean;
  widthImage?: number;
  heightImage?: number;
  /** Mô tả ngắn của card */
  description?: string;
  onDelete?: () => void;
}

export const ImageTextCard4: FC<ImageTextCard4Props> = ({
  src,
  loadingAdd = false,
  disabled = false,
  heightImage,
  widthImage,
  label,
  description,
  onAdd,
  onDelete,
}) => {
  return (
    <View borderColor="gray3" wilokeStyles={'parent-hover'} borderStyle="solid" borderWidth={1} css={styles.containerStyle2} radius={6}>
      <View css={styles.body2}>
        <LazyImage
          src={src}
          widthImage={widthImage && widthImage > 0 ? widthImage : undefined}
          heightImage={heightImage && heightImage > 0 ? heightImage : undefined}
        />
        <View css={styles.content2}>
          <Button
            loading={loadingAdd}
            backgroundColor="secondary"
            color="light"
            size="extra-small"
            radius={6}
            fontFamily="secondary"
            css={styles.button2(disabled)}
            block
            wilokeStyles={'child-fadein-0'}
            onClick={() => {
              if (disabled) {
                return;
              }
              onAdd?.();
            }}
          >
            {i18n.t('general.install')}
          </Button>
        </View>
      </View>
      <View css={styles.footer}>
        <View css={styles.groupTitle}>
          <Text numberOfLines={1} size={14} color="gray8" fontFamily="secondary">
            {label}
          </Text>
          <Text numberOfLines={1} size={13} color="gray6">
            {description}
          </Text>
        </View>
        <Tooltip
          portal
          onClick={event => {
            event.stopPropagation();
            onDelete?.();
          }}
          text={i18n.t('general.delete')}
          css={{ cursor: 'pointer' }}
        >
          <FontAwesome type="fal" name="trash-alt" color={'danger'} size={16} />
        </Tooltip>
      </View>
    </View>
  );
};
