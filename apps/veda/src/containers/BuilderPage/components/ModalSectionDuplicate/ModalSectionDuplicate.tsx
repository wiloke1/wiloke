import Checkbox from 'components/Checkbox';
import MyModal from 'components/MyModal';
import { useStackNavigator } from 'components/StackNavigator';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';
import { useCancelModalDuplicateFlow, useSectionModalDuplicateFlow } from 'containers/BuilderPage/store/toolbarActions/action';
import { addonsToKeepSelector, useSetAddonsToKeepActive } from 'containers/BuilderPage/store/toolbarActions/sliceAddonsToKeep';
import { modalDuplicateVisibleSelector } from 'containers/BuilderPage/store/toolbarActions/sliceModalDuplicateVisible';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { i18n } from 'translation';
import { Space, Text, View } from 'wiloke-react-core';

const ModalSectionDuplicate: FC = () => {
  const addonsToKeep = useSelector(addonsToKeepSelector);
  const modalDuplicateVisible = useSelector(modalDuplicateVisibleSelector);
  const setAddonsToKeepActive = useSetAddonsToKeepActive();
  const sectionModalDuplicateFlow = useSectionModalDuplicateFlow();
  const cancelModalDuplicateFlow = useCancelModalDuplicateFlow();
  const navigation = useStackNavigator<LeftBarParamList>();

  if (!addonsToKeep.length) {
    return null;
  }

  return (
    <MyModal
      isVisible={modalDuplicateVisible.visible}
      headerText={i18n.t('general.duplicate')}
      onCancel={cancelModalDuplicateFlow}
      onOk={() => {
        sectionModalDuplicateFlow({
          goBack: () => {
            navigation.navigate('sectionsScreen');
          },
        });
      }}
    >
      <Text>{i18n.t('builderPage.duplicate_addons_to_keep')}</Text>
      <Space size={10} />
      {addonsToKeep.map(item => (
        <View key={item.addonId}>
          <Checkbox
            checked={item.active}
            disabled={item.disabled}
            onValueChange={() => {
              setAddonsToKeepActive({ addonId: item.addonId });
            }}
          >
            {item.label}
          </Checkbox>
          <Space size={10} />
        </View>
      ))}
    </MyModal>
  );
};

export default ModalSectionDuplicate;
