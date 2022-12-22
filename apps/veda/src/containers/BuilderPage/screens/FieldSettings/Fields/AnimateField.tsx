import { AnimateField } from 'containers/BuilderPage/components/StyleBox/AnimateField';
import { Animate } from 'containers/BuilderPage/components/StyleBox/types';
import { useSelector } from 'react-redux';
import { useUpdateSettingsValue } from 'store/actions/actionPages';
import { sectionIdActiveSelector } from 'store/selectors';
import { pmParent } from 'utils/functions/postMessage';
import { FieldContainerProps } from '../types';

export interface AnimateFieldProps<T> extends FieldContainerProps<T> {}

const AnimateFieldSchema = <T extends Animate>({ value, settingId, childId, grandChildId, forceRenderSection }: AnimateFieldProps<T>) => {
  const updateSettingsValue = useUpdateSettingsValue();
  const sectionIdActive = useSelector(sectionIdActiveSelector);

  const handleChange = (value: Animate) => {
    updateSettingsValue({
      value,
      settingId,
      childId,
      grandChildId,
    });
    if (forceRenderSection) {
      pmParent.emit('@rerender', { sectionId: sectionIdActive, action: 'AnimateField.tsx' });
    }
  };

  return <AnimateField value={value} onChange={handleChange} />;
};

export default AnimateFieldSchema;
