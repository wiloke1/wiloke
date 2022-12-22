import Button from 'components/Button';
import MyModal from 'components/MyModal';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { i18n } from 'translation';
import { askBeforeSaveSelector, useSetAskBeforeSaveVisible } from './slice';

export interface ModalAskBeforeSaveProps {
  content?: string;
  isLoading?: boolean;
  okText?: string;
  cancelText?: string;
  headerText?: string;
  onOverride?: (isOverride: boolean) => void;
}

export const ModalAskBeforeSave: FC<ModalAskBeforeSaveProps> = ({
  isLoading = false,
  content = i18n.t('builderPage.override_content'),
  okText = i18n.t('builderPage.override'),
  cancelText = i18n.t('builderPage.not_override'),
  headerText = i18n.t('builderPage.confirm_override'),
  onOverride,
}) => {
  const { visible } = useSelector(askBeforeSaveSelector);
  const setVisible = useSetAskBeforeSaveVisible();

  return (
    <MyModal
      headerText={headerText}
      isVisible={visible}
      onCancel={() => {
        setVisible(false);
      }}
      okText={''}
      cancelText={''}
      bodyCss={{ minHeight: '180px' }}
      depsHeightRecalculation={content}
      FooterRight={[
        <Button
          key="1"
          backgroundColor="gray2"
          size="extra-small"
          radius={4}
          fontFamily="secondary"
          color="gray8"
          css={{ fontWeight: 500, marginRight: '10px' }}
          onClick={() => {
            onOverride?.(false);
          }}
        >
          {cancelText}
        </Button>,
        <Button
          key="2"
          backgroundColor="primary"
          size="extra-small"
          radius={4}
          fontFamily="secondary"
          css={{ fontWeight: 500 }}
          onClick={() => {
            onOverride?.(true);
          }}
          loading={isLoading}
        >
          {okText}
        </Button>,
      ]}
    >
      {content}
    </MyModal>
  );
};
