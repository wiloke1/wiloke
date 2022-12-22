import { InputTags } from 'components/SelectTags';
import { useSelector } from 'react-redux';
import { useUpdateSettingsValue } from 'store/actions/actionPages';
import { sectionIdActiveSelector } from 'store/selectors';
import { pmParent } from 'utils/functions/postMessage';
import { FieldContainerProps } from '../types';

export interface SelectTagsPickerFieldProps<T> extends FieldContainerProps<T> {}

export const SelectTagsPickerField = <T extends string>({
  value,
  settingId,
  childId,
  grandChildId,
  forceRenderSection,
}: SelectTagsPickerFieldProps<T>) => {
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
      pmParent.emit('@rerender', { sectionId: sectionIdActive, action: 'InputTagsPickerField.tsx' });
    }
  };

  return <InputTags values={value} onChange={handleChange} />;
};
