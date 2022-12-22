import { AnimateInOutField, AnimateInOutValue } from 'containers/BuilderPage/components/StyleBox/AnimateInOutField';
import { useSelector } from 'react-redux';
import { useUpdateSettingsValue } from 'store/actions/actionPages';
import { sectionIdActiveSelector } from 'store/selectors';
import { pmParent } from 'utils/functions/postMessage';
import { FieldContainerProps } from '../types';

export interface AnimateFieldProps<T> extends FieldContainerProps<T> {
  label: string;
  summary?: string;
}

const AnimateInOutFieldSchema = <T extends AnimateInOutValue>({
  value,
  settingId,
  childId,
  grandChildId,
  forceRenderSection,
  label,
  summary,
}: AnimateFieldProps<T>) => {
  const updateSettingsValue = useUpdateSettingsValue();
  const sectionIdActive = useSelector(sectionIdActiveSelector);

  const handleChange = (value: AnimateInOutValue) => {
    updateSettingsValue({
      value,
      settingId,
      childId,
      grandChildId,
    });
    if (forceRenderSection) {
      pmParent.emit('@rerender', { sectionId: sectionIdActive, action: 'AnimateInOutField.tsx' });
    }
  };

  return <AnimateInOutField label={label} summary={summary} value={value} onChange={handleChange} />;
};

export default AnimateInOutFieldSchema;
