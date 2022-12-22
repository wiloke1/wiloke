import { CollectionPickerProps } from 'components/CollectionPicker';
import NavigateItem from 'components/NavigateItem';
import { useStackNavigator } from 'components/StackNavigator';
import { DataBindingFieldNameSelected } from 'containers/BuilderPage/components/DataBindingFieldNameSelected/DataBindingFieldNameSelected';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useUpdateSettingsValue } from 'store/actions/actionPages';
import { useGetCollectionsObject } from 'store/actions/liquid/actionLiquidVariables';
import { sectionIdActiveSelector } from 'store/selectors';
import { SettingCollectionPicker } from 'types/Schema';
import { pmParent } from 'utils/functions/postMessage';
import { FieldContainerProps } from '../types';

export interface CollectionPickerFieldProps<T> extends FieldContainerProps<T> {
  label: string;
  name: string;
  summary?: string;
}
type SettingCollectionPickerData = SettingCollectionPicker['children'];

const CollectionPickerField = ({
  value,
  name,
  settingId,
  childId,
  grandChildId,
  label,
  summary,
  forceRenderSection,
}: CollectionPickerFieldProps<SettingCollectionPickerData>) => {
  const updateSettingsValue = useUpdateSettingsValue();
  const navigation = useStackNavigator<LeftBarParamList>();
  const sectionIdActive = useSelector(sectionIdActiveSelector);
  const getCollectionsObject = useGetCollectionsObject();

  const handleChange: CollectionPickerProps['onChange'] = collection => {
    if (!collection) {
      return;
    }
    getCollectionsObject.request({
      collections: [collection],
      onSuccess: () => {
        // TODO: @tuong -> Có hay không việc nên để mặc định "forceRenderSection=true" vì đại đa số các trường hợp section có dữ liệu shopify đều sẽ có "JS"
        if (forceRenderSection) {
          pmParent.emit('@rerender', { sectionId: sectionIdActive, action: 'CollectionPickerField.tsx' });
        }
        updateSettingsValue({
          value: collection,
          settingId,
          childId,
          grandChildId,
        });
      },
    });
  };

  useEffect(() => {
    navigation.emit('collectionPickerFieldScreen', {
      collection: value,
      label,
      onChange: handleChange,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, settingId, childId, grandChildId]);

  return (
    <NavigateItem
      label={label}
      summary={summary}
      AfterLabel={<DataBindingFieldNameSelected fieldName={name} />}
      onClick={() => {
        navigation.push('collectionPickerFieldScreen', {
          label: label,
          collection: value,
          onChange: handleChange,
        });
      }}
    />
  );
};

export default CollectionPickerField;
