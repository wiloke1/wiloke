import { TextInputDebounce } from 'containers/BuilderPage/components/SchemaField/components/InputDebounced/InputDebounced';
import { FC } from 'react';
import { SettingText } from 'types/Schema';
import { FormSchemaSettingProps } from '../../../type';

export const Text: FC<FormSchemaSettingProps> = ({ data, onChange }) => {
  const _data = data as SettingText;

  return (
    <TextInputDebounce
      value={_data.children}
      block
      onValueChange={value => {
        onChange?.({ children: value });
      }}
    />
  );
};
