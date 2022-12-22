import SimpleTabs from 'components/SimpleTabs';
import { View } from 'wiloke-react-core';
import { AllProductsTab } from './AllProductsTab';
import { SelectedProductsTab } from './SelectedProductsTab';

export const Content = () => {
  return (
    <SimpleTabs
      defaultValue="all"
      data={[
        { label: 'All Products', value: 'all' },
        { label: 'Selected', value: 'selected' },
      ]}
      tabItemCss={() => ({ fontSize: '13px', textAlign: 'center', flex: 1 })}
      tabCss={({ colors }) => ({
        backgroundColor: colors.light,
        borderBottom: `1px solid ${colors.gray3}`,
      })}
      containerCss={{ height: '100%' }}
    >
      {value => (
        <View backgroundColor="gray1" css={{ height: '100%', padding: '8px' }}>
          {value === 'all' && <AllProductsTab />}
          {value === 'selected' && <SelectedProductsTab />}
        </View>
      )}
    </SimpleTabs>
  );
};
