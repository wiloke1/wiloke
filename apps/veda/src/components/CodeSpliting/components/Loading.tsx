import { VedaLoadingItem } from 'components/VedaLoadingItem';
import { View } from 'wiloke-react-core';

export const Loading = () => {
  return (
    <View container>
      <View css={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
        <VedaLoadingItem />
      </View>
    </View>
  );
};
