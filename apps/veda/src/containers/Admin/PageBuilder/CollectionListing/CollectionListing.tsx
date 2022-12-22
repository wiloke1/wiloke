import { CodeSpliting } from 'components/CodeSpliting';
import SectionPageHeader from 'components/SectionPageHeader';
import { ModalCreateNormalPage, ModalDeletePageDashboard, useChangeModalAdminSettings } from 'containers/Admin/Modals';

import { Dashboard } from 'containers/Dashboard';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { collectionListingSelector } from 'store/selectors';
import { i18n } from 'translation';
import { BUILDER_COLLECTION_LISTING_PAGE_MAIN_CONTENT } from 'utils/constants/chunkIds';
import { View } from 'wiloke-react-core';
import { useGetCollectionListingItems } from '.';
import { useGetTemplatesPopup } from '../BlankPage';
import { DashboardPageSettings } from '../DashboardPageSettings/DashboardPageSettings';

export const CollectionListing: FC = () => {
  const changeSettings = useChangeModalAdminSettings();
  const getTemplates = useGetTemplatesPopup();
  const { filterType, search } = useSelector(collectionListingSelector);
  const getItems = useGetCollectionListingItems();

  useEffect(() => {
    getItems.request({ s: search, pageType: 'collections', filterType });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filterType]);

  return (
    <Dashboard
      Modals={() => (
        <>
          <ModalCreateNormalPage pageType="collections" />
          <ModalDeletePageDashboard pageType="collections" />
          <DashboardPageSettings pageType="collections" />
        </>
      )}
      Content={() => (
        <View>
          <SectionPageHeader
            title={i18n.t('general.prefix_page', { prefix: i18n.t('adminDashboard.collectionListing') })}
            description=""
            onClick={() => {
              changeSettings({ createNormalPage: true });
              getTemplates.request({ type: 'collections' });
            }}
          />
          <CodeSpliting
            component={() => import(/* webpackChunkName: "BuilderCollectionListingMainContent", webpackPrefetch: true */ './MainContent')}
            CHUNK_ID={BUILDER_COLLECTION_LISTING_PAGE_MAIN_CONTENT}
          />
        </View>
      )}
    />
  );
};
