import { ColorPickerBeautyDebounce } from 'containers/BuilderPage/components/SchemaField/components/InputDebounced/InputDebounced';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { cssVariablesSelector } from 'store/selectors';
import { SettingColor } from 'types/Schema';
import { FormSchemaSettingProps } from '../../../type';

export const Color: FC<FormSchemaSettingProps> = ({ data, onChange }) => {
  const _data = data as SettingColor;
  const { colors } = useSelector(cssVariablesSelector);

  return (
    <ColorPickerBeautyDebounce
      data={colors}
      color={_data.children}
      onChange={value => {
        onChange?.({ children: value });
      }}
    />
  );
};
