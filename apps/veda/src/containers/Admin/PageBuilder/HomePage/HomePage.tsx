import { CodeSpliting } from 'components/CodeSpliting';
import SectionPageHeader from 'components/SectionPageHeader';
import { ModalCreateNormalPage, ModalDeletePageDashboard, useChangeModalAdminSettings } from 'containers/Admin/Modals';
import { Dashboard } from 'containers/Dashboard';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { homePageSelector } from 'store/selectors';
import { i18n } from 'translation';
import { BUILDER_HOME_PAGE_MAIN_CONTENT } from 'utils/constants/chunkIds';
import { View } from 'wiloke-react-core';
import { useGetHomePageItems } from '.';
import { useGetTemplatesPopup } from '../BlankPage';
import { DashboardPageSettings } from '../DashboardPageSettings/DashboardPageSettings';

export const HomePage: FC = () => {
  const changeSettings = useChangeModalAdminSettings();
  const getTemplates = useGetTemplatesPopup();
  const { filterType, search } = useSelector(homePageSelector);
  const getItems = useGetHomePageItems();

  useEffect(() => {
    getItems.request({ s: search, pageType: 'home', filterType });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filterType]);

  return (
    <Dashboard
      Modals={() => (
        <>
          <ModalCreateNormalPage pageType="home" />
          <ModalDeletePageDashboard pageType="home" />
          <DashboardPageSettings pageType="home" />
        </>
      )}
      Content={() => (
        <View>
          <SectionPageHeader
            title={i18n.t('general.prefix_page', { prefix: i18n.t('adminDashboard.home', { textTransform: 'capitalize' }) })}
            description={i18n.t('adminDashboard.page_description.home')}
            onClick={() => {
              changeSettings({ createNormalPage: true });
              getTemplates.request({ type: 'home' });
            }}
          />
          <CodeSpliting
            component={() => import(/* webpackChunkName: "BuilderHomePageMainContent", webpackPrefetch: true */ './MainContent')}
            CHUNK_ID={BUILDER_HOME_PAGE_MAIN_CONTENT}
          />
        </View>
      )}
    />
  );
};
