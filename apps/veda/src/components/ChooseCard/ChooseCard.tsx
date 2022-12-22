import { Confirm } from 'components/Confirm/Confirm';
import Tooltip from 'components/Tooltip';
import { CSSProperties, DOMAttributes, FC, ReactNode } from 'react';
import { i18n } from 'translation';
import { ActivityIndicator, FontAwesome, Text, useTheme, View } from 'wiloke-react-core';
import ChooseCardLoading from './ChooseCardLoading';
import * as css from './styles';

export interface ChooseCardProps {
  /**  Đường dẫn ảnh */
  uri: string;
  /** Thuộc tính title của card giống html */
  title?: string;
  /** Sự kiện bấm vào cả card */
  onEdit?: DOMAttributes<HTMLDivElement>['onClick'];
  /** Sự kiện bấm vào cả Delete icon */
  onDelete?: () => void;
  /** Text của button */
  buttonText?: string;
  isRequesting?: boolean;
  containerStyle?: CSSProperties;
  onRemoveBg?: () => void;
}

interface ChooseCardExtend {
  Loading: ReactNode;
}

const ChooseCard: FC<ChooseCardProps> & ChooseCardExtend = ({
  containerStyle,
  uri,
  title,
  buttonText,
  onEdit,
  onDelete,
  isRequesting = false,
  onRemoveBg,
}) => {
  const { colors } = useTheme();

  const _renderOverlayWithText = () => {
    return (
      <View onClick={onEdit} style={{ backgroundColor: `rgba(${colors.rgbGray6}, 0.3)` }} wilokeStyles="child-fadein-0" css={css.overWithText}>
        {buttonText && (
          <View css={{ ...css.contentWithText, alignItems: 'center' }}>
            <View css={css.editBtn} backgroundColor="light">
              <Text color="gray7">{buttonText}</Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  const _renderLoadingOverlay = () => {
    return (
      <View css={css.loadingOverlay}>
        <ActivityIndicator size={20} color="light" />
      </View>
    );
  };

  return (
    <View style={containerStyle} css={css.container(isRequesting)} backgroundColor="light" wilokeStyles={isRequesting ? undefined : 'parent-hover'}>
      <img src={uri} alt={title} />
      {_renderOverlayWithText()}
      {isRequesting && _renderLoadingOverlay()}

      {onDelete && (
        <Confirm
          message={i18n.t('general.delete_confirm_message', { text: i18n.t('general.image'), textTransform: 'capitalize' })}
          title={`${i18n.t('general.delete', { text: i18n.t('general.confirm') })}`}
          onOk={onClose => {
            onClose();
            onDelete?.();
          }}
          okText={i18n.t('general.confirm')}
          isLoading={isRequesting}
        >
          <View wilokeStyles="child-fadein-0" css={css.xIcon}>
            <Tooltip portal text={i18n.t('general.delete')}>
              <FontAwesome type="far" name="times" size={12} />
            </Tooltip>
          </View>
        </Confirm>
      )}

      {onRemoveBg && (
        <View wilokeStyles="child-fadein-0" css={css.removeIcon(!!onDelete)} onClick={onRemoveBg}>
          <Tooltip portal text={'Remove background'}>
            <FontAwesome type="far" name="eraser" size={11} />
          </Tooltip>
        </View>
      )}
    </View>
  );
};

ChooseCard.Loading = ChooseCardLoading;

export { ChooseCard };
