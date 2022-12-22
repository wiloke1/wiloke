import Field from 'components/Field';
import SwitchBeauty from 'components/SwitchBeauty';
import { FC } from 'react';
import { SettingDragNavigation } from 'types/Schema';
import { FormSchemaSettingProps } from '../../type';

export const EnableMultiLevelField: FC<FormSchemaSettingProps> = ({ data, onChange }) => {
  const _data = data as SettingDragNavigation;

  return (
    <Field label="Enable multi mode">
      <SwitchBeauty
        borderColor="gray3"
        checked={_data.enabledMulti}
        onValueChange={val => {
          // @ts-ignore
          onChange?.({ enabledMulti: val });
        }}
      />
    </Field>
  );
};
