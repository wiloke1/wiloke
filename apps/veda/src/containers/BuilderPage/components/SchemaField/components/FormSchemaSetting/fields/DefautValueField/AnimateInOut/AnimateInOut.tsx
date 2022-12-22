import { AnimateInOutField } from 'containers/BuilderPage/components/StyleBox/AnimateInOutField';
import { FC } from 'react';
import { SettingAnimateInOut } from 'types/Schema';
import { getLabel } from 'utils/functions/getLabel';
import { FormSchemaSettingProps } from '../../../type';

export const AnimateInOut: FC<FormSchemaSettingProps> = ({ data, onChange }) => {
  const _data = data as SettingAnimateInOut;

  return (
    <AnimateInOutField
      label={getLabel(_data.label)}
      value={_data.children}
      onChange={val => {
        onChange?.({ children: val });
      }}
    />
  );
};
