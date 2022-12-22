import Field from 'components/Field';
import { NumberInputDebounce, SliderBeautyDebounce } from 'containers/BuilderPage/components/SchemaField/components/InputDebounced/InputDebounced';
import { FC } from 'react';
import { SettingSlider } from 'types/Schema';
import { GridSmart, View } from 'wiloke-react-core';
import { FormSchemaSettingProps } from '../../../type';

export const Slider: FC<FormSchemaSettingProps> = ({ data, onChange }) => {
  const _data = data as SettingSlider;

  return (
    <View>
      <SliderBeautyDebounce
        borderColor="gray3"
        borderInputColor="gray3"
        value={_data.children}
        max={_data.max}
        min={_data.min}
        step={_data.step}
        onValueChange={value => {
          onChange?.({ children: value });
        }}
        clearEnabled
      />
      <View css={{ marginTop: '8px' }}>
        <GridSmart columnWidth={50} columnCount={3} columnGap={8}>
          <Field label="Min value">
            <NumberInputDebounce
              block
              borderColor="gray3"
              radius={6}
              value={_data.min}
              min={-99999}
              max={_data.max}
              onValueChange={value => {
                onChange?.({
                  min: value,
                  children: _data.children && _data.children < (value as number) ? value : _data.children,
                } as SettingSlider);
              }}
              clearEnabled
            />
          </Field>
          <Field label="Max value">
            <NumberInputDebounce
              block
              borderColor="gray3"
              radius={6}
              value={_data.max}
              min={_data.min}
              max={99999}
              onValueChange={value => {
                onChange?.({
                  max: value,
                  children: _data.children && _data.children > (value as number) ? value : _data.children,
                } as SettingSlider);
              }}
              clearEnabled
            />
          </Field>
          <Field label="Step">
            <NumberInputDebounce
              block
              borderColor="gray3"
              radius={6}
              value={_data.step}
              onValueChange={value => {
                onChange?.({
                  step: value,
                } as SettingSlider);
              }}
              clearEnabled
            />
          </Field>
        </GridSmart>
      </View>
    </View>
  );
};
