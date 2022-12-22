import { InputTags } from 'components/SelectTags';
import { FC } from 'react';
import { SettingTags } from 'types/Schema';
import { FormSchemaSettingProps } from '../../../type';

export const Tags: FC<FormSchemaSettingProps> = ({ data, onChange }) => {
  const _data = data as SettingTags;

  return (
    <InputTags
      values={_data.children}
      onChange={value => {
        onChange?.({ children: value });
      }}
    />
  );
};
