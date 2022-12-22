import { CodeSpliting } from 'components/CodeSpliting';
import SectionPageHeader from 'components/SectionPageHeader';
import { Dashboard } from 'containers/Dashboard';
import { MultiBlogPicker, MultiCollectionPicker, MultiProductPicker } from 'containers/Shopify/ModalMultiPicker';
import { FC } from 'react';
import { i18n } from 'translation';
import { TEMPLATES_PAGE_MAIN_CONTENT } from 'utils/constants/chunkIds';
import { View } from 'wiloke-react-core';
import { MultiBlog } from '../DashboardPageSettings/components/BlogSettings';
import { MultiCollection } from '../DashboardPageSettings/components/CollectionSettings';
import { ListMultiProducts } from '../DashboardPageSettings/components/ProductsSettings';

export interface TemplatesPageProps {}

const TemplatesPage: FC<TemplatesPageProps> = () => {
  return (
    <Dashboard
      disabledPaddingContent
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
        <View css={{ padding: '30px', height: '100%' }}>
          <SectionPageHeader
            title={i18n.t('adminDashboard.page_templates')}
            description={i18n.t('adminDashboard.page_tempaltes_description')}
            disableButton
            cssContainer={{ marginBottom: '0px' }}
          />
          <CodeSpliting
            component={() => import(/* webpackChunkName: "TemplatesPageMainContent", webpackPrefetch: true */ './components/Content')}
            CHUNK_ID={TEMPLATES_PAGE_MAIN_CONTENT}
          />
        </View>
      )}
    />
  );
};

export { TemplatesPage };
