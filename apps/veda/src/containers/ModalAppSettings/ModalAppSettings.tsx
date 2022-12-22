import AsyncComponent from 'components/AsyncComponent';
import MyModal from 'components/MyModal';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { appSettingsSelector, useSetAppSettingsVisible } from 'store/global/appSettings/slice';
import { i18n } from 'translation';
import { View } from 'wiloke-react-core';
import { JavascriptHook } from './components/JavascriptHook';
import { Language } from './components/Language';

const ModalAppSettings: FC = () => {
  const setAppSettingsVisible = useSetAppSettingsVisible();
  const { visible, status } = useSelector(appSettingsSelector);

  return (
    <MyModal
      depsHeightRecalculation={status}
      headerText={i18n.t('general.app_settings')}
      size="small"
      isVisible={visible}
      bodyCss={{ width: '600px' }}
      onCancel={() => {
        setAppSettingsVisible(false);
      }}
      cancelText=""
      okText=""
    >
      <AsyncComponent
        status={status}
        Success={
          <View>
            <JavascriptHook />
            <Language />
          </View>
        }
      />
    </MyModal>
  );
};

export default ModalAppSettings;
