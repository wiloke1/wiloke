import Button from 'components/Button';
import { Confirm } from 'components/Confirm/Confirm';
import ImagePlaceholder from 'components/ImagePlaceholder';
import LazyImage from 'components/LazyImage';
import Tooltip from 'components/Tooltip';
import { FC } from 'react';
import { i18n } from 'translation';
import { FontAwesome, Text, View } from 'wiloke-react-core';
import { ImageTextCardProps } from '.';
import * as styles from './styles';

interface ImageTextCard2Props extends Omit<ImageTextCardProps, 'buttonText' | 'backgroundSize'> {
  /** Trạng thái loading của nút add */
  loadingAdd?: boolean;
  /** Trạng thái loading của nút preview */
  loadingPreview?: boolean;
  /** Độ rộng của ảnh */
  widthImage?: number;
  /** Chiều cao của ảnh */
  heightImage?: number;
  /** Mô tả ngắn của card */
  description?: string;
  /** Sự kiện edit */
  onEdit?: () => void;
  /** Sự kiện preview */
  onPreview?: () => void;
}

export const ImageTextCard2: FC<ImageTextCard2Props> = ({
  src,
  loadingAdd = false,
  loadingPreview = false,
  disabled = false,
  saved = false,
  disabledIconSave = false,
  heightImage = 0,
  widthImage = 0,
  label,
  description,
  onDelete,
  onAdd,
  onSave,
  onPreview,
  onEdit,
}) => {
  const imageWrapperHeight = 320;

  const _renderImage = (image: string) => {
    if (heightImage > imageWrapperHeight) {
      return <img src={image} alt="" />;
    }
    return (
      <View css={styles.imageCard2}>
        <LazyImage src={image} widthImage={widthImage} heightImage={heightImage} />
      </View>
    );
  };

  return (
    <View borderColor="gray3" borderStyle="solid" borderWidth={1} css={styles.containerStyle2} radius={6} wilokeStyles="parent-hover">
      <View css={styles.body2}>
        <View css={styles.animateWrapper}>{src ? _renderImage(src) : <ImagePlaceholder height={imageWrapperHeight} />}</View>
        <View css={styles.content2} wilokeStyles={!loadingAdd || !loadingPreview ? 'child-fadein-0' : undefined}>
          <Button
            loading={loadingAdd}
            backgroundColor="secondary"
            color="light"
            size="extra-small"
            radius={6}
            fontFamily="secondary"
            css={styles.button2(disabled)}
            onClick={() => {
              if (disabled) {
                return;
              }
              onAdd?.();
            }}
          >
            {i18n.t('general.install')}
          </Button>
          {!!onPreview && (
            <Tooltip text={i18n.t('general.preview')} css={{ marginLeft: '5px' }}>
              <Button
                loading={loadingPreview}
                backgroundColor="gray8"
                color="light"
                size="extra-small"
                radius={6}
                fontFamily="secondary"
                css={styles.button2(disabled)}
                style={{ marginBottom: '0px' }}
                onClick={() => {
                  if (disabled) {
                    return;
                  }
                  onPreview?.();
                }}
              >
                <FontAwesome type="far" name="search" />
              </Button>
            </Tooltip>
          )}
        </View>
      </View>
      <View css={styles.footer}>
        <View css={styles.groupTitle}>
          <Text
            tagName="h3"
            numberOfLines={1}
            size={15}
            color="gray8"
            fontFamily="secondary"
            css={{ marginBottom: '3px', lineHeight: '1.2', textTransform: 'capitalize' }}
          >
            {label}
          </Text>
          <Text tagName="p" numberOfLines={1} size={13} color="gray6">
            {description}
          </Text>
        </View>

        <View css={styles.flexCenter}>
          {!!onEdit && (
            <Tooltip
              portal
              onClick={event => {
                event.stopPropagation();
                onEdit?.();
              }}
              text={i18n.t('general.edit')}
              css={{ ...styles.imageCardIcon1 }}
            >
              <FontAwesome type="far" name="cog" color="gray7" size={14} />
            </Tooltip>
          )}

          {disabledIconSave ? null : (
            <Tooltip
              portal
              onClick={event => {
                event.stopPropagation();
                onSave?.();
              }}
              text={i18n.t(saved ? 'general.saved' : 'general.save')}
              css={{ ...styles.imageCardIcon1, marginLeft: '10px' }}
            >
              <FontAwesome type={saved ? 'fas' : 'far'} name="bookmark" color={saved ? 'tertiary' : 'gray7'} size={14} />
            </Tooltip>
          )}

          {!!onDelete && (
            <Confirm
              isLoading={loadingAdd}
              title={`${i18n.t('general.delete', { text: i18n.t('general.confirm') })}`}
              message={i18n.t('general.delete_confirm_message', { text: label })}
              onOk={onClose => {
                onClose();
                onDelete?.();
              }}
            >
              <Tooltip portal text={i18n.t('general.delete')} css={{ ...styles.imageCardIcon1, marginLeft: '10px' }}>
                <FontAwesome type={'far'} name="trash" color={'danger'} size={14} />
              </Tooltip>
            </Confirm>
          )}
        </View>
      </View>
    </View>
  );
};
