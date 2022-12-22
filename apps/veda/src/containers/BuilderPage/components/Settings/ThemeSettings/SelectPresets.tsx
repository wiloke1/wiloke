import TitleAction from 'components/TitleAction';
import { FC } from 'react';
import { i18n } from 'translation';
import { ModalPresets, useModalPreset } from './ModalPresets';

const SelectPresets: FC = () => {
  const [, setVisible] = useModalPreset();
  return (
    <>
      <TitleAction
        title={i18n.t('adminDashboard.select_presets')}
        text={i18n.t('adminDashboard.choose_presets')}
        buttonText={i18n.t('adminDashboard.option_presets')}
        onClick={() => {
          setVisible(true);
        }}
      />

      <ModalPresets />
    </>
  );
};

export default SelectPresets;
