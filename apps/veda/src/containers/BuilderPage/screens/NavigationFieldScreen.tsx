import DraggableMenu from 'containers/BuilderPage/components/DraggableMenu';
import { ScreenProps, useStackNavigator } from 'components/StackNavigator';
import { FC } from 'react';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';

const NavigationFieldScreen: FC<ScreenProps<LeftBarParamList, 'navigationFieldScreen'>> = ({ params }) => {
  const navigation = useStackNavigator<LeftBarParamList>();
  const { settings, onChange, label, multiLevelEnabled } = params;

  return (
    <DraggableMenu
      label={label}
      settings={settings}
      multiLevelEnabled={multiLevelEnabled}
      onChange={value => {
        onChange(value);
      }}
      mode="collapse"
      goBack={() => {
        navigation.goBack();
      }}
    />
  );
};

export default NavigationFieldScreen;
