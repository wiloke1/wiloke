import LinkPicker from 'components/LinkPicker';
import { DataBindingFieldNameSelected } from 'containers/BuilderPage/components/DataBindingFieldNameSelected/DataBindingFieldNameSelected';
import { useSelector } from 'react-redux';
import { useUpdateSettingsValue } from 'store/actions/actionPages';
import { sectionIdActiveSelector } from 'store/selectors';
import { pmParent } from 'utils/functions/postMessage';
import { FieldContainerProps } from '../types';

export interface LinkPickerFieldProps<T> extends FieldContainerProps<T> {
  label: string;
  name: string;
  summary?: string;
}

const LinkPickerField = <T extends string>({
  value,
  name,
  settingId,
  childId,
  grandChildId,
  label,
  summary,
  forceRenderSection,
}: LinkPickerFieldProps<T>) => {
  const updateSettingsValue = useUpdateSettingsValue();
  const sectionIdActive = useSelector(sectionIdActiveSelector);

  const _handleChange = (value: string) => {
    updateSettingsValue({ value, settingId, childId, grandChildId });
    if (forceRenderSection) {
      pmParent.emit('@rerender', { sectionId: sectionIdActive, action: 'LinkPickerField.tsx' });
    }
  };

  return (
    <LinkPicker
      label={label}
      summary={summary}
      AfterLabel={<DataBindingFieldNameSelected fieldName={name} />}
      value={value}
      onChange={_handleChange}
    />
  );
};

export default LinkPickerField;
