import { DatePickerDebounce } from 'containers/BuilderPage/components/SchemaField/components/InputDebounced/InputDebounced';
import { FC } from 'react';
import { SettingDateTime } from 'types/Schema';
import { FormSchemaSettingProps } from '../../../type';

export const DatePicker: FC<FormSchemaSettingProps> = ({ data, onChange }) => {
  const _data = data as SettingDateTime;

  return (
    <DatePickerDebounce
      withPortal
      date={new Date(_data.children)}
      onChange={value => {
        if (value) {
          onChange?.({ children: value.getTime() });
        }
      }}
    />
  );
};
