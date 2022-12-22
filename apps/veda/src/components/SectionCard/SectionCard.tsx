import BoxCenter from 'components/BoxCenter';
import Button from 'components/Button';
import Hotspot from 'components/Hotspot';
import ImagePlaceholder from 'components/ImagePlaceholder';
import LazyImage from 'components/LazyImage';
import Tooltip from 'components/Tooltip';
import { FC, ReactNode } from 'react';
import { i18n } from 'translation';
import { FontAwesome, Space, Text, View, ViewProps } from 'wiloke-react-core';
import { SectionCardLoading } from './SectionLoading';
import * as styles from './styles';

export interface SectionCardProps {
  title: string;
  type?: string;
  loading?: boolean;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  Right?: ReactNode;
  author?: ReactNode;
  date?: string;
  css?: ViewProps['css'];
  /** Text của nút */
  buttonText?: string;
  disabled?: boolean;
  hasUpdate?: boolean;
  onClick?: () => void;
  onUpdate?: () => void;
}

const SectionCard: FC<SectionCardProps> = ({
  type,
  title,
  loading = false,
  disabled = false,
  hasUpdate = false,
  image = '',
  imageHeight,
  imageWidth,
  Right,
  author,
  css,
  date,
  buttonText = i18n.t('general.preview'),
  onClick,
  onUpdate,
}) => {
  return (
    <View css={[styles.container, css]}>
      <View
        css={styles.featureContainer}
        onClick={() => {
          if (disabled || !buttonText) {
            return;
          }
          onClick?.();
        }}
        wilokeStyles="parent-hover"
      >
        {buttonText && (
          <View css={styles.featureContent} wilokeStyles={!loading ? 'child-fadein-0' : undefined}>
            <Button
              loading={loading}
              backgroundColor="primary"
              color="light"
              size="extra-small"
              radius={4}
              fontFamily="secondary"
              css={styles.button(disabled)}
            >
              {buttonText}
            </Button>
          </View>
        )}

        {image ? (
          <LazyImage src={image} heightImage={imageHeight} widthImage={imageWidth} backgroundSize="contain" />
        ) : (
          <ImagePlaceholder aspectRatio={16 / 9} />
        )}
      </View>

      <View css={styles.body}>
        <View css={styles.head}>
          <Text css={styles.type} size={10}>
            {i18n.t('general.type')}: {type}
          </Text>
          <View>
            <Text tagName="span" color="gray6" size={13} css={styles.by}>
              {i18n.t('general.by')}
            </Text>
            <Text tagName="span" size={13} color="gray8">
              {author ? author : 'Someone'}
            </Text>
          </View>
        </View>
        <Space size={3} />
        <Text tagName="h5">{title}</Text>

        <Space size={2} />

        {(!!date || hasUpdate) && (
          <View css={styles.footer}>
            {hasUpdate && (
              <Tooltip portal text={i18n.t('general.update')}>
                <BoxCenter css={{ position: 'relative' }} onClick={onUpdate}>
                  <Hotspot css={{ position: 'absolute', top: '5px', right: '5px' }} />
                  <FontAwesome type="far" name="arrow-from-bottom" size={13} color="gray6" />
                </BoxCenter>
              </Tooltip>
            )}

            <Text tagName="span" color="gray6" size={13}>
              {date}
            </Text>
          </View>
        )}

        {!!Right && <Space size={5} />}
        <View onClick={event => event.stopPropagation()}>{Right}</View>
      </View>
    </View>
  );
};

export default Object.assign(SectionCard, {
  Loading: SectionCardLoading,
});
