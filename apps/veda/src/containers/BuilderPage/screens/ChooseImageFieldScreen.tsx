import ChooseImage from 'components/ChooseImage';
import { ScreenProps, useStackNavigator } from 'components/StackNavigator';
import { FC } from 'react';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';
import DefaultScreen from '../components/DefaultScreen';

const ChooseImageFieldScreen: FC<ScreenProps<LeftBarParamList, 'chooseImageFieldScreen'>> = ({ params }) => {
  const { value, onChange, label } = params;
  const navigation = useStackNavigator<LeftBarParamList>();

  return (
    <DefaultScreen title={label} contentCss={{ padding: 0, height: '100%', overflow: 'hidden' }}>
      <ChooseImage
        mode="drawer"
        value={value}
        onChange={value => {
          onChange({
            src: value.src,
            height: value.height,
            width: value.width,
          });
        }}
        onGoBack={navigation.goBack}
      />
    </DefaultScreen>
  );
};

export default ChooseImageFieldScreen;
