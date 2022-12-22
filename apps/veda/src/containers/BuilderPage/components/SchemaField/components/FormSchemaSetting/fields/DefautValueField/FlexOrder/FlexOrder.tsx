import FlexOrderComponent from 'components/FlexOrder';
import { FC } from 'react';
import { SettingFlexOrder } from 'types/Schema';
import { FormSchemaSettingProps } from '../../../type';

export const FlexOrder: FC<FormSchemaSettingProps> = ({ data, onChange }) => {
  const _data = data as SettingFlexOrder;
  return (
    <FlexOrderComponent.Schema
      value={_data.children}
      options={_data.options}
      onChange={(value, options) => {
        onChange?.({
          children: value,
          options: options,
        } as Partial<SettingFlexOrder>);
      }}
    />
  );
};
