import TextInput from 'components/TextInput';
import withDebounce from 'hocs/withDebounce';
import { useSelector } from 'react-redux';
import { useUpdateSettingsValue } from 'store/actions/actionPages';
import { sectionIdActiveSelector } from 'store/selectors';
import { pmParent } from 'utils/functions/postMessage';
import { FieldContainerProps } from '../types';

export interface TextareaFieldProps<T> extends FieldContainerProps<T> {}

const TextAreaDebounce = withDebounce(TextInput, 'value', 'onValueChange');

export const TextareaField = <T extends string>({ value, settingId, childId, grandChildId, forceRenderSection }: TextareaFieldProps<T>) => {
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
      pmParent.emit('@rerender', { sectionId: sectionIdActive, action: 'TextareaField.tsx' });
    }
  };

  return <TextAreaDebounce value={value} onValueChange={handleChange} block />;
};
