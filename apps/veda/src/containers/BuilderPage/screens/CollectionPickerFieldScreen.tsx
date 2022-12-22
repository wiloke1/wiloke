import CollectionPicker from 'components/CollectionPicker';
import { ScreenProps } from 'components/StackNavigator';
import { FC } from 'react';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';
import DefaultScreen from '../components/DefaultScreen';

const CollectionPickerFieldScreen: FC<ScreenProps<LeftBarParamList, 'collectionPickerFieldScreen'>> = ({ params }) => {
  const { collection, onChange, label } = params;

  return (
    <DefaultScreen title={label} contentCss={{ height: '100%', padding: '0px' }} withScrollbars={false}>
      <CollectionPicker collection={collection} onChange={onChange} />
    </DefaultScreen>
  );
};

export default CollectionPickerFieldScreen;
