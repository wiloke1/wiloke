import Radio from 'components/Radio';
import { Option } from 'components/SelectAntd';
import { useSelector } from 'react-redux';
import { useUpdateSettingsValue } from 'store/actions/actionPages';
import { sectionIdActiveSelector } from 'store/selectors';
import { pmParent } from 'utils/functions/postMessage';
import { FieldContainerProps } from '../types';

export interface RadioGroupFieldProps<T> extends FieldContainerProps<T> {
  options: Option[];
}

const RadioGroupField = <T extends string>({ value, settingId, childId, grandChildId, options, forceRenderSection }: RadioGroupFieldProps<T>) => {
  const updateSettingsValue = useUpdateSettingsValue();
  const sectionIdActive = useSelector(sectionIdActiveSelector);

  const handleChange = (value: string) => {
    updateSettingsValue({
      value,
      settingId,
      childId,
      grandChildId,
    });
    if (forceRenderSection) {
      pmParent.emit('@rerender', { sectionId: sectionIdActive, action: 'RadioGroupField.tsx' });
    }
  };

  return (
    <Radio.Group value={value} block size="large" onChangeValue={handleChange}>
      {options.map(item => {
        return (
          <Radio.Button key={item.value} value={item.value}>
            {item.label}
          </Radio.Button>
        );
      })}
    </Radio.Group>
  );
};

export default RadioGroupField;
