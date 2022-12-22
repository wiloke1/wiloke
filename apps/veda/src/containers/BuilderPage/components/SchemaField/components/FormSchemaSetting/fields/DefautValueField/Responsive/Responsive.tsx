import Field from 'components/Field';
import ResponsiveComponent from 'components/Responsive';
import { NumberInputDebounce } from 'containers/BuilderPage/components/SchemaField/components/InputDebounced/InputDebounced';
import { FC } from 'react';
import { SettingResponsive } from 'types/Schema';
import { GridSmart, View } from 'wiloke-react-core';
import { FormSchemaSettingProps } from '../../../type';

export const Responsive: FC<FormSchemaSettingProps> = ({ data, onChange }) => {
  const _data = data as SettingResponsive;

  return (
    <View>
      <ResponsiveComponent
        max={_data.max}
        min={_data.min}
        value={_data.children}
        onChange={value => {
          onChange?.({
            children: value,
          } as Partial<SettingResponsive>);
        }}
      />

      <View css={{ marginTop: '8px' }}>
        <GridSmart columnWidth={50} columnCount={2} columnGap={8}>
          <Field label="Min value">
            <NumberInputDebounce
              block
              borderColor="gray3"
              radius={6}
              value={_data.min}
              max={_data.max}
              min={1}
              onValueChange={value => {
                onChange?.({
                  min: value,
                  children: Object.entries(_data.children).reduce((obj, [breakpoint, quantityCol]) => {
                    return { ...obj, [breakpoint]: quantityCol < (value as number) ? value : quantityCol };
                  }, _data.children),
                } as SettingResponsive);
              }}
            />
          </Field>
          <Field label="Max value">
            <NumberInputDebounce
              block
              borderColor="gray3"
              radius={6}
              value={_data.max}
              min={_data.min}
              max={12}
              onValueChange={value => {
                onChange?.({
                  max: value,
                  children: Object.entries(_data.children).reduce((obj, [breakpoint, quantityCol]) => {
                    return { ...obj, [breakpoint]: quantityCol > (value as number) ? value : quantityCol };
                  }, _data.children),
                } as SettingResponsive);
              }}
            />
          </Field>
        </GridSmart>
      </View>
    </View>
  );
};
