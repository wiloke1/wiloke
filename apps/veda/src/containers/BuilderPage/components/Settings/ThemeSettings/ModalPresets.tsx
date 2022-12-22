import MyModal from 'components/MyModal';
import { PresetStyleField } from 'containers/Admin/PresetStylesPage';
import useDelay from 'hooks/useDelay';
import { createGlobalState } from 'react-use';
import { i18n } from 'translation';

export const useModalPreset = createGlobalState(false);

export const ModalPresets = () => {
  const [visible, setVisible] = useModalPreset();
  const [delay] = useDelay();

  const _closeModal = () => {
    setVisible(false);
  };

  return (
    <MyModal
      headerText={`${i18n.t('general.choose', { text: i18n.t('builderPage.preset', { text: i18n.t('general.style') }) })}`}
      bodyCss={{ maxWidth: '900px', width: '900px', height: '60vh' }}
      isVisible={visible}
      onCancel={_closeModal}
      okText=""
      cancelText=""
    >
      <PresetStyleField
        onDone={async () => {
          await delay(1500);
          setVisible(false);
        }}
      />
    </MyModal>
  );
};
