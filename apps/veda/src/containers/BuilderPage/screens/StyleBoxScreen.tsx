import { ScreenProps } from 'components/StackNavigator';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';
import { FC } from 'react';
import { getLabel } from 'utils/functions/getLabel';
import StyleBox from '../components/StyleBox/StyleBox';
import DefaultScreen from '../components/DefaultScreen';

const StyleBoxScreen: FC<ScreenProps<LeftBarParamList, 'styleBoxScreen'>> = ({ params }) => {
  const { label, ...rest } = params;

  return (
    <DefaultScreen title={getLabel(label)}>
      <StyleBox {...rest} />
    </DefaultScreen>
  );
};

export default StyleBoxScreen;
