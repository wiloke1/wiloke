import FlexOrder, { FlexOrderDataItem, FlexOrderValue } from 'components/FlexOrder';
import { DataBindingFieldNameSelected } from 'containers/BuilderPage/components/DataBindingFieldNameSelected/DataBindingFieldNameSelected';
import { useSelector } from 'react-redux';
import { useUpdateSettingsValue } from 'store/actions/actionPages';
import { sectionIdActiveSelector } from 'store/selectors';
import { pmParent } from 'utils/functions/postMessage';
import { FieldContainerProps } from '../types';

export interface FlexOrderFieldProps<T> extends FieldContainerProps<T> {
  label: string;
  name: string;
  summary?: string;
  options: FlexOrderDataItem[];
}

const FlexOrderField = <T extends FlexOrderValue>({
  value,
  name,
  settingId,
  childId,
  grandChildId,
  label,
  summary,
  options,
  forceRenderSection,
}: FlexOrderFieldProps<T>) => {
  const updateSettingsValue = useUpdateSettingsValue();
  const sectionIdActive = useSelector(sectionIdActiveSelector);

  const handleChange = (value: FlexOrderValue) => {
    updateSettingsValue({
      value,
      settingId,
      childId,
      grandChildId,
    });
    if (forceRenderSection) {
      pmParent.emit('@rerender', { sectionId: sectionIdActive, action: 'FlexOrderField.tsx' });
    }
  };

  return (
    <FlexOrder
      label={label}
      summary={summary}
      AfterLabel={<DataBindingFieldNameSelected fieldName={name} />}
      value={value}
      options={options}
      onChange={handleChange}
    />
  );
};

export default FlexOrderField;
