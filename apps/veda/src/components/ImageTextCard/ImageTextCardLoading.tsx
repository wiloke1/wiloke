import { animatedLoading } from 'styles/loading';
import { View } from 'wiloke-react-core';

export const ImageTextCardLoading = ({ width, height, aspectRatio = 56.25 }: { width?: number; height?: number; aspectRatio?: number }) => {
  return (
    <View radius={6} borderColor="gray3" borderStyle="solid" borderWidth={1}>
      <View css={{ ...animatedLoading, paddingTop: `${aspectRatio}%` }} backgroundColor="gray3" height={height} width={width} />
      <View css={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 15px' }}>
        <View>
          <View radius={6} width={80} height={7} backgroundColor="gray3" css={{ ...animatedLoading }} />
        </View>
        <View radius={6} width={33} height={15} backgroundColor="gray3" css={animatedLoading} />
      </View>
    </View>
  );
};
