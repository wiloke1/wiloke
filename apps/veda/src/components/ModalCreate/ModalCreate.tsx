import Drawer from 'components/Drawer';
import MyModal, { MyModalProps } from 'components/MyModal';
import ScrollBars from 'components/ScrollBars';
import React, { FC, ReactNode } from 'react';
import { i18n } from 'translation';
import { FontAwesome, View } from 'wiloke-react-core';
import * as styles from './styles';

export interface ModalCreateProps {
  visible?: boolean;
  isLoading?: boolean;
  headerText?: string;
  Content: ReactNode;
  FormContent?: ReactNode;
  activeDrawer?: boolean;
  okText?: string;
  cancelText?: string;
  depsHeightRecalculation?: MyModalProps['depsHeightRecalculation'];
  goBack?: () => void;
  onCancel?: () => void;
  onOk?: () => void;
}

const ModalCreate: FC<ModalCreateProps> = ({
  visible = false,
  isLoading = false,
  activeDrawer = false,
  headerText = 'Select page templates',
  Content,
  FormContent,
  okText = '',
  cancelText = '',
  depsHeightRecalculation,
  goBack,
  onCancel,
  onOk,
}) => {
  const _renderForm = (
    <View backgroundColor="light" css={styles.hiddenContent}>
      {FormContent}
    </View>
  );

  return (
    <MyModal
      size="large"
      scrollDisabled
      depsHeightRecalculation={depsHeightRecalculation}
      contentCss={{ padding: '0', overflow: 'hidden' }}
      headerText={
        <View css={{ display: 'flex' }}>
          {activeDrawer && !!goBack && (
            <View onClick={goBack} css={styles.btnBack} color="primary">
              <FontAwesome type="fas" name="arrow-left" css={{ marginRight: '6px' }} />
              {i18n.t('general.back')}
            </View>
          )}
          {headerText}
        </View>
      }
      isVisible={visible}
      isLoading={isLoading}
      okText={okText}
      cancelText={cancelText}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Drawer active={activeDrawer} height="100%" Content={_renderForm}>
        <ScrollBars>{Content}</ScrollBars>
      </Drawer>
    </MyModal>
  );
};

export default ModalCreate;
