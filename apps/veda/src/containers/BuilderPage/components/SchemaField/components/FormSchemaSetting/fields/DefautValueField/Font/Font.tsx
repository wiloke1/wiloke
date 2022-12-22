import { FontFieldDebounce } from 'containers/BuilderPage/components/SchemaField/components/InputDebounced/InputDebounced';
import { FC } from 'react';
import { SettingFont } from 'types/Schema';
import { FormSchemaSettingProps } from '../../../type';

export const Font: FC<FormSchemaSettingProps> = ({ data, onChange }) => {
  const _data = data as SettingFont;

  return (
    <FontFieldDebounce
      value={_data.children}
      onChange={value => {
        onChange?.({ children: value });
      }}
    />
  );
};
