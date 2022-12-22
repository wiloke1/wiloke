import MyModal from 'components/MyModal';
import TextInput from 'components/TextInput';
import { FC } from 'react';
import { i18n } from 'translation';
import { View } from 'wiloke-react-core';

export interface ModalRenameProps {
  visible: boolean;
  label: string;
  setLabel: (label: string) => void;
  onCancel: () => void;
  onRename: () => void;
}

export const ModalRename: FC<ModalRenameProps> = ({ visible, label, setLabel, onCancel, onRename }) => {
  return (
    <MyModal isVisible={visible} headerText={i18n.t('general.rename')} onCancel={onCancel} onOk={onRename}>
      <View
        tagName="form"
        onSubmit={event => {
          event.preventDefault();
          onRename();
        }}
      >
        <TextInput value={label} block autoFocus sizeInput="medium" onValueChange={setLabel} />
      </View>
    </MyModal>
  );
};
