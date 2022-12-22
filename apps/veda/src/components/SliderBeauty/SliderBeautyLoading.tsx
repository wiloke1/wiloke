import React, { FC } from 'react';
import { View } from 'wiloke-react-core';

export interface RangeSlideBeautyLoadingProps {}

const RangeSlideBeautyLoading: FC<RangeSlideBeautyLoadingProps> = () => {
  return (
    <View css={{ position: 'relative', overflow: 'hidden' }}>
      <View backgroundColor="gray5" css={{ width: '300px', height: '20px', borderRadius: '4px', marginBottom: '8px' }} />
      <View css={{ display: 'flex', alignItems: 'center', padding: '8px 16px 8px 32px', borderRadius: '6px' }} backgroundColor="gray5">
        <View css={{ height: '4px', flexGrow: 1, position: 'relative', borderRadius: '4px' }} backgroundColor="gray4">
          <View
            css={{
              width: '23px',
              height: '23px',
              borderRadius: '50px',
              position: 'absolute',
              left: '-10%',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
            backgroundColor="gray4"
          />
        </View>
        <View css={{ width: '50px', height: '28px', marginLeft: '30px', borderRadius: '5px' }} backgroundColor="gray4" />
      </View>
      <View backgroundColor="gray5" css={{ width: '100px', height: '20px', marginBottom: '8px', borderRadius: '4px' }} />
    </View>
  );
};

export default RangeSlideBeautyLoading;
