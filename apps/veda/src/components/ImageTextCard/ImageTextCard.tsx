import Button from 'components/Button';
import { Confirm } from 'components/Confirm/Confirm';
import LazyImage from 'components/LazyImage';
import Tooltip from 'components/Tooltip';
import { FC } from 'react';
import { i18n } from 'translation';
import { Divider, FontAwesome, Text, View, ViewProps } from 'wiloke-react-core';
import { ImageTextCard2 } from './ImageTextCard2';
import { ImageTextCard3 } from './ImageTextCard3';
import { ImageTextCard4 } from './ImageTextCard4';
import { ImageTextCardLoading } from './ImageTextCardLoading';
import * as styles from './styles';

export interface ImageTextCardProps {
  /** preview image */
  previewImg?: string;
  /** Component loading */
  loading?: boolean;
  /** Đường dẫn của ảnh */
  src?: string;
  /** Tỷ lệ của placeholder ví dụ: placeholderAspectRatio={16/9} */
  placeholderAspectRatio?: number;
  /** Text của nút */
  buttonText?: string;
  /** Disable không cho bấm vào card nữa */
  disabled?: boolean;
  /** Text hiển thị khi disable = true */
  disableText?: string;
  /** Tên của card */
  label: string;
  /** Trạng thái khi card được lưu */
  saved?: boolean;
  /** width của image */
  widthImage?: number;
  /** height của image */
  heightImage?: number;
  /** Css của container */
  containerCss?: ViewProps['css'];
  /** Bật tắt icon save */
  disabledIconSave?: boolean;
  /** Sự kiện bấm vào nút lưu */
  onSave?: () => void;
  /** Sự kiện bấm vào nút add */
  onAdd?: () => void;
  /** Sự kiện xóa */
  onDelete?: () => void;
  /** Sự kiện sửa */
  onEdit?: () => void;
  backgroundSize?: 'cover' | 'contain';
}

interface ImageTextCardVariants {
  Style2: typeof ImageTextCard2;
  Style3: typeof ImageTextCard3;
  Style4: typeof ImageTextCard4;
  Loading: typeof ImageTextCardLoading;
}

const ImageTextCard: FC<ImageTextCardProps> & ImageTextCardVariants = ({
  src,
  loading,
  buttonText = i18n.t('general.add'),
  disabled = false,
  disableText = 'Disable',
  saved = false,
  disabledIconSave = false,
  label,
  heightImage,
  widthImage,
  containerCss,
  backgroundSize = 'cover',
  previewImg,
  onAdd,
  onSave,
  onDelete,
  onEdit,
}) => {
  const renderButton = (
    <Button
      loading={loading}
      backgroundColor="gray8"
      color="light"
      size="extra-small"
      radius={6}
      fontFamily="secondary"
      css={styles.button(disabled)}
    >
      {buttonText}
    </Button>
  );

  return (
    <View css={[styles.container, containerCss]} wilokeStyles="parent-hover">
      <View
        css={styles.body}
        onClick={() => {
          if (disabled) {
            return;
          }
          onAdd?.();
        }}
      >
        <LazyImage
          backgroundColor="light"
          src={src}
          heightImage={heightImage && heightImage > 0 ? heightImage : undefined}
          widthImage={widthImage && widthImage > 0 ? widthImage : undefined}
          backgroundSize={backgroundSize}
          previewUrl={previewImg}
        />
        <View css={styles.content} wilokeStyles={!loading ? 'child-fadein-0' : undefined}>
          {disabled ? (
            <Tooltip portal text={disableText}>
              {renderButton}
            </Tooltip>
          ) : (
            renderButton
          )}
        </View>
      </View>
      <Divider size={1} color="gray2" />
      <View css={styles.footer}>
        <Text color="gray8">{label}</Text>
        <View css={styles.flexCenter}>
          {disabledIconSave ? null : (
            <Tooltip
              portal
              onClick={event => {
                event.stopPropagation();
                onSave?.();
              }}
              text={i18n.t(saved ? 'general.saved' : 'general.save')}
              css={styles.imageCardIcon1}
            >
              <FontAwesome type={saved ? 'fas' : 'far'} name="bookmark" color={saved ? 'quaternary' : 'gray6'} size={14} />
            </Tooltip>
          )}
          {!!onEdit && (
            <Tooltip
              portal
              onClick={event => {
                event.stopPropagation();
                onEdit?.();
              }}
              text={i18n.t('general.edit')}
              css={{ ...styles.imageCardIcon1, marginLeft: '8px' }}
            >
              <FontAwesome type={'far'} name="pencil" color={'primary'} size={14} />
            </Tooltip>
          )}
          {!!onDelete && (
            <Confirm
              isLoading={loading}
              title={`${i18n.t('general.delete', { text: i18n.t('general.confirm') })}`}
              message={i18n.t('general.delete_confirm_message', { text: label })}
              onOk={onClose => {
                onClose();
                onDelete?.();
              }}
            >
              <Tooltip portal text={i18n.t('general.delete')} css={{ ...styles.imageCardIcon1, marginLeft: '8px' }}>
                <FontAwesome type={'far'} name="trash" color={'danger'} size={14} />
              </Tooltip>
            </Confirm>
          )}
        </View>
      </View>
    </View>
  );
};

ImageTextCard.Style2 = ImageTextCard2;
ImageTextCard.Style3 = ImageTextCard3;
ImageTextCard.Style4 = ImageTextCard4;
ImageTextCard.Loading = ImageTextCardLoading;

export default ImageTextCard;
