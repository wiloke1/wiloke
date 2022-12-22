// import { useVisible } from 'components/ChooseImage/globalState';
import { useChooseImage } from 'components/ChooseImage/context/ChooseImageContext';
import MyModal from 'components/MyModal';
import { i18n } from 'translation';
import { View } from 'wiloke-react-core';
import Tabs from '../Tabs/Tabs';

export const ModePopup = () => {
  const { visible, dispatch } = useChooseImage();

  const _handleClosePopup = () => {
    dispatch({
      type: 'SetImage',
      payload: {
        visible: false,
      },
    });
  };

  return (
    <MyModal
      bodyCss={{ minHeight: '500px', maxHeight: '700px', minWidth: '700px' }}
      contentCss={{ height: '100%' }}
      scrollDisabled
      isVisible={visible}
      okText=""
      size="medium"
      cancelText=""
      onCancel={_handleClosePopup}
      onOk={_handleClosePopup}
      headerText={i18n.t('general.choose_image')}
    >
      <View css={{ height: '100%' }}>
        <Tabs />
      </View>
    </MyModal>
  );
};
