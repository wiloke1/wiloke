import { SwitchBeautyDebounce } from 'containers/BuilderPage/components/SchemaField/components/InputDebounced/InputDebounced';
import { FC } from 'react';
import { SettingSwitch } from 'types/Schema';
import { FormSchemaSettingProps } from '../../../type';

export const Switch: FC<FormSchemaSettingProps> = ({ data, onChange }) => {
  const _data = data as SettingSwitch;

  return (
    <SwitchBeautyDebounce
      checked={_data.children}
      onValueChange={value => {
        onChange?.({ children: value });
      }}
    />
  );
};
