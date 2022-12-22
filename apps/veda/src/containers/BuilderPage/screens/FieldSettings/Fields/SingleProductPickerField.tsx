import NavigateItem from 'components/NavigateItem';
import { SingleProductPickerProps } from 'components/ProductPicker';
import { useStackNavigator } from 'components/StackNavigator';
import { DataBindingFieldNameSelected } from 'containers/BuilderPage/components/DataBindingFieldNameSelected/DataBindingFieldNameSelected';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';
import { useSelector } from 'react-redux';
import { useUpdateSettingsValue } from 'store/actions/actionPages';
import { useGetProductsObject } from 'store/actions/liquid/actionLiquidVariables';
import { sectionIdActiveSelector } from 'store/selectors';
import { SettingSingleProductPicker } from 'types/Schema';
import { pmParent } from 'utils/functions/postMessage';
import { FieldContainerProps } from '../types';

export interface SingleProductPickerFieldProps<T> extends FieldContainerProps<T> {
  label: string;
  name: string;
  summary?: string;
}

const SingleProductPickerField = ({
  value,
  name,
  settingId,
  childId,
  grandChildId,
  label,
  summary,
  forceRenderSection,
}: SingleProductPickerFieldProps<SettingSingleProductPicker['children']>) => {
  const updateSettingsValue = useUpdateSettingsValue();
  const navigation = useStackNavigator<LeftBarParamList>();
  const sectionIdActive = useSelector(sectionIdActiveSelector);
  const getProductsObject = useGetProductsObject();

  const handleChange: SingleProductPickerProps['onChange'] = product => {
    if (!product) {
      return;
    }
    getProductsObject.request({
      products: [product],
      onSuccess: () => {
        updateSettingsValue({
          value: product,
          settingId,
          childId,
          grandChildId,
        });
        if (forceRenderSection) {
          // TODO: @tuong -> Có hay không việc nên để mặc định "forceRenderSection=true" vì đại đa số các trường hợp section có dữ liệu shopify đều sẽ có "JS"
          pmParent.emit('@rerender', { sectionId: sectionIdActive, action: 'ProductPickerField.tsx' });
        }
      },
    });
  };

  return (
    <NavigateItem
      label={label}
      summary={summary}
      AfterLabel={<DataBindingFieldNameSelected fieldName={name} />}
      onClick={() => {
        navigation.push('singleProductPickerFieldScreen', {
          product: value,
          onChange: handleChange,
          label,
        });
      }}
    />
  );
};

export default SingleProductPickerField;
