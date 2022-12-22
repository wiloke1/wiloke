import SliderBeauty from 'components/SliderBeauty';
import withDebounce from 'hocs/withDebounce';
import { useSelector } from 'react-redux';
import { useUpdateSettingsValue } from 'store/actions/actionPages';
import { sectionIdActiveSelector } from 'store/selectors';
import { pmParent } from 'utils/functions/postMessage';
import { FieldContainerProps } from '../types';

export interface SliderFieldProps<T> extends FieldContainerProps<T> {
  min?: number;
  max?: number;
  step?: number;
}

const SliderBeautyDebounce = withDebounce(SliderBeauty, 'value', 'onValueChange', 300);

const SliderField = <T extends number | undefined>({
  value,
  settingId,
  childId,
  grandChildId,
  step = 1,
  min = 0,
  max = 200,
  forceRenderSection,
}: SliderFieldProps<T>) => {
  const updateSettingsValue = useUpdateSettingsValue();
  const sectionIdActive = useSelector(sectionIdActiveSelector);

  const handleChange = (value: number) => {
    updateSettingsValue({
      value,
      settingId,
      childId,
      grandChildId,
    });
    if (forceRenderSection) {
      pmParent.emit('@rerender', { sectionId: sectionIdActive, action: 'SliderField.tsx' });
    }
  };

  return (
    <SliderBeautyDebounce
      value={value}
      min={min}
      max={max}
      step={step}
      borderColor="gray3"
      borderInputColor="gray3"
      clearEnabled
      onValueChange={handleChange as any}
    />
  );
};

export default SliderField;
