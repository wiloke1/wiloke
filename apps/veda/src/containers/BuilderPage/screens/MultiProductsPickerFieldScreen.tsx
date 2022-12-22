import { MultiProductsPicker } from 'components/ProductPicker';
import { ScreenProps } from 'components/StackNavigator';
import { FC } from 'react';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';
import DefaultScreen from '../components/DefaultScreen';

const MultiProductsPickerFieldScreen: FC<ScreenProps<LeftBarParamList, 'multiProductsPickerFieldScreen'>> = ({ params }) => {
  const { products, onChange, label } = params;

  return (
    <DefaultScreen withScrollbars={false} title={label} contentCss={{ padding: 0, height: '100%' }}>
      <MultiProductsPicker
        products={products}
        onChange={value => {
          onChange(value);
        }}
      />
    </DefaultScreen>
  );
};

export default MultiProductsPickerFieldScreen;
