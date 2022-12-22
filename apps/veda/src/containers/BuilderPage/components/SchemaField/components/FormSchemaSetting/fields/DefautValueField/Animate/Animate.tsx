import { AnimateField } from 'containers/BuilderPage/components/StyleBox/AnimateField';
import { FC } from 'react';
import { SettingAnimate } from 'types/Schema';
import { FormSchemaSettingProps } from '../../../type';

export const Animate: FC<FormSchemaSettingProps> = ({ data, onChange }) => {
  const _data = data as SettingAnimate;

  return (
    <AnimateField
      value={_data.children}
      onChange={val => {
        onChange?.({ children: val });
      }}
    />
  );
};
