import Responsive, { ResponsiveValue } from 'components/Responsive';
import { DataBindingFieldNameSelected } from 'containers/BuilderPage/components/DataBindingFieldNameSelected/DataBindingFieldNameSelected';
import { useSelector } from 'react-redux';
import { useUpdateSettingsValue } from 'store/actions/actionPages';
import { sectionIdActiveSelector } from 'store/selectors';
import { pmParent } from 'utils/functions/postMessage';
import { FieldContainerProps } from '../types';

export interface ResponsiveFieldProps<T> extends FieldContainerProps<T> {
  min?: number;
  max?: number;
  label: string;
  name: string;
  summary?: string;
}

const ResponsiveField = <T extends ResponsiveValue>({
  value,
  name,
  settingId,
  childId,
  grandChildId,
  label,
  summary,
  min,
  max,
  forceRenderSection,
}: ResponsiveFieldProps<T>) => {
  const updateSettingsValue = useUpdateSettingsValue();
  const sectionIdActive = useSelector(sectionIdActiveSelector);

  const handleChange = (value: ResponsiveValue) => {
    updateSettingsValue({
      value,
      settingId,
      childId,
      grandChildId,
    });
    if (forceRenderSection) {
      pmParent.emit('@rerender', { sectionId: sectionIdActive, action: 'ResponsiveField.tsx' });
    }
  };

  return (
    <Responsive
      label={label}
      summary={summary}
      AfterLabel={<DataBindingFieldNameSelected fieldName={name} />}
      value={value}
      min={min}
      max={max}
      onChange={handleChange}
    />
  );
};

export default ResponsiveField;
