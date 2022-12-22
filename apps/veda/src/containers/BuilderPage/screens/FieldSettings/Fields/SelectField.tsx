import SelectAntd, { Option } from 'components/SelectAntd';
import { useSelector } from 'react-redux';
import { useUpdateSettingsValue } from 'store/actions/actionPages';
import { sectionIdActiveSelector } from 'store/selectors';
import { pmParent } from 'utils/functions/postMessage';
import { FieldContainerProps } from '../types';

export interface SelectFieldProps<T> extends FieldContainerProps<T> {
  options: Option[];
}

const SelectField = <T extends string>({ value, settingId, childId, grandChildId, options, forceRenderSection }: SelectFieldProps<T>) => {
  const updateSettingsValue = useUpdateSettingsValue();
  const sectionIdActive = useSelector(sectionIdActiveSelector);

  const handleChange = (value: any) => {
    updateSettingsValue({
      value,
      settingId,
      childId,
      grandChildId,
    });
    if (forceRenderSection) {
      pmParent.emit('@rerender', { sectionId: sectionIdActive, action: 'SelectField.tsx' });
    }
  };

  return <SelectAntd value={value} data={options} onChange={handleChange} />;
};

export default SelectField;
