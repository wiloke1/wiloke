import TextInput from 'components/TextInput';
import withDebounce from 'hocs/withDebounce';
import { useUpdateSettingsValue } from 'store/actions/actionPages';
import { sectionIdActiveSelector } from 'store/selectors';
import { pmParent } from 'utils/functions/postMessage';
import { useSelector } from 'react-redux';
import { FieldContainerProps } from '../types';

export interface TextInputFieldProps<T> extends FieldContainerProps<T> {}

const TextInputDebounce = withDebounce(TextInput, 'value', 'onValueChange');

const TextInputField = <T extends string>({ value, settingId, childId, grandChildId, forceRenderSection }: TextInputFieldProps<T>) => {
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
      pmParent.emit('@rerender', { sectionId: sectionIdActive, action: 'TextInputField.tsx' });
    }
  };

  return <TextInputDebounce multiline value={value} block sizeInput="medium" onValueChange={handleChange} />;
};

export default TextInputField;
