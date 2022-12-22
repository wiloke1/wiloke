import SingleDatePicker from 'components/SingleDatePicker';
import { useSelector } from 'react-redux';
import { useUpdateSettingsValue } from 'store/actions/actionPages';
import { sectionIdActiveSelector } from 'store/selectors';
import { pmParent } from 'utils/functions/postMessage';
import { FieldContainerProps } from '../types';

export interface DatePickerFieldProps<T> extends FieldContainerProps<T> {}

const DatePickerField = <T extends number>({ value, settingId, childId, grandChildId, forceRenderSection }: DatePickerFieldProps<T>) => {
  const updateSettingsValue = useUpdateSettingsValue();
  const sectionIdActive = useSelector(sectionIdActiveSelector);

  const handleChange = (value: Date) => {
    updateSettingsValue({
      value: value.getTime(),
      settingId,
      childId,
      grandChildId,
    });
    if (forceRenderSection) {
      pmParent.emit('@rerender', { sectionId: sectionIdActive, action: 'DatePickerField.tsx' });
    }
  };

  return (
    <SingleDatePicker
      date={new Date(value)}
      onChange={date => {
        if (date) {
          handleChange(date);
        }
      }}
    />
  );
};

export default DatePickerField;
