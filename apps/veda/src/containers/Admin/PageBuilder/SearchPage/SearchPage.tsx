import { CodeSpliting } from 'components/CodeSpliting';
import SectionPageHeader from 'components/SectionPageHeader';
import { useChangeModalAdminSettings, ModalCreateNormalPage, ModalDeletePageDashboard } from 'containers/Admin/Modals';

import { Dashboard } from 'containers/Dashboard';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { searchPageSelector } from 'store/selectors';
import { i18n } from 'translation';
import { BUILDER_SEARCH_PAGE_MAIN_CONTENT } from 'utils/constants/chunkIds';
import { View } from 'wiloke-react-core';
import { useGetSearchPageItems } from '.';
import { useGetTemplatesPopup } from '../BlankPage';
import { DashboardPageSettings } from '../DashboardPageSettings/DashboardPageSettings';

export const SearchPage: FC = () => {
  const changeSettings = useChangeModalAdminSettings();
  const getTemplates = useGetTemplatesPopup();

  const { filterType, search } = useSelector(searchPageSelector);
  const getItems = useGetSearchPageItems();

  useEffect(() => {
    getItems.request({ s: search, pageType: 'search', filterType });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filterType]);

  return (
    <Dashboard
      Modals={() => (
        <>
          <ModalDeletePageDashboard pageType="search" />
          <ModalCreateNormalPage pageType="search" />
          <DashboardPageSettings pageType="search" />
        </>
      )}
      Content={() => (
        <View>
          <SectionPageHeader
            title={i18n.t('general.prefix_page', { prefix: i18n.t('adminDashboard.search', { textTransform: 'capitalize', text: '' }) })}
            description=""
            onClick={() => {
              changeSettings({ createNormalPage: true });
              getTemplates.request({ type: 'search' });
            }}
          />
          <CodeSpliting
            component={() => import(/* webpackChunkName: "BuilderSearchPageMainContent", webpackPrefetch: true */ './MainContent')}
            CHUNK_ID={BUILDER_SEARCH_PAGE_MAIN_CONTENT}
          />
        </View>
      )}
    />
  );
};
