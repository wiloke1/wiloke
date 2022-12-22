import { CodeSpliting } from 'components/CodeSpliting';
import SectionPageHeader from 'components/SectionPageHeader';
import { ModalCreateCollection, ModalDeletePageDashboard, useChangeModalAdminSettings } from 'containers/Admin/Modals';
import { Dashboard } from 'containers/Dashboard';
import { MultiCollectionPicker } from 'containers/Shopify/ModalMultiPicker';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { collectionPageSelector } from 'store/selectors';
import { i18n } from 'translation';
import { COLLECTION_PAGE_MAIN_CONTENT } from 'utils/constants/chunkIds';
import { View } from 'wiloke-react-core';
import { useGetCollectionPageItems } from '.';
import { useGetTemplatesPopup } from '../BlankPage';
import { MultiCollection } from '../DashboardPageSettings/components/CollectionSettings';
import { DashboardPageSettings } from '../DashboardPageSettings/DashboardPageSettings';

export const CollectionPage: FC = () => {
  const changeSettings = useChangeModalAdminSettings();
  const getTemplates = useGetTemplatesPopup();
  const { filterType, search } = useSelector(collectionPageSelector);
  const getItems = useGetCollectionPageItems();

  useEffect(() => {
    getItems.request({ s: search, pageType: 'collection', filterType });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filterType]);

  return (
    <Dashboard
      Modals={() => (
        <>
          <ModalCreateCollection />
          <ModalDeletePageDashboard pageType="collection" />
          <DashboardPageSettings pageType="collection" />
          <MultiCollection />
          <MultiCollectionPicker />
        </>
      )}
      Content={() => (
        <View>
          <SectionPageHeader
            title={i18n.t('general.prefix_page', { prefix: i18n.t('adminDashboard.collection') })}
            description={i18n.t('adminDashboard.page_description.collection')}
            onClick={() => {
              changeSettings({ createCollection: true });
              getTemplates.request({ type: 'collection' });
            }}
          />

          <CodeSpliting
            component={() => import(/* webpackChunkName: "CollectionPageMainContent", webpackPrefetch: true */ './MainContent')}
            CHUNK_ID={COLLECTION_PAGE_MAIN_CONTENT}
          />
        </View>
      )}
    />
  );
};
