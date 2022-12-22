import SelectAntd from 'components/SelectAntd';
import { FC } from 'react';
import { animates } from './data';
import { Animate } from './types';

export interface AnimateFieldProps {
  value: Animate;
  onChange?: (value: Animate) => void;
}

export const AnimateField: FC<AnimateFieldProps> = ({ value, onChange }) => {
  return <SelectAntd showSearch value={value} data={animates as any} onChange={(value: Animate) => onChange?.(value)} />;
};
