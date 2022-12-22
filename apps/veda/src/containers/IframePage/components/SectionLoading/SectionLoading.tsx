import { AnimateFlicker } from 'components/AnimateFlicker';
import { FC } from 'react';
import { View } from 'wiloke-react-core';

interface SectionLoadingProps {}

export const SectionLoading: FC<SectionLoadingProps> = () => {
  return (
    <View
      backgroundColor="gray1"
      css={{ padding: '40px 0', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', minHeight: '300px' }}
    >
      <View css={{ width: '30%', height: '100%' }}>
        <AnimateFlicker css={{ width: '100%', height: '15px', borderRadius: '5px', marginBottom: '15px' }} backgroundColor="gray3" />
        <AnimateFlicker css={{ width: '75%', height: '15px', borderRadius: '5px', marginBottom: '15px' }} backgroundColor="gray3" />
        <AnimateFlicker css={{ width: '50%', height: '15px', borderRadius: '5px', marginBottom: '15px' }} backgroundColor="gray3" />
        <AnimateFlicker css={{ width: '25%', height: '15px', borderRadius: '5px', marginBottom: '15px' }} backgroundColor="gray3" />
      </View>
    </View>
  );
};
