import { TextEditorDebounce } from 'containers/BuilderPage/components/SchemaField/components/InputDebounced/InputDebounced';
import { FC } from 'react';
import { SettingTextArea } from 'types/Schema';
import { FormSchemaSettingProps } from '../../../type';

export const TextEditor: FC<FormSchemaSettingProps> = ({ data, onChange }) => {
  const _data = data as SettingTextArea;

  return (
    <TextEditorDebounce
      value={_data.children}
      onChange={value => {
        onChange?.({ children: value });
      }}
    />
  );
};
