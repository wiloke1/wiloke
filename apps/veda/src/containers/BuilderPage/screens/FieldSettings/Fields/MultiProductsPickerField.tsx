import NavigateItem from 'components/NavigateItem';
import { MultiProductsPickerProps } from 'components/ProductPicker';
import { useStackNavigator } from 'components/StackNavigator';
import { DataBindingFieldNameSelected } from 'containers/BuilderPage/components/DataBindingFieldNameSelected/DataBindingFieldNameSelected';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';
import { useSelector } from 'react-redux';
import { useUpdateSettingsValue } from 'store/actions/actionPages';
import { sectionIdActiveSelector } from 'store/selectors';
import { SettingMultiProducts } from 'types/Schema';
import { pmParent } from 'utils/functions/postMessage';
import { FieldContainerProps } from '../types';

export interface MultiProductsPickerFieldProps<T> extends FieldContainerProps<T> {
  label: string;
  name: string;
}

export const MultiProductsPickerField = ({
  value,
  name,
  settingId,
  childId,
  grandChildId,
  label,
  forceRenderSection,
}: MultiProductsPickerFieldProps<SettingMultiProducts['children']>) => {
  const updateSettingsValue = useUpdateSettingsValue();
  const navigation = useStackNavigator<LeftBarParamList>();
  const sectionIdActive = useSelector(sectionIdActiveSelector);

  const handleChange: MultiProductsPickerProps['onChange'] = products => {
    updateSettingsValue({
      value: products,
      settingId,
      childId,
      grandChildId,
    });
    if (forceRenderSection) {
      // TODO: @tuong -> Có hay không việc nên để mặc định "forceRenderSection=true" vì đại đa số các trường hợp section có dữ liệu shopify đều sẽ có "JS"
      pmParent.emit('@rerender', { sectionId: sectionIdActive, action: 'ProductPickerField.tsx' });
    }
  };

  return (
    <NavigateItem
      label={label}
      AfterLabel={<DataBindingFieldNameSelected fieldName={name} />}
      onClick={() => {
        navigation.push('multiProductsPickerFieldScreen', {
          products: value,
          onChange: handleChange,
          label,
        });
      }}
    />
  );
};
