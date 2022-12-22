import { SingleProductPicker } from 'components/ProductPicker';
import { ScreenProps } from 'components/StackNavigator';
import { FC } from 'react';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';
import DefaultScreen from '../components/DefaultScreen';

const SingleProductPickerFieldScreen: FC<ScreenProps<LeftBarParamList, 'singleProductPickerFieldScreen'>> = ({ params }) => {
  const { product, onChange, label } = params;

  return (
    <DefaultScreen title={label} contentCss={{ height: '100%', padding: '0px' }} withScrollbars={false}>
      <SingleProductPicker
        product={product}
        onChange={value => {
          onChange(value);
        }}
      />
    </DefaultScreen>
  );
};

export default SingleProductPickerFieldScreen;
