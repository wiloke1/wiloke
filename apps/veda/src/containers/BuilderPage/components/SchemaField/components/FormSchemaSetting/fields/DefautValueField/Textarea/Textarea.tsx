import { TextInputDebounce } from 'containers/BuilderPage/components/SchemaField/components/InputDebounced/InputDebounced';
import { FC } from 'react';
import { SettingTextArea } from 'types/Schema';
import { FormSchemaSettingProps } from '../../../type';

export const Textarea: FC<FormSchemaSettingProps> = ({ data, onChange }) => {
  const _data = data as SettingTextArea;

  return (
    <TextInputDebounce
      multiline
      value={_data.children}
      onValueChange={value => {
        onChange?.({ children: value });
      }}
    />
  );
};
