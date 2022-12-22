import { Dashboard } from 'containers/Dashboard';
import { View } from 'wiloke-react-core';
import { CodeSpliting } from 'components/CodeSpliting';
import { GET_STARTED, QUICK_CREATE, RIGHTBAR_ADMIN } from 'utils/constants/chunkIds';
import { MultiBlogPicker, MultiCollectionPicker, MultiProductPicker } from 'containers/Shopify/ModalMultiPicker';
import { MultiBlog } from '../DashboardPageSettings/components/BlogSettings';
import { MultiCollection } from '../DashboardPageSettings/components/CollectionSettings';
import { ListMultiProducts } from '../DashboardPageSettings/components/ProductsSettings';
import * as styles from './styles';

export const DashboardPage = () => {
  return (
    <Dashboard
      Modals={() => (
        <>
          <MultiBlog />
          <MultiBlogPicker />
          <MultiCollection />
          <MultiCollectionPicker />
          <ListMultiProducts />
          <MultiProductPicker />
        </>
      )}
      Content={() => (
        <View className="dashboard-admin" css={styles.content}>
          <View columns={[8, 8, 8]} css={{ padding: '0' }}>
            <CodeSpliting
              component={() => import(/* webpackChunkName: "GetStarted", webpackPrefetch: true */ './components/GetStarted/GetStarted')}
              CHUNK_ID={GET_STARTED}
            />
            <CodeSpliting
              component={() => import(/* webpackChunkName: "QuickCreate", webpackPrefetch: true */ './components/QuickCreate/QuickCreate')}
              CHUNK_ID={QUICK_CREATE}
            />
          </View>
          <CodeSpliting
            component={() => import(/* webpackChunkName: "RightBarAdmin", webpackPrefetch: true */ 'containers/Admin/RightBar')}
            CHUNK_ID={RIGHTBAR_ADMIN}
          />
        </View>
      )}
    />
  );
};
