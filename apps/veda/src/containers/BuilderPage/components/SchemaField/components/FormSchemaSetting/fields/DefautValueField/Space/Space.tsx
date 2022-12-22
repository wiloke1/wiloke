import SpaceField from 'components/SpaceField';
import { FC } from 'react';
import { SettingSpace } from 'types/Schema';
import { View } from 'wiloke-react-core';
import { FormSchemaSettingProps } from '../../../type';

export const Space: FC<FormSchemaSettingProps> = ({ data, onChange }) => {
  const _data = data as SettingSpace;
  const { bottom, top, left, right } = _data.children;

  return (
    <View css={{ maxWidth: '250px' }}>
      <SpaceField
        bottom={bottom}
        top={top}
        left={left}
        right={right}
        onChange={(placement, value) => {
          onChange?.({
            children: {
              ..._data.children,
              [placement]: value,
            },
          } as SettingSpace);
        }}
        onChangeAll={() => {
          onChange?.({
            children: {
              top,
              bottom: top,
              left: top,
              right: top,
            },
          } as SettingSpace);
        }}
      />
    </View>
  );
};
