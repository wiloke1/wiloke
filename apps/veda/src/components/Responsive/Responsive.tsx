import Breakpoints, { BreakpointsValue } from 'components/Breakpoints';
import FieldGroup from 'components/FieldGroup';
import SliderBeauty from 'components/SliderBeauty';
import withDebounce from 'hocs/withDebounce';
import { equals } from 'ramda';
import { FC, ReactNode, useState } from 'react';
import { useDeepCompareEffect } from 'react-use';
import { Space, View } from 'wiloke-react-core';

export type ResponsiveValue = Record<BreakpointsValue, number>;

export interface ResponsiveProps {
  label?: string;
  summary?: string;
  value: Partial<ResponsiveValue>;
  min?: number;
  max?: number;
  onChange?: (value: ResponsiveValue) => void;
  AfterLabel?: ReactNode;
}

const SliderBeautyDebounce = withDebounce(SliderBeauty, 'value', 'onValueChange', 300);

const defaultResult: ResponsiveValue = { lg: 1, md: 1, sm: 1, xs: 1 };

const Responsive: FC<ResponsiveProps> = ({ label, summary, value, min = 1, max = 12, onChange, AfterLabel = null }) => {
  const [breakpoint, setBreakpoint] = useState<BreakpointsValue>('lg');
  const [result, setResult] = useState<ResponsiveValue>({ ...defaultResult, ...value });

  useDeepCompareEffect(() => {
    // @tuong -> Ngăn việc chạy onChange ngay khi component mount
    if (!equals(result, value)) {
      onChange?.(result);
    }
  }, [result]);

  const renderContent = (
    <View>
      <Breakpoints value={breakpoint} onChange={setBreakpoint} />
      <Space size={10} />
      <SliderBeautyDebounce
        value={result?.[breakpoint] ?? 0}
        min={min}
        max={max}
        step={1}
        borderColor="gray3"
        borderInputColor="gray3"
        onValueChange={value => {
          setResult(state => ({ ...state, [breakpoint]: value }));
        }}
      />
    </View>
  );

  if (!label) {
    return renderContent;
  }

  return (
    <FieldGroup visible label={label} summary={summary} AfterLabel={AfterLabel}>
      {renderContent}
    </FieldGroup>
  );
};

export default Responsive;
